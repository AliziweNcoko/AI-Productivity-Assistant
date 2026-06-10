import { Info } from "lucide-react";

export function ResponsibleAINotice() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-muted/60 p-4 text-sm text-muted-foreground">
      <Info className="h-4 w-4 mt-0.5 text-purple shrink-0" />
      <p>
        <span className="font-semibold text-foreground">Responsible AI: </span>
        AI-generated content may contain inaccuracies. Always review outputs before submitting work.
      </p>
    </div>
  );
}
