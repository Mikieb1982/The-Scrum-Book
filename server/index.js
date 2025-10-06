const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const { z } = require('zod');

// IMPORTANT: Replace this with the real name of your downloaded JSON file
const SERVICE_ACCOUNT_FILE = 'the-scrum-book-firebase-adminsdk-your-file-name.json';

if (!admin.apps.length) {
  try {
    const serviceAccountPath = path.join(__dirname, SERVICE_ACCOUNT_FILE);

    if (!fs.existsSync(serviceAccountPath)) {
      throw new Error(`Service account file not found at: ${serviceAccountPath}`);
    }

    const serviceAccount = require(serviceAccountPath);
    console.log(`✅ Initializing Firebase with service account: ${serviceAccount.project_id}`);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id
    });
  } catch (error) {
    console.error('❌ CRITICAL: Firebase Admin SDK initialization failed.', error.message);
    admin.initializeApp(); // Fallback initialization
  }
}

const firestoreProjectId =
  admin.app().options?.projectId ||
  process.env.GOOGLE_CLOUD_PROJECT ||
  process.env.GCLOUD_PROJECT ||
  process.env.FIREBASE_CONFIG?.projectId;

const db = admin.firestore();

const { mockLeagueTable, mockMatches } = require('./mockData');
const clone = (value) => JSON.parse(JSON.stringify(value));
const getMockMatches = () => clone(mockMatches);
const getMockLeagueTable = () => clone(mockLeagueTable);

const app = express();

app.use(cors());
app.use(express.json());

if (!firestoreProjectId) {
  console.warn('Firestore project ID not detected. Firestore queries may fail; serving mock data if needed.');
}

let firestoreAvailable = true;

const respondWithMockData = (res, collection, error) => {
  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Falling back to mock ${collection} data: ${message}`);

    if (message.includes('Unable to detect a Project Id')) {
      firestoreAvailable = false;
    }
  } else {
    console.info(`Firestore not configured. Serving mock ${collection} data.`);
  }
  res.set('x-data-source', 'mock');

  const payload =
    collection === 'matches'
      ? { matches: getMockMatches() }
      : { leagueTable: getMockLeagueTable() };

  res.status(200).json(payload);
};

const withFirestore = async (res, collectionName, handler, fallback) => {
  if (!firestoreAvailable) {
    return respondWithMockData(res, collectionName);
  }

  try {
    await handler();
  } catch (error) {
    fallback(error);
  }
};

const attendedMatchSchema = z.object({
  match: z.object({
    id: z
      .string({ required_error: 'match.id is required' })
      .trim()
      .min(1, 'match.id must be a non-empty string')
  })
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    services: {
      firestore: firestoreAvailable ? 'ok' : 'unavailable (serving mock data)'
    }
  });
});

app.get('/api/matches', async (req, res) => {
  await withFirestore(
    res,
    'matches',
    async () => {
      const snapshot = await db.collection('matches').get();
      const matches = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.set('x-data-source', 'firestore');
      res.json({ matches });
    },
    (error) => respondWithMockData(res, 'matches', error)
  );
});

app.get('/api/league-table', async (req, res) => {
  await withFirestore(
    res,
    'leagueTable',
    async () => {
      const snapshot = await db.collection('leagueTable').get();
      const leagueTable = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.set('x-data-source', 'firestore');
      res.json({ leagueTable });
    },
    (error) => respondWithMockData(res, 'leagueTable', error)
  );
});

app.get('/api/users/:userId/profile', async (req, res) => {
  if (!firestoreAvailable) {
    return res.status(503).json({ error: 'Firestore is not configured' });
  }

  const { userId } = req.params;

  try {
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
    console.error(`Error fetching profile for user ${userId}:`, error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

app.post('/api/users/:userId/attended-matches', async (req, res) => {
  if (!firestoreAvailable) {
    return res.status(503).json({ error: 'Firestore is not configured' });
  }

  const { userId } = req.params;
  const result = attendedMatchSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Invalid request body',
      details: result.error.issues.map((issue) => ({
        message: issue.message,
        path: issue.path
      }))
    });
  }

  const {
    match: { id: matchId }
  } = result.data;

  try {
    const userRef = db.collection('users').doc(userId);

    await userRef.set(
      {
        attendedMatches: admin.firestore.FieldValue.arrayUnion(matchId)
      },
      { merge: true }
    );

    res.status(200).json({ matchId });
  } catch (error) {
    console.error(`Error updating attended matches for user ${userId}:`, error);
    res.status(500).json({ error: 'Failed to update attended matches' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
