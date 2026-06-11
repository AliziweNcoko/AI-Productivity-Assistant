import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
import { z } from "zod";

async function getModel() {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("AI gateway is not configured");
  const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
  return createLovableAiGatewayProvider(apiKey)("google/gemini-3-flash-preview");
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
  .handler(async ({ data }) => {
    const model = await getModel();
    const { output } = await generateText({
      model,
      output: Output.object({ schema: AttendanceOut }),
      prompt: `You are a CAPACITI student success coach. A student has an attendance percentage of ${data.attendance}%.
Determine risk level (low >=85%, medium 70-84%, high <70%) and respond with:
- riskLevel
- explanation (2-3 sentences, professional and supportive)
- recommendedActions (3-4 concrete actions)
- motivationalMessage (1-2 warm encouraging sentences)`,
    });
    return output;
  });

/* -------- Study Planner -------- */
const StudyOut = z.object({
  dailySchedule: z.array(z.object({ day: z.string(), focus: z.string(), hours: z.number() })),
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
  .handler(async ({ data }) => {
    const model = await getModel();
    const { output } = await generateText({
      model,
      output: Output.object({ schema: StudyOut }),
      prompt: `You are a study coach for CAPACITI students. Create a personalised study plan.
Subject/Topic: ${data.subject}
Assessment Date: ${data.assessmentDate}
Available study hours per day: ${data.hoursPerDay}
Return a daily schedule from today until the assessment date, a revision plan, top priority areas, and time-management tips. Be specific and actionable.`,
    });
    return output;
  });

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
  .handler(async ({ data }) => {
    const model = await getModel();
    const { output } = await generateText({
      model,
      output: Output.object({ schema: ReflectionOut }),
      prompt: `You are a supportive reflection coach for CAPACITI students. Synthesise this week's reflection.
What went well: ${data.wentWell}
Challenges: ${data.challenges}
Learned: ${data.learned}
Goals for next week: ${data.goals}
Provide a reflection summary, identified strengths, areas for improvement, and a concrete action plan for next week.`,
    });
    return output;
  });

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
  .handler(async ({ data }) => {
    const model = await getModel();
    const { output } = await generateText({
      model,
      output: Output.object({ schema: CareerOut }),
      prompt: `You are a career advisor for CAPACITI students. Suggest 3 careers from this list that best fit:
AI Engineer, Data Analyst, Full Stack Developer, Cloud Engineer, Software Developer, Product Manager.
Skills: ${data.skills}
Interests: ${data.interests}
Current Programme: ${data.programme}
For each recommended career include why it fits, required skills, learning resources, and next steps.`,
    });
    return output;
  });

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
  .handler(async ({ data }) => {
    const model = await getModel();
    const { output } = await generateText({
      model,
      output: Output.object({ schema: WellnessOut }),
      prompt: `You are a warm wellness coach for CAPACITI students. The student feels: ${data.mood}.
Respond with an encouraging message, productivity advice, study tips, and support recommendations. Be empathetic and professional. If "struggling", gently suggest reaching out to a Day Manager or counsellor.`,
    });
    return output;
  });
