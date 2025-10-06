import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";

if (!admin.apps.length) admin.initializeApp();

const app = express();
app.use(express.json());
app.use(cors());

// Health
app.get("/health", (_req, res) => res.json({ ok: true }));

// Example endpoints. Replace with real logic later.
app.get("/fixtures", async (_req, res) => {
  // const db = admin.firestore();
  // const snap = await db.collection("fixtures").get();
  // const fixtures = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  const fixtures: any[] = [];
  res.json({ fixtures });
});

app.get("/venues", async (_req, res) => {
  res.json({ venues: [] });
});

// Export HTTPS function mounted at /api/*
export const api = functions.https.onRequest(app);
