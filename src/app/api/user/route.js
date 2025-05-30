import { supabase } from '../../../lib/client.js';
import express from 'express';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ error: 'Masukkan email/username dan password anda' });
    }

    const { data, error } = await supabase
        .from('pengguna')
        .select('*')
        .or(`email.eq.${identifier},username.eq.${identifier}`)
        .single();

    if (error || !data) {
        return res.status(401).json({ error: 'Email/Username atau password anda salah' });
    }

    if (data.password !== password) {
        return res.status(401).json({ error: 'Password anda salah' });
    }

    const { password: _, ...user } = data;
    res.status(200).json({ message: 'Login Berhasil', user });
});

router.post('/signup', async (req, res) => {
    const {username, email, no_telepon, password} = req.body;

    if (!username || !email || !no_telepon || !password) {
        return res.status(400).json({ error: 'Isi semua kolom yang tersedia' });
    }

    // Check if email or username already exists
    const { data: existingUser, error } = await supabase
        .from('pengguna')
        .select('id_pengguna')
        .or(`email.eq.${email},username.eq.${username}`)
        .limit(1);

    if (existingUser && existingUser.length > 0) {
        // Determine which field is duplicated
        const { data: emailUser } = await supabase
            .from('pengguna')
            .select('id_pengguna')
            .eq('email', email)
            .limit(1);

        const { data: usernameUser } = await supabase
            .from('pengguna')
            .select('id_pengguna')
            .eq('username', username)
            .limit(1);

        if (emailUser && emailUser.length > 0 && usernameUser && usernameUser.length > 0) {
            return res.status(409).json({ error: 'Email dan Username sudah terdaftar' });
        } else if (emailUser && emailUser.length > 0) {
            return res.status(409).json({ error: 'Email sudah terdaftar' });
        } else if (usernameUser && usernameUser.length > 0) {
            return res.status(409).json({ error: 'Username sudah terdaftar' });
        }
    }

    const { data: lastUser, error: lastUserError } = await supabase
        .from('pengguna')
        .select('id_pengguna')
        .order('id_pengguna', { ascending: false })
        .limit(1)
        .single();

    if (lastUserError) {
        return res.status(500).json({ error: 'Database error saat mengambil id_pengguna terakhir' });
    }

    const newId = lastUser && lastUser.id_pengguna ? lastUser.id_pengguna + 1 : 1;

    const { data: insertedUser, error: insertError } = await supabase
        .from('pengguna')
        .insert([{ id_pengguna: newId, username, email, no_telepon, password }])
        .select()
        .single();

    res.status(201).json({ message: 'Pendaftaran berhasil', user: insertedUser });
});

export default router;
