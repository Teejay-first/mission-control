import { getMemory, getChannelDirectory, getCronJobs, getMaxAgentHealth } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function TeamPage() {
  const memory = await getMemory();
  const channelDir = await getChannelDirectory();
  const cronJobs = await getCronJobs();
  const maxAgent = await getMaxAgentHealth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#00ff88] glow-green-text">Team</h1>
        <p className="text-[#888888] text-sm mt-1">
          Agent identity and platform connections
        </p>
      </div>

      {/* MAX Agent Health Banner */}
      <div className={`rounded-lg border p-4 flex items-center justify-between ${
        maxAgent.status === "up"
          ? "bg-[#00ff88]/5 border-[#00ff88]/30"
          : maxAgent.status === "down"
          ? "bg-red-500/10 border-red-500/30"
          : "bg-yellow-500/5 border-yellow-500/20"
      }`}>
        <div className="flex items-center gap-3">
          <span className={`text-2xl ${
            maxAgent.status === "up" ? "text-[#00ff88]" : maxAgent.status === "down" ? "text-red-400" : "text-yellow-400"
          }`}>
            {maxAgent.status === "up" ? "◉" : maxAgent.status === "down" ? "◌" : "◐"}
          </span>
          <div>
            <div className="text-sm font-semibold text-[#e0e0e0]">MAX Agent — Emmanuel's Mac Mini</div>
            <div className="text-xs text-[#666666]">
              {maxAgent.status === "up"
                ? `UP — ${maxAgent.response_time_ms}ms · https://emmanuels-mac-mini.tail1a5e76.ts.net:8443`
                : maxAgent.status === "down"
                ? `DOWN — ${maxAgent.error || "Connection failed"}`
                : "UNKNOWN — check pending"}
            </div>
          </div>
        </div>
        <div className="text-xs text-[#666666]">
          {maxAgent.last_check ? new Date(maxAgent.last_check).toLocaleTimeString() : "Never"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#161616] border-[#222222]">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold text-[#e0e0e0] flex items-center gap-2">
              <span className="text-[#00ff88]">◉</span>
              Hermes Agent Identity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-[#666666] w-24 shrink-0">Mission:</span>
                <span className="text-[#e0e0e0]">
                  Operating system beneath his business
                </span>
              </div>
              <Separator className="bg-[#222222]" />
              <div className="flex items-start gap-3">
                <span className="text-[#666666] w-24 shrink-0">Owner:</span>
                <span className="text-[#e0e0e0]">Jarié Tuytens (jarie@nauvi-ventures.com)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#666666] w-24 shrink-0">Company:</span>
                <span className="text-[#e0e0e0]">Nauvi (nauviventures.com)</span>
              </div>
              <Separator className="bg-[#222222]" />
              <div className="flex items-start gap-3">
                <span className="text-[#666666] w-24 shrink-0">Core Focus:</span>
                <div className="text-[#e0e0e0] space-y-1">
                  <div>1. Building Hermes + OpenClaw agents</div>
                  <div>2. MAX agent at maxicon.be</div>
                  <div>3. Finance AI breakthroughs</div>
                </div>
              </div>
              <Separator className="bg-[#222222]" />
              <div className="flex items-start gap-3">
                <span className="text-[#666666] w-24 shrink-0">Location:</span>
                <span className="text-[#e0e0e0]">Yarik&apos;s Mac Mini ~/agent-hub</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161616] border-[#222222]">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold text-[#e0e0e0] flex items-center gap-2">
              <span className="text-[#22d3ee]">◇</span>
              Platforms
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {Object.entries(channelDir.platforms || {}).map(([platform, contacts]) => {
                const typedContacts = contacts as Array<{ id: string; name: string; type: string }>;
                if (typedContacts.length === 0) return null;
                return (
                  <div key={platform} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-[#0a0a0a] border-[#222222] text-[#888888] text-xs uppercase"
                      >
                        {platform}
                      </Badge>
                      <span className="text-xs text-[#666666]">
                        {typedContacts.length} connection{typedContacts.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="pl-4 space-y-1">
                      {typedContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="flex items-center gap-2 text-xs"
                        >
                          <span className="text-[#00ff88]">●</span>
                          <span className="text-[#e0e0e0]">{contact.name}</span>
                          <span className="text-[#666666]">({contact.type})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161616] border-[#222222] col-span-2">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold text-[#e0e0e0] flex items-center gap-2">
              <span className="text-[#00ff88]">◈</span>
              Cron Jobs ({cronJobs.jobs?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 gap-4">
              {cronJobs.jobs?.map((job: {
                id: string;
                name: string;
                schedule_display: string;
                last_run_at: string;
                last_status: string;
                state: string;
                enabled: boolean;
                repeat?: { completed: number; times: number };
              }) => (
                <div
                  key={job.id}
                  className="p-4 rounded bg-[#0a0a0a] border border-[#222222] hover:border-[#00ff88]/30 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#e0e0e0]">
                          {job.name}
                        </span>
                        <Badge
                          className={
                            job.enabled
                              ? "bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30"
                              : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                          }
                        >
                          {job.enabled ? "ACTIVE" : "PAUSED"}
                        </Badge>
                        <Badge
                          className={
                            job.last_status === "ok"
                              ? "bg-[#00ff88]/10 text-[#00ff88]/70 border-[#00ff88]/20"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                          }
                        >
                          {job.last_status || "unknown"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#666666]">
                        <span>Schedule: {job.schedule_display}</span>
                        <span>
                          Last run:{" "}
                          {job.last_run_at
                            ? new Date(job.last_run_at).toLocaleString()
                            : "Never"}
                        </span>
                        {job.repeat && (
                          <span>
                            Progress: {job.repeat.completed}/{job.repeat.times}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
