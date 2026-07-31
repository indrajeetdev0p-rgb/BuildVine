"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { GithubIcon, GoogleIcon } from "@/components/icons";
import { signIn, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  if (session?.user) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    await signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    }, {
      onSuccess: () => {
        toast.success("Successfully logged in!");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || "An error occurred during login.");
      }
    });
    
    setIsLoading(false);
  };

  const handleGithubLogin = () => signIn.social({ provider: "github", callbackURL: "/dashboard" });
  const handleGoogleLogin = () => signIn.social({ provider: "google", callbackURL: "/dashboard" });

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-10 blur-[100px]"
          style={{ background: "var(--accent-gradient)" }}
        />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="BuildVine Logo"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <span className="font-heading text-2xl font-extrabold tracking-tight">
              BuildVine
            </span>
          </Link>
          <h1 className="mt-6 font-heading text-2xl font-bold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Log in to your account to continue building.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-[var(--radius-xl)] border border-border-default bg-bg-secondary p-8">
          {/* OAuth Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="w-full justify-center"
              leftIcon={<GithubIcon size={18} />}
              onClick={handleGithubLogin}
            >
              Continue with GitHub
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="w-full justify-center"
              leftIcon={<GoogleIcon size={18} />}
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-default" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-bg-secondary px-3 text-xs text-text-tertiary uppercase tracking-wider">
                or
              </span>
            </div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail size={16} />}
              required
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              required
            />

            <div className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-xs text-accent hover:text-accent-hover transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="md"
              className="w-full justify-center mt-2"
              isLoading={isLoading}
              rightIcon={<ArrowRight size={16} />}
            >
              Log In
            </Button>
          </form>
        </div>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-text-secondary">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-accent hover:text-accent-hover transition-colors"
          >
            Sign up for free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
