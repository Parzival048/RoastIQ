import { SignInForm } from "@/components/auth/signin-form";
import { Navbar } from "@/components/shared/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — RoastIQ",
  description: "Sign in to RoastIQ to access your dashboard, saved roasts, and reports.",
};

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 flex items-center justify-center px-4">
        <SignInForm />
      </main>
    </>
  );
}
