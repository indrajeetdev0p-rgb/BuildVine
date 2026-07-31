import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "BuildVine Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm font-medium text-accent mb-2">Legal</p>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-text-primary mb-4">
          Privacy Policy
        </h1>
        <p className="text-text-secondary">Last updated: July 30, 2026</p>
      </div>

      {/* Content */}
      <div className="space-y-10 text-text-secondary leading-relaxed">
        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">1. Introduction</h2>
          <p>
            BuildVine is committed to protecting your privacy. This Privacy Policy explains how we collect,
            use, and safeguard your information when you use our platform at buildvine.tech.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">2. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong className="text-text-primary">Account Information:</strong> Name, email, username, and profile picture when you register.</li>
            <li><strong className="text-text-primary">OAuth Data:</strong> Public profile data from GitHub or Google if you use social sign-in.</li>
            <li><strong className="text-text-primary">Project Content:</strong> Projects, descriptions, and other content you create.</li>
            <li><strong className="text-text-primary">Usage Data:</strong> Pages visited and features used to improve the Service.</li>
            <li><strong className="text-text-primary">Technical Data:</strong> IP address, browser type, and device information for security.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Provide, operate, and improve the BuildVine platform.</li>
            <li>Send you notifications about activity on your projects (comments, follows, etc.).</li>
            <li>Authenticate your identity and secure your account.</li>
            <li>Respond to your support requests.</li>
            <li>Analyze usage patterns to improve user experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">4. Email Notifications</h2>
          <p>
            We use Resend to send transactional email notifications from{" "}
            <strong className="text-text-primary">notifications@buildvine.tech</strong>.
            You can manage your notification preferences in your account settings.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">5. Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share data only
            with trusted service providers who help us operate the platform (hosting, email delivery),
            under strict confidentiality agreements.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">6. Public Information</h2>
          <p>
            Your username, profile, and public projects are visible to all visitors. Be mindful of what
            information you choose to make public.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">7. Data Security</h2>
          <p>
            We use industry-standard security measures including encrypted connections (HTTPS) and secure
            authentication. However, no internet transmission is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">8. Your Rights</h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Access and review the personal information we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your account and associated data.</li>
            <li>Opt out of non-essential communications.</li>
          </ul>
          <p className="mt-3">
            To exercise these rights, contact{" "}
            <a href="mailto:hello@buildvine.tech" className="text-accent hover:underline">
              hello@buildvine.tech
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">9. Third-Party Services</h2>
          <p>We use the following services, each with their own privacy policies:</p>
          <ul className="list-disc list-inside mt-3 space-y-2 pl-2">
            <li>GitHub OAuth &amp; Google OAuth (authentication)</li>
            <li>Resend (email delivery)</li>
            <li>AWS S3 (file storage)</li>
            <li>Turso (database)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time and will notify you by posting the new policy
            with an updated effective date.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">11. Contact</h2>
          <p>
            Questions? Contact us at{" "}
            <a href="mailto:hello@buildvine.tech" className="text-accent hover:underline">
              hello@buildvine.tech
            </a>.
          </p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-border-default flex gap-6">
        <Link href="/terms" className="text-sm text-accent hover:underline">Terms of Service →</Link>
        <Link href="/" className="text-sm text-text-secondary hover:text-text-primary">Back to Home</Link>
      </div>
    </div>
  );
}
