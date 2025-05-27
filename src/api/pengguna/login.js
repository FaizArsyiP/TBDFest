import { supabase } from 'Project_TBD/lib/client';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password, nama, no_telepon, type } = req.body;

        if (type === 'login') {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error || !data.user) {
                return res.status(401).json({ error: error?.message || 'Password atau email anda salah!' });
            }
            return res.status(200).json({ user: data.user });
        }

        if (type === 'signup') {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { nama, no_telepon }
                }
            });

            if (error) {
                if (error.status === 409) {
                    return res.status(409).json({ error: 'Email sudah terdaftar' });
                }
                return res.status(500).json({ error: error.message });
            }
            return res.status(201).json({ user: data.user });
        }

        return res.status(400).json({ error: 'Invalid request' });
    }

    res.status(405).json({ error: 'Method not allowed' });
}

