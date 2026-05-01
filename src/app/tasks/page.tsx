import { getTasks } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const priorityColors = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

const statusLabels = {
  backlog: "BACKLOG",
  "in-progress": "IN PROGRESS",
  done: "DONE",
};

export default async function TasksPage() {
  const { tasks, stats } = await getTasks();

  const columns = [
    { key: "backlog" as const, title: "Backlog", tasks: tasks.filter((t) => t.status === "backlog") },
    { key: "in-progress" as const, title: "In Progress", tasks: tasks.filter((t) => t.status === "in-progress") },
    { key: "done" as const, title: "Done", tasks: tasks.filter((t) => t.status === "done") },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#00ff88] glow-green-text">Tasks</h1>
          <p className="text-[#888888] text-sm mt-1">Mission Control task board</p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#e0e0e0]">{stats.total}</div>
            <div className="text-[#888888] text-xs">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.backlog}</div>
            <div className="text-[#888888] text-xs">Backlog</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{stats.in_progress}</div>
            <div className="text-[#888888] text-xs">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#00ff88]">{stats.done}</div>
            <div className="text-[#888888] text-xs">Done</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.key} className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <h2 className="text-sm font-semibold text-[#888888] uppercase tracking-wider">
                {column.title}
              </h2>
              <Badge
                variant="outline"
                className="bg-[#161616] text-[#888888] border-[#222222]"
              >
                {column.tasks.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {column.tasks.map((task) => (
                <Card
                  key={task.id}
                  className="bg-[#161616] border-[#222222] pixel-border hover:border-[#00ff88]/30 transition-colors"
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-sm font-medium text-[#e0e0e0]">
                        {task.title}
                      </CardTitle>
                      <Badge className={priorityColors[task.priority]}>
                        {task.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-xs text-[#888888] leading-relaxed">
                      {task.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] text-[#666666] font-mono">
                        {task.source.split("_")[1]?.split(".")[0] || task.source}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[10px] bg-[#0a0a0a] border-[#222222] text-[#666666]"
                      >
                        {statusLabels[task.status]}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {column.tasks.length === 0 && (
                <div className="text-center py-8 text-[#666666] text-sm border border-dashed border-[#222222] rounded">
                  No tasks
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
