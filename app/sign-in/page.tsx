"use client";

import { Descope } from "@descope/nextjs-sdk";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 6V12C4 16.42 7.4 20.5 12 22C16.6 20.5 20 16.42 20 12V6L12 2Z" fill="white" fillOpacity="0.9" />
      <path d="M9 12L11 14L15 10" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SignInPage() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: "var(--background)" }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ background: "var(--primary)" }}
          >
            <ShieldIcon />
          </div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Welcome back
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Sign in or create a new account to continue
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border p-8"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow)",
          }}
        >
          <Descope
            flowId="sign-up-or-in"
            onSuccess={() => router.push("/")}
            onError={(e) => console.error("Auth error: ", e)}
          />
        </div>

        {/* Back link */}
        <p className="text-center text-xs mt-6" style={{ color: "var(--muted)" }}>
          <Link
            href="/"
            className="hover:underline transition-all"
            style={{ color: "var(--primary)" }}
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
