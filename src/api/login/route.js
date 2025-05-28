import { supabase } from '../../lib/client.js';
import express from 'express';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Masukkan email dan password anda' });
    }

    const { data: users, error } = await supabase
        .from('pengguna')
        .select('*')
        .eq('email', email)
        .limit(1);


    if (!users || users.length === 0) {
        return res.status(401).json({ error: 'Email atau password anda salah' });
    }

    const user = users[0];

    // Remove password before sending user data
    delete user.password;

    // Login successful
    res.json({ message: 'Login Berhasil', user });
});

router.post('/signup', async (req, res) => {
    const {username, email, no_telepon, password} = req.body;

    if (!username || !email || !no_telepon || !password) {
        return res.status(400).json({ error: 'Isi semua kolom yang tersedia' });
    }

    const { data: existingUser, error } = await supabase.from('pengguna').select('id_pengguna').eq('email', email).limit(1);
    if (existingUser && existingUser.length > 0) {
        return res.status(409).json({ error: 'Email sudah terdaftar' });
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
