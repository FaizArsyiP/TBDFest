import { supabase } from '../../../lib/client.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Invalid' });
  }

  const { id_pengguna, email, password, no_telepon, username } = req.body;

  if (!id_pengguna) {
    return res.status(400).json({ error: 'id_pengguna is required' });
  }
  // cek email unik
  if (email) {
    const { data: emailUser } = await supabase
      .from('pengguna')
      .select('id_pengguna')
      .eq('email', email)
      .neq('id_pengguna', id_pengguna)
      .single();

    if (emailUser) {
      return res.status(409).json({ error: 'Email ini sudah terdaftar' });
    }
  }

  // Cek username unik
  if (username) {
    const { data: usernameUser } = await supabase
      .from('pengguna')
      .select('id_pengguna')
      .eq('username', username)
      .neq('id_pengguna', id_pengguna)
      .single();

    if (usernameUser) {
      return res.status(409).json({ error: 'Username tidak tersedia' });
    }
  }
  const updates = {};
  if (email) updates.email = email;
  if (password) updates.password = password;
  if (no_telepon) updates.no_telepon = no_telepon;
  if (username) updates.username = username;

  const { data, error } = await supabase
    .from('pengguna')
    .update(updates)
    .eq('id_pengguna', id_pengguna)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (data) delete data.password;

  return res.status(200).json({ message: 'Profil Terupdate', user: data });
}