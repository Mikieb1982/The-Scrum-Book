import { useEffect, useState } from "react";

import { loadJSON } from "@/lib/data";
import type { Match } from "@/types";

type DataStatus = "loading" | "ok" | "fail";

export default function Home() {
  const [status, setStatus] = useState<DataStatus>("loading");
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadMatches = async () => {
      try {
        const result = await loadJSON<Match[]>("/data/matches.json");

        if (cancelled) {
          return;
        }

        setMatches(result);
        setStatus(result.length > 0 ? "ok" : "fail");
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load matches", error);
          setMatches([]);
          setStatus("fail");
        }
      }
    };

    loadMatches();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, Arial" }}>
      <h1>The Turnstile</h1>
      <p>
        Data status: <strong>{status}</strong>
      </p>
      <p>
        Matches loaded: <strong>{matches.length}</strong>
      </p>
    </main>
  );
}
