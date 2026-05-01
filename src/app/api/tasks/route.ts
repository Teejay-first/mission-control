import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TASKS_PATH = path.join(process.env.HOME || "/Users/yarikjaroslav", ".hermes/tasks/tasks.json");
const PROJECTS_PATH = path.join(process.env.HOME || "/Users/yarikjaroslav", ".hermes/projects/projects.json");
const STATE_PATH = path.join(process.env.HOME || "/Users/yarikjaroslav", ".hermes/state/heartbeat-state.json");
const MEMORY_PATH = path.join(process.env.HOME || "/Users/yarikjaroslav", ".hermes/memories/MEMORY.md");
const CHANNEL_PATH = path.join(process.env.HOME || "/Users/yarikjaroslav", ".hermes/channel_directory.json");
const JOBS_PATH = path.join(process.env.HOME || "/Users/yarikjaroslav", ".hermes/cron/jobs.json");
const SESSIONS_DIR = path.join(process.env.HOME || "/Users/yarikjaroslav", ".hermes/sessions");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "tasks";

  try {
    switch (type) {
      case "tasks": {
        const data = fs.readFileSync(TASKS_PATH, "utf-8");
        return NextResponse.json(JSON.parse(data));
      }
      case "projects": {
        const data = fs.readFileSync(PROJECTS_PATH, "utf-8");
        return NextResponse.json(JSON.parse(data));
      }
      case "state": {
        const data = fs.readFileSync(STATE_PATH, "utf-8");
        return NextResponse.json(JSON.parse(data));
      }
      case "memory": {
        const data = fs.readFileSync(MEMORY_PATH, "utf-8");
        return NextResponse.json({ content: data });
      }
      case "channels": {
        const data = fs.readFileSync(CHANNEL_PATH, "utf-8");
        return NextResponse.json(JSON.parse(data));
      }
      case "jobs": {
        const data = fs.readFileSync(JOBS_PATH, "utf-8");
        return NextResponse.json(JSON.parse(data));
      }
      case "sessions": {
        const files = fs.readdirSync(SESSIONS_DIR);
        const sessions = files
          .filter((f) => f.endsWith(".jsonl"))
          .map((f) => {
            const stat = fs.statSync(path.join(SESSIONS_DIR, f));
            return {
              name: f,
              modified: stat.mtime.toISOString(),
              size: stat.size,
            };
          })
          .sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime());
        return NextResponse.json({ sessions });
      }
      default:
        return NextResponse.json({ error: "Unknown type" }, { status: 400 });
    }
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
