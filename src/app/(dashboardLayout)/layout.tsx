import type { Metadata } from "next";
import ProtectedRoute from "../components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Dashboard - Portfolio",
  description: "Sumon.DevCoder",
};

export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div>{children}</div>
    </ProtectedRoute>
  );
}
