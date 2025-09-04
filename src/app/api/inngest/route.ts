import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";

// Import your functions here
// import { helloWorld } from "@/inngest/functions/hello-world";

// Create an API that serves zero functions for now
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    // Add your functions here when you create them
    // helloWorld,
  ],
});
