import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Force this route to be dynamic so it doesn't run during build time
export const dynamic = 'force-dynamic'; 

export async function GET(request: Request) {
  // Move the client initialization INSIDE the GET function
  // This prevents the build from crashing if variables are missing
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return new NextResponse('Supabase configuration missing', { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { error } = await supabase.from('leads').select('id').limit(1);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}