import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

type Match = { id: string; [k: string]: any };

export default function Home() {
  const [status, setStatus] = useState<"loading"|"ok"|"fail">("loading");
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, "matches"));
        const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setMatches(rows);
        setStatus("ok");
      } catch {
        setStatus("fail");
      }
    })();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, Arial" }}>
      <h1>The Turnstile</h1>
      <p>Firestore status: <strong>{status}</strong></p>
      <p>Matches: <strong>{matches.length}</strong></p>
    </main>
  );
}
