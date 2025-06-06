import { supabase } from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
    const { data, error } = await supabase
        .from('event')
        .select('*')

    if (error) {
        return NextResponse.json({ error: 'Gagal mengambil data event' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}

export async function POST(req) {
//  Example request body
//    {
//      "nama_event": "Inovasi 2025",
//      "lokasi": "Auditorium Universitas A",
//      "tanggal": "2026-07-15",
//      "waktu_mulai": "09:00",
//      "waktu_selesai": "17:00",
//      "kuota": 100,
//      "deskripsi": "Konferensi tahunan tentang inovasi teknologi",
//      "kategori": "Teknologi"
//    }

    const body = await req.json();
    const { nama_event, lokasi, tanggal, waktu_mulai, waktu_selesai, kuota, deskripsi, kategori } = body;

    const requiredFields = {
        nama_event: 'nama event',
        lokasi: 'lokasi event',
        tanggal: 'tanggal event',
        waktu_mulai: 'waktu mulai event',
        waktu_selesai: 'waktu selesai event',
        kuota: 'kuota event',
        deskripsi: 'deskripsi event',
        kategori: 'kategori event'
    };

    for (const key in requiredFields) {
        if (!body[key]) {
        return Response.json({ error: `Masukkan ${requiredFields[key]}` }, { status: 400 });
        }
    }

    if(kuota <=0 || isNaN(kuota)) {
        return NextResponse.json({ error: 'Jumlah kuota tidak valid' }, { status: 400 });
    }

    if(isNaN(Date.parse(tanggal))) {
        return NextResponse.json({ error: 'Format tanggal tidak valid, YYYY-MM-DD' }, { status: 400 });
    }
    
    const today = new Date();
    const eventDate = new Date(tanggal);
    today.setHours(0, 0, 0, 0); 
    if (eventDate < today) {
        return NextResponse.json({ error: 'Tanggal sudah lewat' }, { status: 400 });
    }

    const { data: existingEvent} = await supabase
        .from('event')
        .select('*')
        .eq('nama_event', nama_event)
        .eq('tanggal', tanggal)
        .eq('waktu_mulai', waktu_mulai)
        .eq('waktu_selesai', waktu_selesai)
        .eq('lokasi', lokasi)
        .limit(1)
        .single();

    if (existingEvent) {
        return NextResponse.json({ error: 'Event telah terselenggara' }, { status: 409 });
    }

    const { data: datebooked} = await supabase
        .from('event')
        .select('*')
        .eq('tanggal', tanggal)
        .eq('lokasi', lokasi)
        .or(`waktu_mulai.eq.${waktu_mulai}, waktu_selesai.eq.${waktu_selesai}`)
        .limit(1)
        .single();

    if (datebooked) {
        return NextResponse.json({ error: 'Sudah ada event yang terselenggara pada tanggal dan lokasi tersebut' }, { status: 409 });
    }

    const {data: LastID, error: LastIDError} = await supabase
        .from('event')
        .select('id_event')
        .order('id_event', { ascending: false })
        .limit(1)
        .single();

    if (LastIDError) {
        return NextResponse.json({ error: 'Database error saat mengambil id_event terakhir' }, { status: 500 });
    }
    const newId = LastID.id_event + 1;

    const {data, error} = await supabase
        .from('event')
        .insert([{ id_event: newId ,nama_event, lokasi, tanggal, waktu_mulai, waktu_selesai, kuota, deskripsi, kategori }])
        .select()
        .single();
    if (error) {
        return NextResponse.json({ error: 'Gagal menyimpan data event' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Event berhasil ditambahkan', event: data }, { status: 201 });
}