import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";

import { helloWorld } from "@/inngest/functions/functions";

// Create an API that serves zero functions for now
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld],
});
