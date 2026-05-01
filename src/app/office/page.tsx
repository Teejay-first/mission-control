import { getHeartbeatState } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function PixelDesk() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="w-full max-w-md mx-auto"
      style={{ imageRendering: "pixelated" }}
    >
      <rect x="10" y="80" width="180" height="8" fill="#2a2a2a" />
      <rect x="20" y="88" width="4" height="20" fill="#222222" />
      <rect x="176" y="88" width="4" height="20" fill="#222222" />
      
      <rect x="30" y="60" width="60" height="30" fill="#1a1a1a" stroke="#00ff88" strokeWidth="1" />
      <rect x="35" y="65" width="50" height="15" fill="#0a0a0a" />
      <rect x="38" y="68" width="44" height="9" fill="#111111" />
      
      <rect x="110" y="65" width="25" height="3" fill="#222222" />
      <rect x="110" y="70" width="20" height="2" fill="#222222" />
      <rect x="110" y="74" width="22" height="2" fill="#222222" />
      <rect x="110" y="78" width="18" height="2" fill="#222222" />
      
      <rect x="155" y="55" width="30" height="35" fill="#0f1419" stroke="#222222" strokeWidth="1" />
      <rect x="158" y="58" width="24" height="18" fill="#1a2332" />
      <rect x="160" y="60" width="4" height="4" fill="#4a90a4" />
      <rect x="166" y="60" width="4" height="4" fill="#4a90a4" />
      <rect x="172" y="60" width="4" height="4" fill="#4a90a4" />
      <rect x="160" y="66" width="4" height="4" fill="#3d5a6e" />
      <rect x="166" y="66" width="4" height="4" fill="#3d5a6e" />
      <rect x="172" y="66" width="4" height="4" fill="#3d5a6e" />
      
      <rect x="70" y="35" width="8" height="25" fill="#2a2a2a" />
      <rect x="68" y="32" width="12" height="4" fill="#333333" />
      
      <rect x="145" y="75" width="6" height="10" fill="#3d5a6e" />
      <rect x="143" y="77" width="2" height="3" fill="#4a90a4" />
      
      <rect x="50" y="82" width="15" height="3" fill="#222222" />
      <rect x="52" y="80" width="3" height="2" fill="#00ff88" opacity="0.8" />
      <rect x="56" y="80" width="3" height="2" fill="#00ff88" opacity="0.6" />
      <rect x="60" y="80" width="3" height="2" fill="#00ff88" opacity="0.4" />
    </svg>
  );
}

function AgentFigure({ isActive }: { isActive: boolean }) {
  const glowColor = isActive ? "#00ff88" : "#333333";
  const glowOpacity = isActive ? "1" : "0.3";
  
  return (
    <svg
      viewBox="0 0 40 60"
      className="w-16 h-24 mx-auto"
      style={{ imageRendering: "pixelated" }}
    >
      <ellipse
        cx="20"
        cy="56"
        rx="12"
        ry="3"
        fill={glowColor}
        opacity={glowOpacity * 0.3}
      />
      
      <rect x="12" y="20" width="16" height="25" fill="#1a1a1a" stroke={glowColor} strokeWidth="1" />
      
      <rect x="14" y="22" width="5" height="5" fill="#0a0a0a" />
      <rect x="21" y="22" width="5" height="5" fill="#0a0a0a" />
      <rect x="15" y="23" width="3" height="3" fill={glowColor} opacity={glowOpacity} />
      <rect x="22" y="23" width="3" height="3" fill={glowColor} opacity={glowOpacity} />
      
      <rect x="16" y="30" width="8" height="2" fill="#222222" />
      
      <rect x="4" y="22" width="8" height="18" fill="#1a1a1a" stroke={glowColor} strokeWidth="0.5" />
      <rect x="28" y="22" width="8" height="18" fill="#1a1a1a" stroke={glowColor} strokeWidth="0.5" />
      
      <rect x="14" y="45" width="5" height="12" fill="#1a1a1a" stroke={glowColor} strokeWidth="0.5" />
      <rect x="21" y="45" width="5" height="12" fill="#1a1a1a" stroke={glowColor} strokeWidth="0.5" />
      
      <rect x="10" y="8" width="20" height="14" fill="#222222" />
      <rect x="12" y="10" width="16" height="10" fill="#1a1a1a" />
      <rect x="14" y="12" width="12" height="6" fill="#00ff88" opacity={glowOpacity * 0.8} />
    </svg>
  );
}

export default async function OfficePage() {
  const state = await getHeartbeatState();

  const lastActivity = new Date(state.last_activity_at);
  const now = new Date();
  const minutesAgo = Math.floor((now.getTime() - lastActivity.getTime()) / 60000);
  
  const isActive = minutesAgo < 5;
  const isCronRecent = state.last_cron_run_at &&
    (now.getTime() - new Date(state.last_cron_run_at).getTime()) < 15 * 60000;
  
  const status = isActive || isCronRecent ? "active" : "idle";

  const formatLastSeen = () => {
    if (minutesAgo < 1) return "Just now";
    if (minutesAgo === 1) return "1 minute ago";
    if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
    return `${Math.floor(minutesAgo / 60)} hours ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#00ff88] glow-green-text">Visual Office</h1>
          <p className="text-[#888888] text-sm mt-1">
            Agent workspace status
          </p>
        </div>
        <Badge
          className={
            status === "active"
              ? "bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30 text-sm px-4 py-1"
              : "bg-gray-500/20 text-gray-400 border-gray-500/30 text-sm px-4 py-1"
          }
        >
          <span className={status === "active" ? "animate-pulse" : ""}>
            {status === "active" ? "●" : "○"}
          </span>
          {" "}
          {status.toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className={`bg-[#161616] border-[#222222] ${status === "active" ? "glow-green" : ""} transition-all duration-500`}>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold text-[#e0e0e0]">
              Workspace
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="relative">
              <PixelDesk />
              <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 ${status === "active" ? "animate-pulse" : ""}`}>
                <AgentFigure isActive={status === "active"} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161616] border-[#222222]">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold text-[#e0e0e0]">
              Status Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Status:</span>
                <Badge
                  className={
                    status === "active"
                      ? "bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30"
                      : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                  }
                >
                  {status.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Last seen:</span>
                <span className="text-[#e0e0e0]">{formatLastSeen()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Session count:</span>
                <span className="text-[#e0e0e0]">{state.session_count}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Active threshold:</span>
                <span className="text-[#e0e0e0]">&lt;{state.active_threshold_minutes} min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Cron threshold:</span>
                <span className="text-[#e0e0e0]">&lt;{state.cron_active_threshold_minutes} min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161616] border-[#222222]">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold text-[#e0e0e0]">
              Activity Log
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <span className="text-[#00ff88] shrink-0">●</span>
                <div>
                  <div className="text-[#e0e0e0]">Session active</div>
                  <div className="text-[#666666]">{state.latest_session}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#22d3ee] shrink-0">●</span>
                <div>
                  <div className="text-[#e0e0e0]">Last cron run</div>
                  <div className="text-[#666666]">
                    {state.last_cron_run_at
                      ? new Date(state.last_cron_run_at).toLocaleString()
                      : "Never"}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#666666] shrink-0">○</span>
                <div>
                  <div className="text-[#888888]">Heartbeat</div>
                  <div className="text-[#666666]">{state.updated_at}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#161616] border-[#222222]">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full ${
                  isActive ? "bg-[#00ff88] shadow-[0_0_10px_#00ff88]" : "bg-[#333333]"
                }`}
              />
              <span className="text-sm text-[#888888]">Session Active</span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full ${
                  isCronRecent ? "bg-[#22d3ee] shadow-[0_0_10px_#22d3ee]" : "bg-[#333333]"
                }`}
              />
              <span className="text-sm text-[#888888]">Cron Active</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
