/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

import { UNIVERSITIES } from './src/data';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gen AI Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Paths for persistence
const CUSTOM_UNIS_FILE = path.join(process.cwd(), 'custom_universities.json');
const UNIVERSITIES_FILE = path.join(process.cwd(), 'universities.json');
const PENDING_REQUESTS_FILE = path.join(process.cwd(), 'pending_requests.json');

// Ensure files exist on startup
if (!fs.existsSync(CUSTOM_UNIS_FILE)) {
  fs.writeFileSync(CUSTOM_UNIS_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(PENDING_REQUESTS_FILE)) {
  fs.writeFileSync(PENDING_REQUESTS_FILE, JSON.stringify([], null, 2));
}

// Helpers to read/write JSON files
function getCustomUniversities(): any[] {
  try {
    const data = fs.readFileSync(CUSTOM_UNIS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveCustomUniversities(unis: any[]) {
  fs.writeFileSync(CUSTOM_UNIS_FILE, JSON.stringify(unis, null, 2));
}

// Ensure master universities.json is seeded with baseline + custom approved
if (!fs.existsSync(UNIVERSITIES_FILE)) {
  const customList = getCustomUniversities();
  const mergedList = [...UNIVERSITIES];
  for (const item of customList) {
    if (!mergedList.some(u => u.id === item.id)) {
      mergedList.push(item);
    }
  }
  fs.writeFileSync(UNIVERSITIES_FILE, JSON.stringify(mergedList, null, 2));
}

function getAllUniversities(): any[] {
  try {
    const data = fs.readFileSync(UNIVERSITIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return UNIVERSITIES;
  }
}

function saveAllUniversities(unis: any[]) {
  fs.writeFileSync(UNIVERSITIES_FILE, JSON.stringify(unis, null, 2));
}

function getPendingRequests(): any[] {
  try {
    const data = fs.readFileSync(PENDING_REQUESTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function savePendingRequests(reqs: any[]) {
  fs.writeFileSync(PENDING_REQUESTS_FILE, JSON.stringify(reqs, null, 2));
}

// Ensure unique ID generation
function generateId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/* ========================================================================== */
/*                               API ENDPOINTS                                */
/* ========================================================================== */

// Admin authentication middleware
function checkAdminAuth(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer neoadmin-token') {
    return res.status(401).json({ error: 'Unauthorized: invalid admin credentials' });
  }
  next();
}

// Get all universities from the master database (baseline + custom approved)
app.get('/api/universities', (req, res) => {
  const unis = getAllUniversities();
  res.json({ custom: unis, universities: unis });
});

interface DeviceBan {
  attempts: number;
  tempBanUntil: number | null;
  permBanned: boolean;
}

const bans: Record<string, DeviceBan> = {};

function getDeviceBanStatus(id: string): DeviceBan {
  if (!bans[id]) {
    bans[id] = { attempts: 0, tempBanUntil: null, permBanned: false };
  }
  const ban = bans[id];
  if (ban.tempBanUntil && Date.now() > ban.tempBanUntil) {
    ban.tempBanUntil = null;
  }
  return ban;
}

// Device security status check
app.post('/api/admin/device-status', (req, res) => {
  const { clientId } = req.body;
  const ip = req.ip || 'unknown-ip';
  const deviceKey = clientId || ip;
  const ban = getDeviceBanStatus(deviceKey);
  res.json({
    permBanned: ban.permBanned,
    tempBanUntil: ban.tempBanUntil
  });
});

// Admin login endpoint with strict Multi-tier Failed Attempt Security Control
app.post('/api/admin/login', (req, res) => {
  const { username, password, clientId } = req.body;
  const ip = req.ip || 'unknown-ip';
  const deviceKey = clientId || ip;

  const ban = getDeviceBanStatus(deviceKey);

  if (ban.permBanned) {
    return res.status(403).json({
      error: 'Access Denied: This device is permanently banned from the admin portal.',
      permBanned: true
    });
  }

  if (ban.tempBanUntil) {
    const minutesLeft = Math.ceil((ban.tempBanUntil - Date.now()) / 60000);
    return res.status(403).json({
      error: `Too many failed login attempts. Banned for 5 minutes. Try again in ${minutesLeft} minute(s).`,
      tempBanUntil: ban.tempBanUntil
    });
  }

  if (username === 'neo' && password === 'neoadmin') {
    // Reset failed attempts on success callback
    ban.attempts = 0;
    ban.tempBanUntil = null;
    return res.json({ success: true, token: 'neoadmin-token' });
  }

  // Record failed attempt
  ban.attempts += 1;

  if (ban.attempts >= 4) {
    ban.permBanned = true;
    return res.status(403).json({
      error: 'Access Denied: Exceeded login limit. This device is permanently banned.',
      permBanned: true
    });
  } else if (ban.attempts === 2) {
    const FIVE_MINUTES_MS = 5 * 60 * 1000;
    ban.tempBanUntil = Date.now() + FIVE_MINUTES_MS;
    return res.status(403).json({
      error: 'Too many invalid logins. You are suspended for 5 minutes.',
      tempBanUntil: ban.tempBanUntil
    });
  }

  const remaining = 2 - (ban.attempts % 2);
  return res.status(401).json({
    error: `Invalid username or password. You have ${remaining} try/tries remaining before temporary ban.`,
    attempts: ban.attempts
  });
});

// Create new university manually (Admin Action)
app.post('/api/admin/universities', checkAdminAuth, (req, res) => {
  const {
    name, country, city, acceptanceRate, ieltsRequirement, satRequirement,
    gpaRequirement, tuition, financialAid, uzbekDiplomaStatus,
    foundationRequired, website, description, popularMajors, tips,
    qsRanking, theRanking, category, applicationSteps
  } = req.body;

  if (!name || !country || !city || !website) {
    return res.status(400).json({ error: 'Name, Country, City, and Website are required.' });
  }

  const id = generateId(name) + '-' + Math.floor(Math.random() * 1000);
  const universities = getAllUniversities();

  const newUni = {
    id,
    name,
    country,
    city,
    acceptanceRate: acceptanceRate || 'N/A',
    ieltsRequirement: Number(ieltsRequirement) || 5.5,
    satRequirement: satRequirement ? Number(satRequirement) : null,
    gpaRequirement: Number(gpaRequirement) || 2.5,
    tuition: tuition || 'N/A',
    financialAid: financialAid || 'N/A',
    uzbekDiplomaStatus: uzbekDiplomaStatus || 'Conditional',
    foundationRequired: !!foundationRequired,
    website: website.startsWith('http') ? website : `https://${website}`,
    description: description || '',
    popularMajors: Array.isArray(popularMajors) ? popularMajors : [],
    tips: Array.isArray(tips) ? tips : [],
    applicationSteps: Array.isArray(applicationSteps) ? applicationSteps : undefined,
    qsRanking: Number(qsRanking) || 999,
    theRanking: Number(theRanking) || 999,
    category: category || 'ivy_elite'
  };

  universities.push(newUni);
  saveAllUniversities(universities);

  res.json({ success: true, university: newUni });
});

// Update an existing university (Admin Action)
app.put('/api/admin/universities/:id', checkAdminAuth, (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const universities = getAllUniversities();
  const index = universities.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'University not found' });
  }

  const updatedUni = {
    ...universities[index],
    ...updatedData,
    id // id must remain invariant
  };

  // Coerce types to be robust
  updatedUni.ieltsRequirement = Number(updatedUni.ieltsRequirement) || 5.5;
  updatedUni.satRequirement = updatedUni.satRequirement ? Number(updatedUni.satRequirement) : null;
  updatedUni.gpaRequirement = Number(updatedUni.gpaRequirement) || 2.5;
  updatedUni.qsRanking = Number(updatedUni.qsRanking) || 999;
  updatedUni.theRanking = Number(updatedUni.theRanking) || 999;

  universities[index] = updatedUni;
  saveAllUniversities(universities);

  res.json({ success: true, university: updatedUni });
});

// Delete any university (Admin Action)
app.delete('/api/admin/universities/:id', checkAdminAuth, (req, res) => {
  const { id } = req.params;

  const universities = getAllUniversities();
  const filtered = universities.filter(u => u.id !== id);

  if (universities.length === filtered.length) {
    return res.status(404).json({ error: 'University not found' });
  }

  saveAllUniversities(filtered);
  res.json({ success: true, deletedId: id });
});

// Get pending search requests for administrator validation
app.get('/api/admin/pending', checkAdminAuth, (req, res) => {
  const pending = getPendingRequests().filter(r => r.status === 'pending');
  res.json(pending);
});

// Admin approves a request, adding it to the master list
app.post('/api/admin/approve', checkAdminAuth, (req, res) => {
  const { requestId } = req.body;
  if (!requestId) {
    return res.status(400).json({ error: 'Request ID is required' });
  }

  const reqs = getPendingRequests();
  const requestIndex = reqs.findIndex(r => r.id === requestId);

  if (requestIndex === -1) {
    return res.status(404).json({ error: 'Request not found' });
  }

  const request = reqs[requestIndex];
  if (request.status !== 'pending') {
    return res.status(400).json({ error: `Request already has status: ${request.status}` });
  }

  // Update request status
  request.status = 'approved';
  savePendingRequests(reqs);

  // Add to master universities database
  const unis = getAllUniversities();
  const existsIndex = unis.findIndex(u => u.id === request.university.id);
  if (existsIndex === -1) {
    unis.push(request.university);
  } else {
    unis[existsIndex] = request.university;
  }
  saveAllUniversities(unis);

  res.json({ success: true, university: request.university });
});

// Admin declines a request
app.post('/api/admin/decline', checkAdminAuth, (req, res) => {
  const { requestId } = req.body;
  if (!requestId) {
    return res.status(400).json({ error: 'Request ID is required' });
  }

  const reqs = getPendingRequests();
  const requestIndex = reqs.findIndex(r => r.id === requestId);

  if (requestIndex === -1) {
    return res.status(404).json({ error: 'Request not found' });
  }

  reqs[requestIndex].status = 'declined';
  savePendingRequests(reqs);

  res.json({ success: true, requestId });
});

// AI Search for a university and automatically send to admin queue
app.post('/api/ai-search-university', async (req, res) => {
  const { query } = req.body;
  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY environment variable is not defined.'
    });
  }

  try {
    const systemPrompt = `You are a professional educational consultant researching admissions requirements for Uzbek students.
Search the web or use your extensive knowledge base to verify details for the requested search query: "${query}".

CRITICAL RULE:
1. Determine if the search query refers to an actual, real, accredited higher education university anywhere in the world.
2. If it does NOT exist, or is just a school, company, field of study, fictive name or not a real university, set "isRealInstitution" = false.
3. If it IS a real university, search its details and return "isRealInstitution" = true.
4. For "satRequirement", if test optional or not needed, return 0.
5. Provide a description explaining key opportunities for Uzbek students, and three useful tips.
6. Categorize it appropriately into one of: 'ivy_elite', 'stem_tech', 'business_finance', 'europe_low_tuition', 'asian_top', 'local_joint'`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Search and evaluate details for: "${query}"`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isRealInstitution: {
              type: Type.BOOLEAN,
              description: 'Whether this query represents a real, verified, active higher education university/institution.'
            },
            name: { type: Type.STRING, description: 'Official English name of the University.' },
            country: { type: Type.STRING, description: 'Country where it is located.' },
            city: { type: Type.STRING, description: 'City where it is located.' },
            acceptanceRate: { type: Type.STRING, description: 'Estimated acceptance rate percentage, e.g. "25%" or "N/A"' },
            ieltsRequirement: { type: Type.NUMBER, description: 'Minimum overall IELTS score required (e.g. 6.0, 5.5). Default to 5.5 if unknown.' },
            satRequirement: { type: Type.NUMBER, description: 'SAT requirement or 0 if not required/test-optional.' },
            gpaRequirement: { type: Type.NUMBER, description: 'Minimum GPA required on a 4.0 scale (e.g. 3.0, 2.5). Default to 2.5.' },
            tuition: { type: Type.STRING, description: 'Annual tuition fee in USD/Euros or UZS, e.g. "$12,000 / year" or "Free".' },
            financialAid: { type: Type.STRING, description: 'Are there merit/need scholarships for Uzbek/intl applicants? Short explanation.' },
            uzbekDiplomaStatus: {
              type: Type.STRING,
              description: "Acceptability status of 11-year Uzbek secondary diploma. Must return exactly 'Accepted', 'Conditional', or 'Not accepted'."
            },
            foundationRequired: { type: Type.BOOLEAN, description: 'True if Uzbek students need a foundation year before direct entry.' },
            website: { type: Type.STRING, description: 'Complete official website URL (must start with https://).' },
            description: { type: Type.STRING, description: 'Brief 2-3 sentence overview of the university, its reputation and strengths.' },
            popularMajors: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 to 5 popular undergraduate majors taught in English.'
            },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 specific, helpful insider application tips targeted at Uzbek students.'
            },
            qsRanking: { type: Type.INTEGER, description: 'Estimated QS World Ranking (use 0 if unranked or unknown).' },
            theRanking: { type: Type.INTEGER, description: 'Estimated Times Higher Education Ranking (use 0 if unranked or unknown).' },
            category: {
              type: Type.STRING,
              description: "Most suitable category: 'ivy_elite', 'stem_tech', 'business_finance', 'europe_low_tuition', 'asian_top', 'local_joint'"
            }
          },
          required: [
            'isRealInstitution', 'name', 'country', 'city', 'acceptanceRate',
            'ieltsRequirement', 'satRequirement', 'gpaRequirement', 'tuition',
            'financialAid', 'uzbekDiplomaStatus', 'foundationRequired', 'website',
            'description', 'popularMajors', 'tips', 'qsRanking', 'theRanking', 'category'
          ]
        }
      }
    });

    const resultText = response.text || '{}';
    const parsedData = JSON.parse(resultText);

    if (parsedData.isRealInstitution === false) {
      return res.json({
        isReal: false,
        message: 'N/A — Not a real higher education institution or invalid search.'
      });
    }

    // Format structure to strictly match types
    const uniId = generateId(parsedData.name);
    const universityObject = {
      id: uniId,
      name: parsedData.name,
      country: parsedData.country,
      city: parsedData.city,
      acceptanceRate: parsedData.acceptanceRate || 'N/A',
      ieltsRequirement: Number(parsedData.ieltsRequirement) || 5.5,
      satRequirement: parsedData.satRequirement > 0 ? Number(parsedData.satRequirement) : null,
      gpaRequirement: Number(parsedData.gpaRequirement) || 2.5,
      tuition: parsedData.tuition || 'N/A',
      financialAid: parsedData.financialAid || 'N/A',
      uzbekDiplomaStatus: ['Accepted', 'Conditional', 'Not accepted'].includes(parsedData.uzbekDiplomaStatus)
        ? parsedData.uzbekDiplomaStatus
        : 'Conditional',
      foundationRequired: !!parsedData.foundationRequired,
      website: parsedData.website && parsedData.website.startsWith('http') ? parsedData.website : `https://${parsedData.website || 'google.com'}`,
      description: parsedData.description || '',
      popularMajors: Array.isArray(parsedData.popularMajors) ? parsedData.popularMajors : [],
      tips: Array.isArray(parsedData.tips) ? parsedData.tips : [],
      qsRanking: Number(parsedData.qsRanking) || 0,
      theRanking: Number(parsedData.theRanking) || 0,
      category: ['ivy_elite', 'stem_tech', 'business_finance', 'europe_low_tuition', 'asian_top', 'local_joint'].includes(parsedData.category)
        ? parsedData.category
        : 'ivy_elite'
    };

    // Save search request to Administrator pending queue automatically!
    const pendingRequests = getPendingRequests();
    
    // Check if this university was already added to pending or platform
    const customUnis = getCustomUniversities();
    const alreadyExists = customUnis.some(u => u.name.toLowerCase() === parsedData.name.toLowerCase()) || 
                          pendingRequests.some(r => r.status === 'pending' && r.university.name.toLowerCase() === parsedData.name.toLowerCase());

    const newRequest = {
      id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      query: query,
      university: universityObject,
      status: 'pending',
      requestDate: new Date().toISOString()
    };

    if (!alreadyExists) {
      pendingRequests.push(newRequest);
      savePendingRequests(pendingRequests);
    }

    // Return search findings to the client immediately
    return res.json({
      isReal: true,
      university: universityObject,
      alreadyInSystem: alreadyExists
    });

  } catch (err: any) {
    console.error('Error in AI university search:', err);
    return res.status(500).json({ error: 'Failed to query AI research engine: ' + err.message });
  }
});

/* ========================================================================== */
/*                           VITE MIDDLEWARE / STATIC FILES                   */
/* ========================================================================== */

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Serve index.html for all frontend-routed URLs
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[UniPath Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
