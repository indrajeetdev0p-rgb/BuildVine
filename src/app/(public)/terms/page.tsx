import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "BuildVine Terms of Service — the rules and guidelines for using our platform.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm font-medium text-accent mb-2">Legal</p>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-text-primary mb-4">
          Terms of Service
        </h1>
        <p className="text-text-secondary">
          Last updated: July 30, 2026
        </p>
      </div>

      {/* Content */}
      <div className="space-y-10 text-text-secondary leading-relaxed">
        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using BuildVine (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use the Service.
            These terms apply to all visitors, users, and others who access or use the Service.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">2. Use of the Service</h2>
          <p>BuildVine is a platform for showcasing software projects. You agree to use the Service only for lawful purposes. You must not:</p>
          <ul className="list-disc list-inside mt-3 space-y-2 pl-2">
            <li>Post content that is illegal, harmful, or violates any third-party rights.</li>
            <li>Attempt to gain unauthorized access to the Service or other users&apos; accounts.</li>
            <li>Use the Service to distribute spam, malware, or other malicious content.</li>
            <li>Impersonate any person or entity.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">3. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities
            that occur under your account. Notify us immediately of any unauthorized use.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">4. User Content</h2>
          <p>
            You retain ownership of any content you post on BuildVine. By posting content, you grant BuildVine
            a worldwide, non-exclusive, royalty-free license to display and promote your content within the Service.
            You are solely responsible for the content you post.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">5. Intellectual Property</h2>
          <p>
            The BuildVine platform, including its design, code, and branding, is owned by BuildVine and protected
            by copyright and other intellectual property laws. You may not copy or distribute any part of the
            Service without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">6. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account at any time if you violate these terms
            or engage in conduct harmful to the Service or other users.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">7. Disclaimer of Warranties</h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; without warranties of any kind. We do not warrant that the
            Service will be uninterrupted or error-free.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, BuildVine shall not be liable for any indirect, incidental,
            special, or consequential damages arising from your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">9. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Service after changes constitutes
            acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">10. Contact</h2>
          <p>
            Questions? Contact us at{" "}
            <a href="mailto:hello@buildvine.tech" className="text-accent hover:underline">
              hello@buildvine.tech
            </a>.
          </p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-border-default flex gap-6">
        <Link href="/privacy" className="text-sm text-accent hover:underline">Privacy Policy →</Link>
        <Link href="/" className="text-sm text-text-secondary hover:text-text-primary">Back to Home</Link>
      </div>
    </div>
  );
}
