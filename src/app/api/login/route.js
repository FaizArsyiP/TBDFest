import { supabase } from '@/lib/client';

export async function POST(req) {
    // Example request body
    // {
    //   "identifier": "user123" or "use@mail.com", 
    //   "password": "securepassword"
    // }
    
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
        return Response.json({ error: 'Masukkan email/username dan password anda' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('pengguna')
        .select('*')
        .or(`email.eq.${identifier},username.eq.${identifier}`)
        .single();

    if (error || !data) {
        return Response.json({ error: 'Email/Username atau password anda salah' }, { status: 401 });
    }

    if (data.password !== password) {
        return Response.json({ error: 'Password anda salah' }, { status: 401 });
    }

    const { password: _, ...user } = data;
    return Response.json({ message: 'Login Berhasil', user }, { status: 200 });
}
