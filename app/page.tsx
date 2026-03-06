"use client";

import { useSession, useUser, useDescope } from "@descope/nextjs-sdk/client";
import { useCallback } from "react";
import Link from "next/link";

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 6V12C4 16.42 7.4 20.5 12 22C16.6 20.5 20 16.42 20 12V6L12 2Z" fill="white" fillOpacity="0.9" />
      <path
        d="M9 12L11 14L15 10"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const { isAuthenticated, isSessionLoading } = useSession();
  const { user } = useUser();
  const sdk = useDescope();

  const handleLogout = useCallback(() => {
    sdk.logout();
  }, [sdk]);

  const getInitials = () => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) return user.email[0].toUpperCase();
    return "U";
  };

  if (isSessionLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-8 h-8 rounded-full border-2 animate-spin"
            style={{
              borderColor: "var(--border)",
              borderTopColor: "var(--primary)",
            }}
          />
          <p style={{ color: "var(--muted)", fontSize: "0.875rem" }}>Loading...</p>
        </div>
      </main>
    );
  }

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
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
            Descope Auth Demo
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Authentication powered by Descope &amp; Next.js
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
          {isAuthenticated ? (
            <div className="flex flex-col items-center gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold text-white"
                  style={{ background: "var(--primary)" }}
                >
                  {getInitials()}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg leading-tight" style={{ color: "var(--foreground)" }}>
                    {user?.name || "Welcome back"}
                  </p>
                  {user?.email && (
                    <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
                      {user.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full h-px" style={{ background: "var(--border)" }} />

              {/* Details */}
              <div className="w-full flex flex-col gap-1">
                <div
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl"
                  style={{ background: "var(--background)" }}
                >
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    Status
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Authenticated
                  </span>
                </div>
                {user?.email && (
                  <div
                    className="flex items-center justify-between py-2.5 px-3 rounded-xl"
                    style={{ background: "var(--background)" }}
                  >
                    <span className="text-sm" style={{ color: "var(--muted)" }}>
                      Email
                    </span>
                    <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                      {user.email}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                style={{ background: "var(--primary)", color: "white" }}
                onMouseOver={(e) => (e.currentTarget.style.background = "var(--primary-hover)")}
                onMouseOut={(e) => (e.currentTarget.style.background = "var(--primary)")}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <p className="font-medium" style={{ color: "var(--foreground)" }}>
                  You&apos;re not signed in
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
                  Sign in to access your account and manage your session.
                </p>
              </div>
              <Link
                href="/sign-in"
                className="w-full py-2.5 px-4 rounded-xl text-sm font-medium text-center block"
                style={{ background: "var(--primary)", color: "white" }}
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: "var(--muted)" }}>
          Built by{" "}
          <span className="font-medium" style={{ color: "var(--foreground)" }}>
            Pedro Leite
          </span>{" "}
          with{" "}
          <span className="font-medium" style={{ color: "var(--foreground)" }}>
            Descope
          </span>{" "}
          &amp;{" "}
          <span className="font-medium" style={{ color: "var(--foreground)" }}>
            Next.js
          </span>
        </p>
      </div>
    </main>
  );
}
