import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
import { z } from "zod";

async function getModel() {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("AI gateway is not configured");
  const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
  return createLovableAiGatewayProvider(apiKey)("google/gemini-3-flash-preview");
}

function extractJson(text: string): unknown {
  let cleaned = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  const start = cleaned.search(/[\{\[]/);
  const isArr = start !== -1 && cleaned[start] === "[";
  const end = cleaned.lastIndexOf(isArr ? "]" : "}");
  if (start === -1 || end === -1) throw new Error("No JSON found");
  cleaned = cleaned.substring(start, end + 1);
  try {
    return JSON.parse(cleaned);
  } catch {
    cleaned = cleaned.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").replace(/[\x00-\x1F\x7F]/g, "");
    return JSON.parse(cleaned);
  }
}

async function generateStructured<T extends z.ZodType>(schema: T, prompt: string): Promise<z.infer<T>> {
  const model = await getModel();
  try {
    const { output } = await generateText({
      model,
      output: Output.object({ schema }),
      prompt,
    });
    return output as z.infer<T>;
  } catch (e) {
    // Fallback: ask for raw JSON and parse manually
    const { text } = await generateText({
      model,
      prompt: `${prompt}\n\nReturn ONLY a valid JSON object matching this shape, no markdown, no commentary.`,
    });
    const parsed = extractJson(text);
    return schema.parse(parsed);
  }
}

/* -------- Attendance Risk -------- */
const AttendanceOut = z.object({
  riskLevel: z.enum(["low", "medium", "high"]),
  explanation: z.string(),
  recommendedActions: z.array(z.string()),
  motivationalMessage: z.string(),
});
export const predictAttendanceRisk = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => z.object({ attendance: z.number().min(0).max(100) }).parse(i))
  .handler(async ({ data }) =>
    generateStructured(
      AttendanceOut,
      `You are a CAPACITI student success coach. A student has an attendance percentage of ${data.attendance}%.
Determine riskLevel ("low" if >=85, "medium" if 70-84, "high" if <70).
Respond with riskLevel, explanation (2-3 supportive sentences), recommendedActions (3-4 concrete actions), motivationalMessage (1-2 warm sentences).`,
    ),
  );

/* -------- Study Planner -------- */
const StudyOut = z.object({
  dailySchedule: z.array(z.object({ day: z.string(), focus: z.string(), hours: z.string() })),
  revisionPlan: z.array(z.string()),
  priorityAreas: z.array(z.string()),
  timeManagementTips: z.array(z.string()),
});
export const generateStudyPlan = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) =>
    z.object({
      subject: z.string().min(1).max(200),
      assessmentDate: z.string().min(1),
      hoursPerDay: z.number().min(0.5).max(16),
    }).parse(i),
  )
  .handler(async ({ data }) =>
    generateStructured(
      StudyOut,
      `You are a study coach for CAPACITI students. Build a study plan.
Subject: ${data.subject}
Assessment Date: ${data.assessmentDate}
Hours per day: ${data.hoursPerDay}
Return dailySchedule (each item: day label like "Mon Jun 10", focus string, hours like "2h"), revisionPlan, priorityAreas, timeManagementTips. Be specific and actionable.`,
    ),
  );

/* -------- Weekly Reflection -------- */
const ReflectionOut = z.object({
  summary: z.string(),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  actionPlan: z.array(z.string()),
});
export const generateReflection = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) =>
    z.object({
      wentWell: z.string().min(1),
      challenges: z.string().min(1),
      learned: z.string().min(1),
      goals: z.string().min(1),
    }).parse(i),
  )
  .handler(async ({ data }) =>
    generateStructured(
      ReflectionOut,
      `You are a supportive reflection coach for CAPACITI students.
Went well: ${data.wentWell}
Challenges: ${data.challenges}
Learned: ${data.learned}
Goals next week: ${data.goals}
Return summary, strengths, areasForImprovement, actionPlan.`,
    ),
  );

/* -------- Career Path -------- */
const CareerOut = z.object({
  recommendedPaths: z.array(
    z.object({
      title: z.string(),
      whyItFits: z.string(),
      requiredSkills: z.array(z.string()),
      learningResources: z.array(z.string()),
      nextSteps: z.array(z.string()),
    }),
  ),
});
export const recommendCareer = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) =>
    z.object({
      skills: z.string().min(1),
      interests: z.string().min(1),
      programme: z.string().min(1),
    }).parse(i),
  )
  .handler(async ({ data }) =>
    generateStructured(
      CareerOut,
      `You are a career advisor for CAPACITI students. Pick 3 careers from:
AI Engineer, Data Analyst, Full Stack Developer, Cloud Engineer, Software Developer, Product Manager.
Skills: ${data.skills}
Interests: ${data.interests}
Programme: ${data.programme}
For each: title, whyItFits, requiredSkills, learningResources, nextSteps.`,
    ),
  );

/* -------- Wellness -------- */
const WellnessOut = z.object({
  encouragement: z.string(),
  productivityAdvice: z.array(z.string()),
  studyTips: z.array(z.string()),
  supportRecommendations: z.array(z.string()),
});
export const wellnessCoach = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) =>
    z.object({ mood: z.enum(["great", "good", "okay", "struggling"]) }).parse(i),
  )
  .handler(async ({ data }) =>
    generateStructured(
      WellnessOut,
      `You are a warm wellness coach for CAPACITI students. Student feels: ${data.mood}.
Return encouragement (1-2 sentences), productivityAdvice (3 items), studyTips (3 items), supportRecommendations (2-3 items). If "struggling", suggest reaching out to a Day Manager.`,
    ),
  );
