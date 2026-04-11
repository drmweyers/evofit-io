import { NextRequest, NextResponse } from "next/server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://evofit.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, firstName, source = "evofit.io", productTag = "bci-newsletter" } = body;

    // Validate email
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const apiUrl = process.env.SMARTSOCIAL_API_URL;
    const apiKey = process.env.SMARTSOCIAL_API_KEY;

    if (!apiUrl || !apiKey) {
      // Graceful degradation — log but don't fail the user
      console.warn(
        "[leads/capture] SMARTSOCIAL_API_URL or SMARTSOCIAL_API_KEY not set. Lead not forwarded:",
        { email, firstName, source, productTag }
      );
      return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
    }

    const response = await fetch(`${apiUrl}/api/v1/email-crm/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email, firstName, source, productTag }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("[leads/capture] SmartSocial error:", response.status, text);
      return NextResponse.json(
        { success: false, error: "Failed to subscribe. Please try again." },
        { status: 502, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error("[leads/capture] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
