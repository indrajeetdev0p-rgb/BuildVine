"use server";

import { sendEmailNotification } from "@/lib/email";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required." };
  }

  // The email we want to receive these messages at
  const TO_EMAIL = "hello@buildvine.tech";

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${name} (${email})</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <br/>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br/>")}</p>
  `;

  const result = await sendEmailNotification(
    TO_EMAIL,
    `Contact Form: ${subject}`,
    html
  );

  if (!result.success) {
    return { success: false, error: "Failed to send message. Please try again later." };
  }

  return { success: true };
}
