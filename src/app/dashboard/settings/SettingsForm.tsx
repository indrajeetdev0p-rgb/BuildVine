"use client";

import { motion } from "framer-motion";
import { useState, useTransition } from "react";
import { User, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { GithubIcon, TwitterIcon } from "@/components/icons";
import { Button, Input, Card, CardTitle } from "@/components/ui";
import { updateProfile } from "@/lib/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SettingsForm({ user }: { user: any }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await updateProfile(formData);
        toast.success("Profile updated successfully!");
        router.refresh();
      } catch (error: any) {
        toast.error(error.message || "Failed to update profile");
      }
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Card padding="lg" className="space-y-6">
        <div>
          <CardTitle className="text-lg">Public Profile</CardTitle>
          <p className="text-sm text-text-tertiary mt-1">
            This information will be displayed publicly on your developer profile.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            label="Display Name"
            name="name"
            defaultValue={user.name}
            placeholder="John Doe"
            required
            leftIcon={<User size={16} />}
          />
          <Input
            label="Username"
            name="username"
            defaultValue={user.username || ""}
            placeholder="johndoe"
            required
            leftIcon={<span className="text-text-tertiary font-mono">@</span>}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Bio
          </label>
          <textarea
            name="bio"
            defaultValue={user.bio || ""}
            placeholder="I build cool things..."
            className="w-full min-h-[100px] rounded-[var(--radius-md)] border border-border-default bg-bg-primary px-3 py-2 text-sm text-text-primary transition-all duration-200 placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Profile Avatar
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-bg-elevated border border-border-default flex items-center justify-center shrink-0">
              {(user.avatar || user.image) ? (
                <img src={(user.avatar || user.image) as string} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <User className="text-text-tertiary" size={24} />
              )}
            </div>
            <div className="flex-1 w-full">
              <input type="hidden" name="avatar" value={user.avatar || ""} />
              <input
                type="file"
                name="avatarFile"
                accept="image/png, image/jpeg, image/webp"
                className="w-full text-sm text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-bg-tertiary file:text-text-primary hover:file:bg-bg-hover transition-colors"
              />
              <p className="mt-1.5 text-xs text-text-tertiary">
                Max 2MB.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card padding="lg" className="space-y-6">
        <div>
          <CardTitle className="text-lg">Social Links</CardTitle>
          <p className="text-sm text-text-tertiary mt-1">
            Connect your other profiles to your BuildVine account.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label="Personal Website"
            name="website"
            defaultValue={user.website || ""}
            placeholder="https://yourwebsite.com"
            leftIcon={<LinkIcon size={16} />}
          />
          <Input
            label="GitHub Username"
            name="github"
            defaultValue={user.github || ""}
            placeholder="johndoe"
            leftIcon={<GithubIcon size={16} />}
          />
          <Input
            label="Twitter Username"
            name="twitter"
            defaultValue={user.twitter || ""}
            placeholder="johndoe"
            leftIcon={<TwitterIcon size={16} />}
          />
        </div>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          isLoading={isPending}
        >
          Save Changes
        </Button>
      </div>
    </motion.form>
  );
}
