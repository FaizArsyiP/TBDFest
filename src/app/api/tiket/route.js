import { supabase } from '@/lib/client';
import { NextResponse } from 'next/server';

/*
    Endpoint untuk membuat Tiket bedasarkan ID user yang sudah login dan ID event yang sudah ada.
    Endpoint ini akan menerima POST request dengan body yang berisi ID event.
    ambil id user dari local storage
*/

export async function POST(request) {
  const id_user = localStorage.getItem('id_pengguna');
  const id_event = localStorage.getItem('id_event');
  
  const {data:LastIDTiket, error:ErrorLastIDTiket} = await supabase
    .from('tiket')
    .select('id_tiket')
    .order('id_tiket', { ascending: false })
    .limit(1)
    .single();

  if (ErrorLastIDTiket) {
    return NextResponse.json({ error: 'Gagal mengambil ID tiket terakhir' }, { status: 500 });
  }
  const newIdTiket = LastIDTiket.id_tiket + 1;

  const no_tiket = `TIKET_${id_user}_${id_event}_${newIdTiket}`;

  if (!id_user || !id_event) {
    return NextResponse.json({ error: 'ID user atau ID event tidak ditemukan' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('tiket')
    .insert({
      id_tiket: newIdTiket,
      no_tiket: no_tiket,
      id_event: id_event,
      id_user: id_user
    });

  if (error) {
    return NextResponse.json({ error: 'Gagal membuat tiket' }, { status: 500 });
  }
  return NextResponse.json({ message: 'Tiket berhasil dibuat', data: data }, { status: 201 });
}
