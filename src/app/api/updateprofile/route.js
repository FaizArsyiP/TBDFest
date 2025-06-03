import { supabase } from '@/lib/client';

export async function PUT(req) {
  const body = await req.json();

  const { id_pengguna, email, password, no_telepon, username } = body;

  if (!id_pengguna) {
    return Response.json({ error: 'id_pengguna is required' }, { status: 400 });
  }

  // Cek email unik
  if (email) {
    const { data: emailUser } = await supabase
      .from('pengguna')
      .select('id_pengguna')
      .eq('email', email)
      .neq('id_pengguna', id_pengguna)
      .single();

    if (emailUser) {
      return Response.json({ error: 'Email ini sudah terdaftar' }, { status: 409 });
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
      return Response.json({ error: 'Username tidak tersedia' }, { status: 409 });
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
    return Response.json({ error: error.message }, { status: 500 });
  }

  if (data) delete data.password;

  return Response.json({ message: 'Profil Terupdate', user: data }, { status: 200 });
}
