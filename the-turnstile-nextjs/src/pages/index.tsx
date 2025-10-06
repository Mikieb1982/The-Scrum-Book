import { useEffect, useMemo, useState } from "react";

import type { ApiDataSource } from "@/services/apiService";
import { fetchHealthStatus, fetchMatches } from "@/services/apiService";

type HealthState = "checking…" | "ok" | "fail";

type HealthSummary = {
  ok: boolean;
  services?: Record<string, string>;
};

const formatSource = (source: ApiDataSource | null) => {
  switch (source) {
    case "firestore":
      return "Firestore";
    case "api-mock":
      return "API mock";
    case "local-mock":
      return "local seed data";
    default:
      return "unknown";
  }
};

export default function Home() {
  const [health, setHealth] = useState<HealthState>("checking…");
  const [healthDetails, setHealthDetails] = useState<HealthSummary | null>(null);
  const [healthSource, setHealthSource] = useState<ApiDataSource | null>(null);
  const [matchesCount, setMatchesCount] = useState(0);
  const [matchesSource, setMatchesSource] = useState<ApiDataSource | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadHealth = async () => {
      try {
        const result = await fetchHealthStatus();

        if (cancelled) {
          return;
        }

        setHealth(result.data.ok ? "ok" : "fail");
        setHealthDetails(result.data);
        setHealthSource(result.source);
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load API health", error);
          setHealth("fail");
          setHealthDetails(null);
          setHealthSource(null);
        }
      }
    };

    const loadMatches = async () => {
      try {
        const result = await fetchMatches();

        if (cancelled) {
          return;
        }

        setMatchesCount(result.data.length);
        setMatchesSource(result.source);
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load matches", error);
          setMatchesCount(0);
          setMatchesSource(null);
        }
      }
    };

    loadHealth();
    loadMatches();

    return () => {
      cancelled = true;
    };
  }, []);

  const services = useMemo(() => healthDetails?.services ?? {}, [healthDetails]);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, Arial" }}>
      <h1>The Turnstile</h1>
      <p>
        Backend health: <strong>{health}</strong>
        {healthSource ? ` (source: ${formatSource(healthSource)})` : null}
      </p>
      {Object.keys(services).length > 0 ? (
        <ul>
          {Object.entries(services).map(([service, status]) => (
            <li key={service}>
              {service}: <strong>{status}</strong>
            </li>
          ))}
        </ul>
      ) : null}
      <p>
        Matches loaded: <strong>{matchesCount}</strong>
        {matchesSource ? ` (source: ${formatSource(matchesSource)})` : null}
      </p>
    </main>
  );
}
