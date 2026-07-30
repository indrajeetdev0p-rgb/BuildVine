import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  // Fetch full user data from DB
  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Settings
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Manage your account settings and public developer profile.
        </p>
      </div>

      <SettingsForm user={user} />
    </div>
  );
}
