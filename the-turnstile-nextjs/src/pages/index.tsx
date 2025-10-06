import { useEffect, useState } from "react";

type Health = { ok: boolean };
type Matches = { matches: any[] };

export default function Home() {
  return <main style={{padding:24,fontFamily:"system-ui"}}><h1>The Turnstile</h1></main>;
}

  const [health, setHealth] = useState<string>("checking…");
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // check backend function
    fetch("/api/health")
      .then(r => r.json())
      .then((d: Health) => setHealth(d.ok ? "ok" : "fail"))
      .catch(() => setHealth("fail"));

    // example data call
    fetch("/api/matches")
      .then(r => r.json())
      .then((d: Matches) => setCount(d.matches?.length ?? 0))
      .catch(() => setCount(0));
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
