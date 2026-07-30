export async function sendEmailNotification(to: string, subject: string, html: string) {
  // If RESEND_API_KEY is not present, we just mock the email sending for development
  if (!process.env.RESEND_API_KEY) {
    console.log("=========================================");
    console.log(`[MOCK EMAIL] To: ${to}`);
    console.log(`[MOCK EMAIL] Subject: ${subject}`);
    console.log(`[MOCK EMAIL] Body: \n${html}`);
    console.log("=========================================");
    return { success: true, mocked: true };
  }

  // Real Resend integration (Requires `npm i resend` and a real key)
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "BuildVine <notifications@buildvine.tech>",
        to,
        subject,
        html,
      }),
    });
    const data = await res.json();
    return { success: res.ok, data };
  } catch (error) {
    console.error("Failed to send email", error);
    return { success: false, error };
  }
}
