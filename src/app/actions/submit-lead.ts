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
 * Still available if needed for other components, 
 * though Layout now uses sessionStorage for performance.
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
    return { exists: false };
  }
}

/**
 * Processes the lead submission with UTM tracking and duplicate handling
 */
export async function submitLead(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData);
    
    // 1. Honeypot check (Spam Protection)
    if (rawData.website_url) {
      return { success: false, error: "Bot detected" };
    }

    const ua = (rawData.user_agent as string) || ""; 
    const browserName = getBrowserName(ua);

    /**
     * Data Mapping
     * Casting area_sqft to Number to ensure DB compatibility
     */
    const leadData = {
      full_name: rawData.full_name as string,
      phone: rawData.phone as string,
      email: (rawData.email as string) || null,
      area_sqft: rawData.area_sqft ? Number(rawData.area_sqft) : null, 
      location: rawData.location as string,
      urgency: rawData.urgency as string,
      message: (rawData.message as string) || null,
      property_title: (rawData.property_title as string) || null,
      device_type: (rawData.device_type as string) || null,
      os: (rawData.os as string) || null,
      browser: browserName,
      page_url: (rawData.page_url as string) || null,
      ip_address: (rawData.ip_address as string) || null,
      
      // Google Ads Tracking Fields
      utm_source: (rawData.utm_source as string) || null,
      utm_campaign: (rawData.utm_campaign as string) || null,
      utm_term: (rawData.utm_term as string) || null,
      gclid: (rawData.gclid as string) || null,
    };

    /**
     * 2. Server-side Duplicate Check
     * We check by Phone + Location. If a user tries to submit for the same location again,
     * we update their tracking info instead of creating a messy duplicate.
     */
    const { data: existingLead, error: checkError } = await supabase
      .from("enquiries")
      .select("id")
      .eq("phone", leadData.phone)
      .eq("location", leadData.location)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existingLead) {
      // Update existing record with the latest UTMs and set status to Re-Inquiry
      const { error: updateError } = await supabase
        .from("enquiries")
        .update({ 
          ...leadData,
          status: "Re-Inquiry", 
          updated_at: new Date().toISOString(), 
        })
        .eq("id", existingLead.id);
        
      if (updateError) throw updateError;
      return { success: true, duplicate: true };
    }

    // 3. Insert New Record
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

    // 4. Email Notification
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