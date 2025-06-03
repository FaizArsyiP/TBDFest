import { supabase } from "@/lib/client";

export async function GET() {
    const { data, error } = await supabase
        .from('event')
        .select('*')

    if (error) {
        return Response.json({ error: 'Gagal mengambil data event' }, { status: 500 });
    }

    return Response.json(data, { status: 200 });
}

export async function POST(req) {
//  Example request body
//    {
//   "nama_event": "Inovasi 2025",
//   "lokasi": "Auditorium Universitas A",
//   "tanggal": "2026-07-15",
//   "waktu": "09:00",
//   "kuota": 100
//    }

    const body = await req.json();
    const { nama_event, lokasi, tanggal, waktu, kuota } = body;

    const requiredFields = {
        nama_event: 'nama event',
        lokasi: 'lokasi event',
        tanggal: 'tanggal event',
        waktu: 'waktu event'
    };

    for (const key in requiredFields) {
        if (!body[key]) {
        return Response.json({ error: `Masukkan ${requiredFields[key]}` }, { status: 400 });
        }
    }

    if(kuota <=0 || isNaN(kuota)) {
        return Response.json({ error: 'Jumlah kuota tidak valid' }, { status: 400 });
    }

    if(isNaN(Date.parse(tanggal))) {
        return Response.json({ error: 'Format tanggal tidak valid, YYYY-MM-DD' }, { status: 400 });
    }
    
    const today = new Date();
    const eventDate = new Date(tanggal);
    today.setHours(0, 0, 0, 0); 
    if (eventDate < today) {
        return Response.json({ error: 'Tanggal event tidak boleh di masa lalu' }, { status: 400 });
    }

    const { data: existingEvent} = await supabase
        .from('event')
        .select('*')
        .eq('nama_event', nama_event)
        .eq('tanggal', tanggal)
        .eq('waktu', waktu)
        .eq('lokasi', lokasi)
        .limit(1)
        .single();
    if (existingEvent) {
        return Response.json({ error: 'Event telah terselenggara' }, { status: 409 });
    }

    const { data: datebooked} = await supabase
        .from('event')
        .select('*')
        .eq('tanggal', tanggal)
        .eq('waktu', waktu)
        .eq('lokasi', lokasi)
        .limit(1)
        .single();
    if (datebooked) {
        return Response.json({ error: 'Sudah ada event yang terselenggara pada tanggal dan lokasi tersebut' }, { status: 409 });
    }

    const {data: MaxID, error: MaxIDError} = await supabase
        .from('event')
        .select('id_event')
        .order('id_event', { ascending: false })
        .limit(1)
        .single();

    if (MaxIDError) {
        return Response.json({ error: 'Database error saat mengambil id_event terakhir' }, { status: 500 });
    }
    const newId = MaxID.id_event + 1;

    const {data, error} = await supabase
        .from('event')
        .insert([{ id_event: newId ,nama_event, lokasi, tanggal, waktu, kuota }])
        .select()
        .single();
    if (error) {
        return Response.json({ error: 'Gagal menyimpan data event' }, { status: 500 });
    }

    return Response.json({ message: 'Event berhasil ditambahkan', event: data }, { status: 201 });
}