import { supabase } from '@/lib/client';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  try {
    // Ambil id_event dari URL parameter
    const { id_event } = await params;
    
    // Ambil id_pengguna dari request body atau headers
    const body = await request.json();
    const { id_pengguna } = body;

    
    // Validasi input
    if (typeof id_pengguna !== 'number' || id_pengguna < 0){
      return NextResponse.json({ 
        error: 'ID pengguna tidak boleh kosong' 
      }, { status: 400 });
    }
    if (!id_event) {
      return NextResponse.json({ 
        error: 'ID event tidak boleh kosong'
      }, { status: 400 });
    }

    // Cek apakah_peng}guna sudah memiliki tiket untuk event ini
    const { data: existingTicket } = await supabase
      .from('tiket')
      .select('id_tiket')
      .eq('id_pengguna', id_pengguna)
      .eq('id_event', id_event)
      .single();

    if (existingTicket) {
      return NextResponse.json({ 
        error:'Pengguna sudah memiliki tiket untuk event ini' 
      }, { status: 400 });
    }

    // Ambil informasi event untuk cek kuota
    const { data: eventData, error: eventError } = await supabase
      .from('event') 
      .select('kuota')
      .eq('id_event', id_event)
      .single();

    if (eventError) {
      return NextResponse.json({ 
        error: 'Event tidak ditemukan' 
      }, { status: 404 });
    }

    // Hitung jumlah tiket yang sudah terjual untuk event ini
    const { count: ticketCount, error: countError } = await supabase
      .from('tiket')
      .select('*', { count: 'exact', head: true })
      .eq('id_event', id_event);

    if (countError) {
      return NextResponse.json({ 
        error: 'Gagal mengecek jumlah tiket' 
      }, { status: 500 });
    }

    // Cek apakah masih ada kuota
    if (ticketCount >= eventData.kuota) {
      return NextResponse.json({ 
        error: 'Kuota tiket untuk event ini sudah habis' 
      }, { status: 400 });
    }

    // Ambil ID tiket terakhir untuk event ini (untuk penomoran berurut per event)
    const { data: lastTicket, error: lastTicketError } = await supabase
      .from('tiket')
      .select('id_tiket')
      .eq('id_event', id_event)
      .order('id_tiket', { ascending: false })
      .limit(1)
      .maybeSingle(); // gunakan maybeSingle() untuk handle kasus tidak ada data

    // Tentukan nomor urut tiket untuk event ini
    let ticketSequence = 1;
    if (lastTicket) {
      // Ekstrak nomor urut dari ID tiket terakhir
      // Asumsi format: TIKET_penggunaID_eventID_sequence
      const lastSequence = parseInt(lastTicket.id_tiket.toString().split('_').pop());
      ticketSequence = lastSequence + 1;
    }

    // Generate ID tiket dan nomor tiket
    const newIdTiket = `${id_event}_${ticketSequence}`;
    const no_tiket = `TIKET_${id_pengguna}_${id_event}_${ticketSequence}`;

    // Insert tiket baru
    const { data, error } = await supabase
      .from('tiket')
      .insert({
        id_tiket: newIdTiket,
        no_tiket: no_tiket,
        id_event: parseInt(id_event),
        id_pengguna: parseInt(id_pengguna),
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ 
        error: 'Gagal membuat tiket' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Tiket berhasil dibuat', 
      data: data 
    }, { status: 201 });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}