import { supabase } from '@/lib/client';

export async function POST(req) {
    // Example request body
    // {
    //   "username": "user123",
    //   "email": "user@mail.com",
    //   "no_telepon": "08123456789",
    //   "password": "securepassword"
    // }

    const { username, email, no_telepon, password } = await req.json();

    if (!username || !email || !no_telepon || !password) {
        return Response.json({ error: 'Isi semua kolom yang tersedia' }, { status: 400 });
    }

    const { data: existingUser } = await supabase
        .from('pengguna')
        .select('id_pengguna, email, username')
        .or(`email.eq.${email},username.eq.${username}`)
        .limit(1);

    if (existingUser) {
        const { data: emailUser } = await supabase.from('pengguna').select('id_pengguna').eq('email', email).limit(1);
        const { data: usernameUser } = await supabase.from('pengguna').select('id_pengguna').eq('username', username).limit(1);

        if (emailUser?.length > 0 && usernameUser?.length > 0) {
        return Response.json({ error: 'Email dan Username sudah terdaftar' }, { status: 409 });
        } else if (emailUser?.length > 0) {
        return Response.json({ error: 'Email sudah terdaftar' }, { status: 409 });
        } else if (usernameUser?.length > 0) {
        return Response.json({ error: 'Username sudah terdaftar' }, { status: 409 });
        }
    }
    if (password.length < 6) {
        return Response.json({ error: 'Password harus minimal 6 karakter' }, { status: 400 });
    }

    if(no_telepon.length < 10 || no_telepon.length > 15) {
        return Response.json({ error: 'Nomor telepon harus antara 10 hingga 15 karakter' }, { status: 400 });
    }

    if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
        return Response.json({ error: 'Format email tidak valid' }, { status: 400 });
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
        return Response.json({ error: 'Username hanya boleh mengandung huruf, angka, titik, garis bawah, dan tanda hubung' }, { status: 400 });
    }
    
    if (!/^[0-9]+$/.test(no_telepon)) {
        return Response.json({ error: 'Nomor telepon hanya boleh mengandung angka' }, { status: 400 });
    }


    const { data: lastUser, error: lastUserError } = await supabase
        .from('pengguna')
        .select('id_pengguna')
        .order('id_pengguna', { ascending: false })
        .limit(1)
        .single();

    if (lastUserError) {
        return Response.json({ error: 'Database error saat mengambil id_pengguna terakhir' }, { status: 500 });
    }

    const newId = lastUser?.id_pengguna ? lastUser.id_pengguna + 1 : 1;

    const { data: insertedUser, error: insertError } = await supabase
        .from('pengguna')
        .insert([{ id_pengguna: newId, username, email, no_telepon, password }])
        .select()
        .single();

    if (insertError) {
        return Response.json({ error: 'Gagal menyimpan data pengguna' }, { status: 500 });
    }

    return Response.json({ message: 'Pendaftaran berhasil', user: insertedUser }, { status: 201 });
}
