import type { Metadata } from "next";
import SidebarLayout from "../../components/SidebarLayout";

export const metadata: Metadata = {
  title: "Dashboard - Portfolio",
  description: "Discover Your Perfect Pet!",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <div className="bg-gray-800">
        <SidebarLayout />
      </div>
      <div className="flex-grow p-2">{children}</div>
    </div>
  );
}
