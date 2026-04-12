"use server";

import { createClient } from "@supabase/supabase-js";
import { sendLeadEmail } from "./sendEmail";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

/**
 * Helper to get Browser Name from User Agent
 */
function getBrowserName(ua: string) {
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("SamsungBrowser")) return "Samsung Browser";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  if (ua.includes("Edge")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  return "Unknown";
}

/**
 * Checks if a lead already exists for a specific IP address.
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
    
    // Honeypot check
    if (rawData.website_url) {
      return { success: false, error: "Bot detected" };
    }

    const ua = (rawData.user_agent as string) || ""; 
    const browserName = getBrowserName(ua);

    /**
     * Schema-Perfect Mapping
     * We exclude 'user_agent' here because it doesn't exist in your SQL table.
     */
    const leadData = {
      full_name: rawData.full_name as string,
      phone: rawData.phone as string,
      email: (rawData.email as string) || null,
      area_sqft: (rawData.area_sqft as string) || null, 
      location: rawData.location as string,
      urgency: rawData.urgency as string,
      message: (rawData.message as string) || null,
      property_title: (rawData.property_title as string) || null,
      device_type: (rawData.device_type as string) || null,
      os: (rawData.os as string) || null,
      browser: browserName,
      page_url: (rawData.page_url as string) || null,
      ip_address: (rawData.ip_address as string) || null,
    };

    // 1. Server-side Duplicate Check 
    // Uses your unique_lead_entry constraint (phone, location, ip_address)
    const { data: existingLead, error: checkError } = await supabase
      .from("enquiries")
      .select("id")
      .eq("phone", leadData.phone)
      .eq("location", leadData.location)
      .eq("ip_address", leadData.ip_address)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existingLead) {
      // Update existing record
      const { error: updateError } = await supabase
        .from("enquiries")
        .update({ 
          ...leadData,
          status: "Urgent", 
          // Note: updated_at is usually automatic in Supabase, but we can update it if you have the column
        })
        .eq("id", existingLead.id);
        
      if (updateError) throw updateError;
      return { success: true, duplicate: true };
    }

    // 2. Insert New Record
    const { error: dbError } = await supabase
      .from("enquiries")
      .insert([
        {
          ...leadData,
          lead_source: "Website Pop-up",
          status: "New",
        },
      ]);
    
    if (dbError) throw dbError;

    // 3. Email Notification
    try {
      await sendLeadEmail({ ...leadData, lead_source: "Website Pop-up" });
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr);
    }

    return { success: true, duplicate: false };

  } catch (err: any) {
    console.error("CRITICAL SUBMISSION ERROR:", err.message || err);
    return { 
      success: false, 
      error: "Failed to process request." 
    };
  }
}