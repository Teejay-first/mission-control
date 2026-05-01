import { getMemory, getSessions } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MemorySearch } from "@/components/memory-search";

export default async function MemoryPage() {
  const memory = await getMemory();
  const sessions = await getSessions();

  const sessionHighlights: Record<string, string[]> = {
    "20260501_142151_5fa938a6": [
      "Mission Control dashboard build started",
      "MAX agent HTML→JPEG pipeline discussion",
      "Finance AI monitoring requested",
    ],
    "20260430_203214_4e1e531d": [
      "MAX vs Kenzi comparison report",
      "Template engine skill design",
      "Dashboard noise fixes ready",
    ],
    "20260429_105522_bdd5a21d": [
      "Operational flows mapping",
      "Google Drive workflow discussion",
    ],
    "20260427_203434_887d5880": [
      "MAX agent cron fixes applied",
      "GOG_KEYRING_PASSWORD block resolved",
    ],
    "20260426_191645_73e81b": [
      "Nauvi Studio crash investigation",
      "Daily briefing error fix",
    ],
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#00ff88] glow-green-text">Memory</h1>
        <p className="text-[#888888] text-sm mt-1">
          Session journal and persistent memory
        </p>
      </div>

      <MemorySearch memory={memory} sessions={sessions} sessionHighlights={sessionHighlights} />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <Card className="bg-[#161616] border-[#222222]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold text-[#e0e0e0]">
                Persistent Memory
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-3">
                  {memory.split("§").map((section, i) => {
                    if (!section.trim()) return null;
                    return (
                      <div
                        key={i}
                        className="p-3 rounded text-sm leading-relaxed bg-[#0a0a0a] border border-[#222222]"
                      >
                        <pre className="whitespace-pre-wrap font-mono text-xs text-[#888888]">
                          {section.trim()}
                        </pre>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-[#161616] border-[#222222]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold text-[#e0e0e0]">
                Recent Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ScrollArea className="h-[450px]">
                <div className="space-y-3">
                  {sessions.slice(0, 10).map((session) => (
                    <div
                      key={session.name}
                      className="p-3 rounded bg-[#0a0a0a] border border-[#222222] hover:border-[#00ff88]/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge
                          variant="outline"
                          className="text-[10px] bg-[#0a0a0a] border-[#222222] text-[#666666] font-mono"
                        >
                          {session.name.split("_")[0]}
                        </Badge>
                        <span className="text-[10px] text-[#666666]">
                          {formatSize(session.size)}
                        </span>
                      </div>
                      <div className="text-xs text-[#888888]">
                        {formatDate(session.modified)}
                      </div>
                      {sessionHighlights[session.name] && (
                        <div className="mt-2 space-y-1">
                          {sessionHighlights[session.name].map((highlight, i) => (
                            <div
                              key={i}
                              className="text-[10px] text-[#00ff88]/70 pl-2 border-l border-[#00ff88]/20"
                            >
                              • {highlight}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
