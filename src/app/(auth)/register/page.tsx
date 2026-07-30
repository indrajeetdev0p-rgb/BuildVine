"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Eye, EyeOff, ArrowRight, User } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { GithubIcon, GoogleIcon } from "@/components/icons";
import { signUp, signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleTest = async () => {
    try {
      const res = await fetch("/api/test-db");
      const data = await res.json();
      console.log("TEST DB RESULT:", data);
      toast.success("Test DB successful");
    } catch (err) {
      console.error(err);
      toast.error(String(err));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    await signUp.email({
      name,
      email,
      password,
      username,
      callbackURL: "/dashboard",
    }, {
      onSuccess: () => {
        toast.success("Successfully created account!");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || "An error occurred during registration.");
      }
    });

    setIsLoading(false);
  };

  const handleGithubLogin = () => signIn.social({ provider: "github", callbackURL: "/dashboard" });
  const handleGoogleLogin = () => signIn.social({ provider: "google", callbackURL: "/dashboard" });

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4 py-12">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-10 blur-[100px]"
          style={{ background: "var(--accent-gradient)" }}
        />
        <button onClick={handleTest} className="mt-4 text-xs text-blue-500">
          Test DB Connection Directly
        </button>
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
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold text-white"
              style={{ backgroundImage: "var(--accent-gradient)" }}
            >
              B
            </div>
            <span className="font-heading text-2xl font-extrabold tracking-tight">
              BuildVine
            </span>
          </Link>
          <h1 className="mt-6 font-heading text-2xl font-bold tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Start showcasing your projects to the world.
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
              Sign up with GitHub
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="w-full justify-center"
              leftIcon={<GoogleIcon size={18} />}
              onClick={handleGoogleLogin}
            >
              Sign up with Google
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

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="name"
                label="Full Name"
                type="text"
                placeholder="John Doe"
                leftIcon={<User size={16} />}
                required
              />
              <Input
                name="username"
                label="Username"
                type="text"
                placeholder="johndoe"
                hint="BuildVine.app/johndoe"
                required
              />
            </div>
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
              placeholder="Min. 8 characters"
              hint="Must be at least 8 characters"
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

            <Button
              type="submit"
              variant="gradient"
              size="md"
              className="w-full justify-center mt-2"
              isLoading={isLoading}
              rightIcon={<ArrowRight size={16} />}
            >
              Create Account
            </Button>
          </form>

          <p className="mt-4 text-xs text-text-tertiary text-center">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-accent hover:text-accent-hover transition-colors">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-accent hover:text-accent-hover transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-accent hover:text-accent-hover transition-colors"
          >
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
