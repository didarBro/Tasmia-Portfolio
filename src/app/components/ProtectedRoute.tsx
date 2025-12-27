"use client";

import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { currentToken } from "../../redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(currentToken); // Get the auth token from Redux
  const router = useRouter(); // Next.js Router

  useEffect(() => {
    if (!token) {
      // Redirect to the login page if the token doesn't exist
      router.push("/login");
    }
  }, [token, router]);

  // Show nothing or a loading spinner while checking the token
  if (!token) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
