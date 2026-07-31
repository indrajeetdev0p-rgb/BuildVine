"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { submitContactForm } from "./actions";
import { toast } from "sonner";

export default function ContactPage() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const result = await submitContactForm(formData);
    setIsPending(false);

    if (result.success) {
      setIsSuccess(true);
      toast.success("Message sent successfully!");
    } else {
      toast.error(result.error || "Failed to send message.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-accent/10 text-accent mb-6">
          <Mail size={32} />
        </div>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-text-primary mb-4">
          Contact our team
        </h1>
        <p className="text-text-secondary text-lg max-w-xl mx-auto">
          Have a question, feedback, or need help with a project? Send us a message and we'll get back to you within 24 hours.
        </p>
      </div>

      {/* Contact Form */}
      <div className="bg-bg-secondary border border-border-default rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 size={48} className="text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-2">Message Sent!</h3>
            <p className="text-text-secondary mb-6">We've received your message and will be in touch shortly.</p>
            <Button variant="outline" onClick={() => setIsSuccess(false)}>
              Send another message
            </Button>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-text-primary">
                  Full Name
                </label>
                <Input id="name" name="name" placeholder="John Doe" required disabled={isPending} />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-text-primary">
                  Email Address
                </label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required disabled={isPending} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-text-primary">
                Subject
              </label>
              <Input id="subject" name="subject" placeholder="How can we help?" required disabled={isPending} />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-text-primary">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                disabled={isPending}
                placeholder="Tell us what's on your mind..."
                className="w-full rounded-xl border border-border-default bg-bg-primary px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-y disabled:opacity-50"
              />
            </div>

            <Button type="submit" variant="accent" size="lg" className="w-full font-bold" isLoading={isPending}>
              {isPending ? "Sending..." : "Send Message"} <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
