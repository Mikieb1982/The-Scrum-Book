import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";

if (!admin.apps.length) admin.initializeApp();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/matches", async (_req, res) => {
  // TODO: read from Firestore when ready
  // const db = admin.firestore();
  // const snap = await db.collection("matches").get();
  // const matches = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  const matches: any[] = []; // placeholder
  res.json({ matches });
});

export const api = functions.https.onRequest(app);
