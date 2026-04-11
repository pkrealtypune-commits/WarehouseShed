"use server";

import { Resend } from "resend";

// Ensure your RESEND_API_KEY is set in your .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadEmail(payload: any) {
  try {
    const { data, error } = await resend.emails.send({
      // IMPORTANT: Use this 'from' until you verify your custom domain in Resend
      from: "Realty Works Leads <onboarding@resend.dev>",
      to: ["pkrealtypune@gmail.com"], 
      subject: `🔥 NEW WAREHOUSE LEAD: ${payload.full_name}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #0f172a; padding: 30px; text-align: center; border-bottom: 4px solid #fd610d;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">Warehouse Enquiry Received</h1>
            <p style="color: #fd610d; margin: 5px 0 0 0; font-weight: bold; font-size: 12px; letter-spacing: 1px;">REALTY WORKS PUNE</p>
          </div>

          <div style="padding: 40px; background-color: #ffffff;">
            <p style="font-size: 16px; color: #475569; margin-bottom: 25px;">You have a new high-intent lead for <strong>${payload.property_title}</strong>.</p>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #94a3b8; font-size: 13px; text-transform: uppercase; font-weight: bold;">Lead Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold; font-size: 15px;">${payload.full_name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #94a3b8; font-size: 13px; text-transform: uppercase; font-weight: bold;">Phone Number</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #fd610d; font-weight: bold; font-size: 15px;">${payload.phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #94a3b8; font-size: 13px; text-transform: uppercase; font-weight: bold;">Location/Zone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold; font-size: 15px;">${payload.location}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #94a3b8; font-size: 13px; text-transform: uppercase; font-weight: bold;">Urgency</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold; font-size: 15px;">${payload.urgency}</td>
              </tr>
            </table>

            <div style="margin-top: 30px; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px dashed #cbd5e1;">
              <p style="margin: 0 0 10px 0; font-size: 12px; color: #64748b; font-weight: bold; text-transform: uppercase;">Message / Requirement:</p>
              <p style="margin: 0; font-size: 14px; color: #334155; line-height: 1.6; font-style: italic;">"${payload.message}"</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
              <p style="margin: 0; font-size: 11px; color: #94a3b8;"><strong>Device:</strong> ${payload.os} | ${payload.browser}</p>
              <p style="margin: 5px 0 0 0; font-size: 11px; color: #94a3b8;"><strong>Lead Source:</strong> ${payload.page_url}</p>
            </div>
          </div>

          <div style="background-color: #f1f5f9; padding: 20px; text-align: center;">
             <p style="margin: 0; font-size: 12px; color: #64748b; font-weight: bold;">© 2026 REALTY WORKS INDUSTRIAL SOLUTIONS</p>
          </div>
        </div>
      `,
    });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Email Service Error:", err);
    return { success: false, error: err };
  }
}