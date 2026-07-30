import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { db } from "@/lib/db";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  const dbUser = await db.user.findUnique({
    where: { id: session.user.id }
  });

  // Pass user details to the sidebar layout
  return <SidebarLayout user={dbUser || session.user}>{children}</SidebarLayout>;
}
