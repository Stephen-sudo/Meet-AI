// src/app/api/inngest/route.ts
import { serve } from "inngest/next";
import { inngest } from "@/app/inngest/client";
import { meetingsProcessing } from "@/app/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [meetingsProcessing],
});
