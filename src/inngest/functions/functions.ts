import { inngest } from "../client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox } from "../utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    try {
      const sandboxId = await step.run("get-sandbox-id", async () => {
        const sandbox = await Sandbox.create("test-2");
        return sandbox.sandboxId;
      });

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const response = await model.generateContent(`
        You are an expert next.js developer. You write readable, maintainable code. You write simple Next.js & React snippets.
        Write the following snippet: ${event.data.value}
      `); 

      const sandboxUrl = await step.run("get-sandbox-url", async () => {
        const sandbox = await getSandbox(sandboxId);
        const host = sandbox.getHost(3000);
        return `https://${host}`;
      });

      return { output: response.response.text(), sandboxUrl };
    } catch (error) {
      console.error("Gemini API error:", error);
      return { output: "API Error" };
    }
  }
);
