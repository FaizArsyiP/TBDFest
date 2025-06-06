import { supabase } from '@/lib/client';
import { NextResponse } from 'next/server';

/*  
    Endpoint untuk mendapatkan profil pengguna berdasarkan id_pengguna.
*/
export async function GET(_, {params}) {
    const { id_pengguna } = await params;  

    const { data, error } = await supabase
        .from('pengguna')
        .select('username, email, no_telepon, password')
        .eq('id_pengguna', id_pengguna)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (!data) {
        return NextResponse.json({ error: 'Pengguna tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ user: data }, { status: 200 });
}

export async function PUT(req, {params}) {
    const body = await req.json();
    const { id_pengguna } = await params;

    if (!id_pengguna) {
        return NextResponse.json({ error: 'id_pengguna is required' }, { status: 400 });
    }

    // Cek email unik
    if (body.email) {
        const { data: emailUser } = await supabase
            .from('pengguna')
            .select('id_pengguna')
            .eq('email', body.email)
            .neq('id_pengguna', id_pengguna)
            .single();

        if (emailUser) {
            return NextResponse.json({ error: 'Email ini sudah terdaftar' }, { status: 409 });
        }
    }

    // Cek username unik
    if (body.username) {
        const { data: usernameUser } = await supabase
            .from('pengguna')
            .select('id_pengguna')
            .eq('username', body.username)
            .neq('id_pengguna', id_pengguna)
            .single();

        if (usernameUser) {
            return NextResponse.json({ error: 'Username tidak tersedia' }, { status: 409 });
        }
    }

    const updates = {};
    if (body.username) updates.username = body.username;
    if (body.email) updates.email = body.email;
    if (body.password) updates.password = body.password;
    if (body.no_telepon) updates.no_telepon = body.no_telepon;

    const { data, error } = await supabase
        .from('pengguna')
        .update(updates)
        .eq('id_pengguna', id_pengguna)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ user: data }, { status: 200 });
}

export async function DELETE(_, {params}) {
    const { id_pengguna } = await params;

    if (!id_pengguna) {
        return NextResponse.json({ error: 'id_pengguna is required' }, { status: 400 });
    }

    const { error } = await supabase
        .from('pengguna')
        .delete()
        .eq('id_pengguna', id_pengguna);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Akun berhasil dihapus' }, { status: 200 });
}