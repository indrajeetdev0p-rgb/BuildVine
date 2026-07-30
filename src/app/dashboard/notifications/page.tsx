import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import NotificationsContent from "./NotificationsContent";

export const metadata = {
  title: "Notifications | BuildVine",
};

export default async function NotificationsPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  // Fetch notifications for the user
  const notifications = await db.notification.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 50 // Limit to 50 recent notifications
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 sm:p-8 md:p-12 max-w-5xl mx-auto min-h-full">
        <div className="mb-10">
          <h1 className="text-3xl font-heading font-extrabold text-text-primary tracking-tight">
            Notifications
          </h1>
          <p className="text-text-secondary mt-2">
            Stay updated with activity from your network.
          </p>
        </div>

        <NotificationsContent initialNotifications={notifications} />
      </div>
    </div>
  );
}
