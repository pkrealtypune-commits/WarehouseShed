import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Ensures the route is never cached or pre-rendered during build
export const dynamic = 'force-dynamic'; 

export async function GET(request: Request) {
  // 1. Get variables (matching your .env exactly)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const cronSecret = process.env.CRON_SECRET;

  // 2. Immediate check for missing config
  if (!supabaseUrl || !supabaseKey) {
    console.error("CRON ERROR: Supabase URL or Service Key is undefined in process.env");
    return new NextResponse('Supabase configuration missing', { status: 500 });
  }

  // 3. Verify the Authorization Header
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${cronSecret}`) {
    console.warn("CRON ERROR: Unauthorized attempt to access keep-alive");
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // 4. Initialize client inside the handler
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 5. Perform the heartbeat query on 'enquiries' table
    const { error } = await supabase
      .from('enquiries')
      .select('id')
      .limit(1);

    if (error) {
      console.error("SUPABASE DB ERROR:", error.message);
      throw error;
    }

    return NextResponse.json({ 
      success: true, 
      timestamp: new Date().toISOString(),
      message: "Heartbeat successful (enquiries table)" 
    });

  } catch (err: any) {
    console.error("CRON RUNTIME ERROR:", err.message || err);
    return NextResponse.json({ 
      success: false, 
      error: err.message || "An unexpected error occurred" 
    }, { status: 500 });
  }
}