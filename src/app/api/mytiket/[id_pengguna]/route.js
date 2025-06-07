import { supabase } from '@/lib/client';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const { id_pengguna } = await params;

        if (!id_pengguna) {
            return NextResponse.json({ 
            error: 'ID pengguna tidak boleh kosong' 
            }, { status: 400 });
        }

        const { data: tickets, error } = await supabase
            .from('tiket')
            .select(`
                *,
                event: id_event (
                id_event,
                nama_event,
                lokasi,
                tanggal,
                waktu_mulai,
                waktu_selesai
                )
            `)
            .eq('id_pengguna', id_pengguna);

        if (error) {
            return NextResponse.json({ 
            error: 'Gagal mengambil tiket' 
            }, { status: 500 });
        }

        return NextResponse.json(tickets);
    } catch (error) {
        return NextResponse.json({ 
            error: 'Terjadi kesalahan pada server' 
        }, { status: 500 });
    }
}
