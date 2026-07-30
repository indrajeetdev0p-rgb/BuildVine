"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Check, X, Sparkles, Zap, Building2, HelpCircle } from "lucide-react";
import { Button, Badge, Card } from "@/components/ui";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const FAQS = [
  {
    question: "What is included in Advanced Analytics?",
    answer: "Advanced Analytics provides deep insights into your project's traffic. You'll see unique visitor counts, traffic sources (referring domains), geographic locations, and click-through rates for your custom links.",
  },
  {
    question: "Can I use my own custom domain?",
    answer: "Yes! On the Pro and Team plans, you can map your own domain (e.g., project.com) instead of using buildvine.tech/project/name.",
  },
  {
    question: "Do you offer discounts for students or open-source projects?",
    answer: "We love supporting the community. If you are building an open-source project or are currently a student, reach out to our support team for a special discount.",
  },
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer: "Absolutely. Your subscription will be prorated automatically when you change plans.",
  }
];

export default function PricingPage() {
  const { data: session } = useSession();
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="flex-1 pb-24">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden h-[800px]">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-10 blur-[120px]"
          style={{ background: "var(--accent-gradient)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-primary)_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="mb-6">
            <Badge variant="accent" size="md">
              Simple Pricing
            </Badge>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
          >
            Invest in your <span className="gradient-text">Craft</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg sm:text-xl text-text-secondary leading-relaxed"
          >
            Start for free and scale as your project grows. Get the tools you need to build in public and reach a wider audience.
          </motion.p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          className="flex justify-center items-center gap-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className={`text-sm font-medium ${!isYearly ? "text-text-primary" : "text-text-tertiary"}`}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative inline-flex h-7 w-14 items-center rounded-full bg-bg-tertiary border border-border-default transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-accent transition-transform ${isYearly ? "translate-x-8" : "translate-x-1"}`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${isYearly ? "text-text-primary" : "text-text-tertiary"}`}>Yearly</span>
            <Badge variant="accent" size="sm" className="hidden sm:inline-flex">Save 20%</Badge>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Hobby Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="h-full"
          >
            <Card className="h-full flex flex-col p-8 bg-bg-secondary border-border-default hover:border-border-hover transition-colors">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-bg-tertiary flex items-center justify-center mb-4">
                  <Sparkles size={24} className="text-text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Hobby</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-text-primary">$0</span>
                  <span className="text-text-tertiary">/mo</span>
                </div>
                <p className="text-sm text-text-secondary mt-3">Perfect for individuals starting their first side project.</p>
              </div>
              
              <Link href={session ? "/dashboard/settings" : "/register"} className="w-full mt-2 mb-8">
                <Button variant="secondary" className="w-full">Get Started</Button>
              </Link>

              <div className="flex-1 space-y-4">
                <p className="text-sm font-medium text-text-primary uppercase tracking-wider mb-4">What's included</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-text-secondary"><Check size={16} className="text-emerald-500 mt-0.5 shrink-0" /> 1 Public Project</li>
                  <li className="flex items-start gap-3 text-sm text-text-secondary"><Check size={16} className="text-emerald-500 mt-0.5 shrink-0" /> Basic Analytics</li>
                  <li className="flex items-start gap-3 text-sm text-text-secondary"><Check size={16} className="text-emerald-500 mt-0.5 shrink-0" /> BuildVine Subdomain</li>
                  <li className="flex items-start gap-3 text-sm text-text-secondary"><Check size={16} className="text-emerald-500 mt-0.5 shrink-0" /> Community Support</li>
                  <li className="flex items-start gap-3 text-sm text-text-tertiary"><X size={16} className="mt-0.5 shrink-0" /> Custom Domains</li>
                  <li className="flex items-start gap-3 text-sm text-text-tertiary"><X size={16} className="mt-0.5 shrink-0" /> Advanced Analytics</li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Pro Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="h-full relative"
          >
            <div className="absolute -inset-[1px] rounded-[var(--radius-lg)] bg-[var(--accent-gradient)] opacity-50 blur-sm pointer-events-none" />
            <Card className="h-full flex flex-col p-8 bg-bg-elevated border-accent/50 relative z-10 shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)]">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                <Badge variant="accent" size="sm" className="shadow-lg">Most Popular</Badge>
              </div>
              <div className="mb-6 mt-2">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Zap size={24} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-text-primary">${isYearly ? "7" : "9"}</span>
                  <span className="text-text-tertiary">/mo</span>
                </div>
                <p className="text-sm text-text-secondary mt-3">For serious indie hackers scaling their products.</p>
              </div>
              
              <Link href={session ? "/dashboard/settings" : "/register"} className="w-full mt-2 mb-8">
                <Button variant="gradient" className="w-full shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]">Upgrade to Pro</Button>
              </Link>

              <div className="flex-1 space-y-4">
                <p className="text-sm font-medium text-text-primary uppercase tracking-wider mb-4">Everything in Hobby, plus</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-text-secondary"><Check size={16} className="text-accent mt-0.5 shrink-0" /> Unlimited Projects</li>
                  <li className="flex items-start gap-3 text-sm text-text-secondary"><Check size={16} className="text-accent mt-0.5 shrink-0" /> Custom Domains</li>
                  <li className="flex items-start gap-3 text-sm text-text-secondary"><Check size={16} className="text-accent mt-0.5 shrink-0" /> Advanced Analytics</li>
                  <li className="flex items-start gap-3 text-sm text-text-secondary"><Check size={16} className="text-accent mt-0.5 shrink-0" /> Verified "Pro" Badge</li>
                  <li className="flex items-start gap-3 text-sm text-text-secondary"><Check size={16} className="text-accent mt-0.5 shrink-0" /> Priority Support</li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Team Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="h-full"
          >
            <Card className="h-full flex flex-col p-8 bg-bg-secondary border-border-default hover:border-border-hover transition-colors">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-bg-tertiary flex items-center justify-center mb-4">
                  <Building2 size={24} className="text-text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Team</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-text-primary">${isYearly ? "79" : "99"}</span>
                  <span className="text-text-tertiary">/mo</span>
                </div>
                <p className="text-sm text-text-secondary mt-3">For startups and agencies managing multiple products.</p>
              </div>
              
              <Link href={session ? "/dashboard/settings" : "/register"} className="w-full mt-2 mb-8">
                <Button variant="outline" className="w-full">Upgrade to Team</Button>
              </Link>

              <div className="flex-1 space-y-4">
                <p className="text-sm font-medium text-text-primary uppercase tracking-wider mb-4">Everything in Pro, plus</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-text-secondary"><Check size={16} className="text-emerald-500 mt-0.5 shrink-0" /> Up to 10 Collaborators</li>
                  <li className="flex items-start gap-3 text-sm text-text-secondary"><Check size={16} className="text-emerald-500 mt-0.5 shrink-0" /> Private Projects</li>
                  <li className="flex items-start gap-3 text-sm text-text-secondary"><Check size={16} className="text-emerald-500 mt-0.5 shrink-0" /> White-label Reporting</li>
                  <li className="flex items-start gap-3 text-sm text-text-secondary"><Check size={16} className="text-emerald-500 mt-0.5 shrink-0" /> 24/7 Dedicated Support</li>
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-text-secondary">Have a different question? Reach out to support.</p>
          </div>
          <div className="space-y-6">
            {FAQS.map((faq, idx) => (
              <Card key={idx} className="p-6 bg-bg-secondary border-border-default">
                <div className="flex gap-4">
                  <HelpCircle className="text-text-tertiary shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-2">{faq.question}</h4>
                    <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
