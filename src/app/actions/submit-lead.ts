"use server";

import { createClient } from "@supabase/supabase-js";
import { sendLeadEmail } from "./sendEmail";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

/**
 * Checks if a lead already exists for a specific IP address.
 * Used by the frontend to decide whether to show the form or the success message.
 */
export async function checkExistingLead(ip: string) {
  try {
    if (!ip) return { exists: false };

    const { data } = await supabase
      .from("enquiries")
      .select("id")
      .eq("ip_address", ip)
      .maybeSingle();

    return { exists: !!data };
  } catch (error) {
    console.error("Check IP Error:", error);
    return { exists: false };
  }
}

/**
 * Processes the lead submission
 */
export async function submitLead(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData);
    
    // 1. Destructure to remove honeypot and separate key fields
    const { website_url, ...payload } = rawData;

    // Honeypot check
    if (website_url) {
      return { success: false, error: "Bot detected" };
    }

    const phone = payload.phone as string;
    const location = payload.location as string;
    const ip_address = payload.ip_address as string;

    // 2. Server-side Duplicate Check (by Phone + Location)
    const { data: existingLead } = await supabase
      .from("enquiries")
      .select("id")
      .eq("phone", phone)
      .eq("location", location)
      .maybeSingle();

    if (existingLead) {
      // If user submits again, bump status to Urgent
      await supabase
        .from("enquiries")
        .update({ status: "Urgent" })
        .eq("id", existingLead.id);
        
      return { success: true, duplicate: true };
    }

    // 3. Insert into Database
    const { error: dbError } = await supabase.from("enquiries").insert([
      {
        ...payload,
        status: "New",
        created_at: new Date().toISOString(),
      },
    ]);
    
    if (dbError) {
      // Handle Postgres unique constraint (code 23505)
      if (dbError.code === "23505") return { success: true, duplicate: true };
      throw dbError;
    }

    // 4. Send Email Notification
    // We pass the payload (containing name, phone, location, etc.) to the mailer
    await sendLeadEmail(payload);

    return { success: true, duplicate: false };
  } catch (err: any) {
    console.error("Submission Error:", err.message || err);
    return { success: false, error: "Failed to process request." };
  }
}