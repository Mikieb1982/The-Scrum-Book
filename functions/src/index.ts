import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";

if (!admin.apps.length) admin.initializeApp();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/matches", (_req, res) => res.json({ matches: [] }));

export const api = functions.https.onRequest(app);
