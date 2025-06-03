import { supabase } from "@/lib/client";

export async function GET() {
    const { data, error } = await supabase
        .from('Event')
        .select('*')

    if (error) {
        return Response.json({ error: 'Gagal mengambil data event' }, { status: 500 });
    }

    return Response.json(data, { status: 200 });
}