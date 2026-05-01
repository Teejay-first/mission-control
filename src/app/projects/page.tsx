import { getProjects } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const statusColors = {
  active: "bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30",
  completed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  paused: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

export default async function ProjectsPage() {
  const { projects } = await getProjects();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#00ff88] glow-green-text">Projects</h1>
        <p className="text-[#888888] text-sm mt-1">
          Active missions and oversight areas
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="bg-[#161616] border-[#222222] pixel-border hover:border-[#00ff88]/30 transition-colors"
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg font-semibold text-[#e0e0e0]">
                  {project.name}
                </CardTitle>
                <Badge className={statusColors[project.status]}>
                  {project.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-4">
              <p className="text-sm text-[#888888] leading-relaxed">
                {project.description}
              </p>

              {project.details && (
                <>
                  <Separator className="bg-[#222222]" />
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-[#666666] uppercase tracking-wider">
                      Details
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(project.details).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-[#666666]">{key}: </span>
                          <span className="text-[#e0e0e0]">
                            {Array.isArray(value)
                              ? value.join(", ")
                              : typeof value === "object"
                              ? JSON.stringify(value)
                              : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-[#666666] font-mono">
                  Source: {project.source}
                </span>
                <Badge
                  variant="outline"
                  className={
                    project.priority === "high"
                      ? "bg-red-500/10 border-red-500/30 text-red-400"
                      : "bg-[#0a0a0a] border-[#222222] text-[#666666]"
                  }
                >
                  {project.priority}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
