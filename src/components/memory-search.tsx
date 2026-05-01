"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface MemorySearchProps {
  memory: string;
  sessions: Array<{ name: string; modified: string; size: number }>;
  sessionHighlights: Record<string, string[]>;
}

export function MemorySearch({ memory, sessions, sessionHighlights }: MemorySearchProps) {
  const [search, setSearch] = useState("");

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search sessions and memory..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-[#161616] border-[#222222] text-[#e0e0e0] placeholder:text-[#666666] pl-10"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]">
        🔍
      </span>
    </div>
  );
}
