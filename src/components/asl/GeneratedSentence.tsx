import { useASL } from "@/context/ASLContext";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

export function GeneratedSentence() {
  const { generatedSentence } = useASL();

  if (!generatedSentence) return null;

  return (
    <div className="asl-panel animate-slide-up">
      <div className="asl-panel-header">
        <h2 className="text-sm font-semibold">Generated Sentence</h2>
      </div>
      <div className="asl-panel-body space-y-3">
        <p className="text-lg font-medium leading-relaxed">{generatedSentence}</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="touch-target" aria-label="Play audio of generated sentence">
            <Volume2 className="w-4 h-4 mr-1.5" aria-hidden="true" />
            Play Audio
          </Button>
          <span className="text-xs text-muted-foreground">(Mock TTS)</span>
        </div>
      </div>
    </div>
  );
}
