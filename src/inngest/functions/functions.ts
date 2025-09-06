import { inngest } from "../client";
import { GoogleGenAI } from "@google/genai";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    try {
      const codeAgent = new GoogleGenAI({});

      const response = await codeAgent.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
        You are an expert next.js developer. You write readable, maintainable code. You write simple Next.js & React snippets.
        Write the following snippet: ${event.data.value}`,
      });

      return response.text;
    } catch (error) {
      console.error("Gemini API error:", error);
      return { output: "API Error" };
    }
  }
);
