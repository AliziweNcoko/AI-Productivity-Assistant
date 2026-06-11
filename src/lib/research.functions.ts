import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
import { z } from "zod";

const ResearchInput = z.object({
  content: z.string().min(1).max(20000),
});

const ResearchOutput = z.object({
  summary: z.string(),
  keyInsights: z.array(z.string()),
  recommendations: z.array(z.string()),
  simplifiedExplanation: z.string(),
});

export const summarizeResearch = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ResearchInput.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      throw new Error("AI gateway is not configured");
    }

    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(apiKey);

    const { output } = await generateText({
      model: gateway("google/gemini-3-flash-preview"),
      output: Output.object({
        schema: ResearchOutput,
      }),
      prompt: `You are a helpful research assistant for CAPACITI students. Analyze the following content and provide:
1. A concise summary
2. Key insights (3-5 bullet points)
3. Actionable recommendations (2-3 suggestions)
4. A simplified explanation that a beginner could understand

Content to analyze:
${data.content}`,
    });

    return output;
  });
