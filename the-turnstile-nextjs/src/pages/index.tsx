import { useEffect, useState } from "react";

type Health = { ok: boolean };
type Matches = { matches: any[] };

export default function Home() {
  const [health, setHealth] = useState<"checking…" | "ok" | "fail">("checking…");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const run = async () => {
      try {
        const h = (await (await fetch("/api/health")).json()) as Health;
        setHealth(h.ok ? "ok" : "fail");
      } catch {
        setHealth("fail");
      }

      try {
        const m = (await (await fetch("/api/matches")).json()) as Matches;
        setCount(Array.isArray(m.matches) ? m.matches.length : 0);
      } catch {
        setCount(0);
      }
    };
    run();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, Arial" }}>
      <h1>The Turnstile</h1>
      <p>Backend health: <strong>{health}</strong></p>
      <p>Matches loaded: <strong>{count}</strong></p>
      <p>If numbers look wrong, deploy finished but data is placeholder.</p>
    </main>
  );
}
