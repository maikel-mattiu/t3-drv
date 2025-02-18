// app/providers.jsx
"use client";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import React, { useEffect } from "react";
import { env } from "~/env";
import dynamicLoader from "next/dynamic";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "/ingest",
      ui_host: "/https://us.posthog.com",
      person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
    });
  }, []);

  const SuspensePostHogPageView = dynamicLoader(
    () => import("./pageview-tracker"),
    { ssr: false }
  );

  return (
    <PHProvider client={posthog}>
      <SuspensePostHogPageView />
      {children}
    </PHProvider>
  );
}
