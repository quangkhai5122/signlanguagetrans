import { useState } from "react";
import { MOCK_TEXT2SIGN_INPUT, MOCK_TEXT2SIGN_GLOSS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Play, Pause, Download, X } from "lucide-react";
import { SkeletonPreview } from "./SkeletonPreview";

export function Text2SignEditor() {
  const [input, setInput] = useState(MOCK_TEXT2SIGN_INPUT);
  const [glossTokens, setGlossTokens] = useState<string[]>([]);
  const [translated, setTranslated] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1);

  const handleTranslate = () => {
    setGlossTokens(MOCK_TEXT2SIGN_GLOSS);
    setTranslated(true);
  };

  const removeToken = (index: number) => {
    setGlossTokens(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Text Input */}
      <div className="asl-panel">
        <div className="asl-panel-header">
          <h2 className="text-sm font-semibold">English Input</h2>
        </div>
        <div className="asl-panel-body space-y-3">
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type an English sentence to convert to ASL gloss"
            className="min-h-[100px] text-base"
            aria-label="English text input for ASL translation"
          />
          <Button className="w-full touch-target" onClick={handleTranslate} aria-label="Translate text to ASL gloss">
            <ArrowRight className="w-4 h-4 mr-2" aria-hidden="true" />
            Translate to ASL Gloss
          </Button>
        </div>
      </div>

      {/* Gloss Output */}
      {translated && (
        <div className="asl-panel animate-slide-up">
          <div className="asl-panel-header">
            <h2 className="text-sm font-semibold">Extracted Gloss</h2>
            <span className="text-xs text-muted-foreground">{glossTokens.length} tokens</span>
          </div>
          <div className="asl-panel-body">
            <div className="flex flex-wrap gap-2" role="list" aria-label="ASL gloss tokens">
              {glossTokens.map((token, i) => (
                <span
                  key={i}
                  role="listitem"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-mono text-sm font-semibold"
                >
                  {token}
                  <button onClick={() => removeToken(i)} className="hover:text-destructive" aria-label={`Remove ${token}`}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Animation Preview */}
      {translated && (
        <div className="asl-panel animate-slide-up">
          <div className="asl-panel-header">
            <h2 className="text-sm font-semibold">Sign Animation Preview</h2>
          </div>
          <div className="aspect-video bg-foreground/5 rounded-lg overflow-hidden">
            <SkeletonPreview animated={playing} />
          </div>
          <div className="p-3 flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              className="touch-target"
              onClick={() => setPlaying(!playing)}
              aria-label={playing ? "Pause animation" : "Play animation"}
            >
              {playing ? <Pause className="w-4 h-4 mr-1.5" /> : <Play className="w-4 h-4 mr-1.5" />}
              {playing ? "Pause" : "Play"}
            </Button>
            <div className="flex items-center gap-1" role="group" aria-label="Playback speed">
              {[0.5, 1, 1.5].map(s => (
                <Button
                  key={s}
                  variant={speed === s ? "default" : "outline"}
                  size="sm"
                  className="touch-target text-xs"
                  onClick={() => setSpeed(s)}
                  aria-label={`Speed ${s}x`}
                >
                  {s}x
                </Button>
              ))}
            </div>
            <div className="ml-auto flex gap-1">
              <Button variant="outline" size="sm" className="touch-target" aria-label="Download GIF">
                <Download className="w-3.5 h-3.5 mr-1" />GIF
              </Button>
              <Button variant="outline" size="sm" className="touch-target" aria-label="Export frames">
                <Download className="w-3.5 h-3.5 mr-1" />Frames
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
