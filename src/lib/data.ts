import fs from "fs";
import path from "path";
import { error } from "console";

const HOME = process.env.HOME || "/Users/yarikjaroslav";

const TASKS_PATH = path.join(HOME, ".hermes/tasks/tasks.json");
const PROJECTS_PATH = path.join(HOME, ".hermes/projects/projects.json");
const STATE_PATH = path.join(HOME, ".hermes/state/heartbeat-state.json");
const MEMORY_PATH = path.join(HOME, ".hermes/memories/MEMORY.md");
const CHANNEL_PATH = path.join(HOME, ".hermes/channel_directory.json");
const JOBS_PATH = path.join(HOME, ".hermes/cron/jobs.json");
const SESSIONS_DIR = path.join(HOME, ".hermes/sessions");

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "backlog" | "in-progress" | "done";
  priority: "high" | "medium" | "low";
  source: string;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "paused";
  priority: "high" | "medium" | "low";
  source: string;
  created_at: string;
  details?: Record<string, unknown>;
}

export interface HeartbeatState {
  last_activity_at: string;
  last_session_modified: string;
  last_cron_run_at: string;
  active_threshold_minutes: number;
  cron_active_threshold_minutes: number;
  status: "active" | "idle";
  session_count: number;
  latest_session: string;
  updated_at: string;
}

function safeReadJson(p: string, fallback: unknown) {
  try {
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, "utf-8"));
    }
  } catch (e) {
    console.error(`Error reading ${p}:`, e);
  }
  return fallback;
}

function safeReadFile(p: string, fallback = ""): string {
  try {
    if (fs.existsSync(p)) {
      return fs.readFileSync(p, "utf-8");
    }
  } catch (e) {
    console.error(`Error reading ${p}:`, e);
  }
  return fallback;
}

export async function getTasks() {
  const data = safeReadJson(TASKS_PATH, { tasks: [] });
  const tasks: Task[] = data.tasks || [];
  const total = tasks.length;
  const backlog = tasks.filter((t: Task) => t.status === "backlog").length;
  const in_progress = tasks.filter((t: Task) => t.status === "in-progress").length;
  const done = tasks.filter((t: Task) => t.status === "done").length;
  return { tasks, stats: { total, backlog, in_progress, done } };
}

export async function getProjects() {
  const data = safeReadJson(PROJECTS_PATH, { projects: [] });
  const projects: Project[] = data.projects || [];
  return { projects, updated_at: new Date().toISOString() };
}

export async function getHeartbeatState(): Promise<HeartbeatState> {
  return safeReadJson(STATE_PATH, {
    last_activity_at: new Date().toISOString(),
    status: "idle",
    session_count: 0,
    latest_session: "",
    active_threshold_minutes: 5,
    cron_active_threshold_minutes: 15,
    last_session_modified: "",
    last_cron_run_at: "",
    updated_at: new Date().toISOString(),
  });
}

export async function getMemory(): Promise<string> {
  return safeReadFile(MEMORY_PATH);
}

export async function getChannelDirectory() {
  return safeReadJson(CHANNEL_PATH, {});
}

export async function getCronJobs() {
  return safeReadJson(JOBS_PATH, { jobs: [] });
}

export async function getSessions(): Promise<Array<{ name: string; modified: string; size: number }>> {
  try {
    if (!fs.existsSync(SESSIONS_DIR)) return [];
    const files = fs.readdirSync(SESSIONS_DIR);
    return files
      .filter((f) => f.endsWith(".jsonl") || f.endsWith(".json"))
      .map((f) => {
        const stat = fs.statSync(path.join(SESSIONS_DIR, f));
        return {
          name: f,
          modified: stat.mtime.toISOString(),
          size: stat.size,
        };
      })
      .sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime());
  } catch {
    return [];
  }
}
