"use client";

import dynamic from "next/dynamic";

// Browser-only: keeps the admin UI out of the server (Worker) bundle and off
// every public route.
export const KeystaticAdmin = dynamic(() => import("./keystatic-app"), {
  ssr: false,
});
