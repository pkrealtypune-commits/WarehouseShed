import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase (Ensure these are in your .env)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  // 1. Verify Vercel Cron Secret (Security)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // 2. Perform a tiny activity. 
    // We'll just fetch a single row or count from your leads table.
    const { data, error } = await supabase
      .from('leads')
      .select('id')
      .limit(1);

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      message: 'Database heartbeat successful',
      timestamp: new Date().toISOString() 
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}