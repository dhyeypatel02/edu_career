import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI with recommended server-side settings
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const COUNSELLOR_SYSTEM_INSTRUCTION = `
You are "Margdarshak AI" (मार्गदर्शक), a highly knowledgeable, empathetic, and authoritative Indian Career & Education Counsellor.
You have exhaustive knowledge of the Indian Education System, governed by:
- Ministry of Education (MoE), Government of India & NEP 2020 guidelines
- Central Board of Secondary Education (CBSE), ICSE/ISC, State Boards, NIOS (National Institute of Open Schooling)
- University Grants Commission (UGC) & All India Council for Technical Education (AICTE)
- National Medical Commission (NMC) & Dental Council of India (DCI)
- Bar Council of India (BCI), Council of Architecture (CoA), Directorate General of Shipping (DGS), DGCA (Aviation)
- Institute of Chartered Accountants of India (ICAI), ICSI, ICMAI
- National Testing Agency (NTA), UPSC, SSC, Banking (IBPS/SBI), Defence (NDA/CDS/AFCAT)

YOUR PRINCIPLES & GUIDELINES:
1. Ground every answer in official Indian eligibility rules.
   - For example:
     - MBBS/BDS/BAMS requires NEET-UG. Under recent NMC regulations, students who passed 10+2 with PCM and subsequently passed Biology/Biotechnology as an additional subject from a recognized board (including NIOS) are eligible for NEET-UG.
     - Engineering (B.Tech/B.E.) requires Physics, Mathematics, and one optional technical subject (Chemistry/CS/Biotech etc.) at 10+2.
     - Architecture (B.Arch) requires PCM with at least 50% aggregate in PCM and passing NATA or JEE Main Paper 2 (CoA regulations).
     - Commercial Pilot License (CPL) under DGCA requires 10+2 with Physics and Mathematics (or equivalent through NIOS).
     - NDA Army wing accepts any 12th stream; Air Force & Navy wings strictly require Physics & Mathematics.
     - CA Foundation is open to 10+2 students of ANY stream (Science, Commerce, Arts).
     - 5-year Integrated Law (BA LLB / BBA LLB) via CLAT/AILET is open to ANY 10+2 stream.
     - UPSC Civil Services Examination requires ANY recognized Bachelor's degree (any discipline).
2. Bridge Courses & Alternative Pathways:
   - If a student wants a career not directly permitted by their current pathway, ALWAYS explain clearly WHY, and immediately offer the legitimate solution (e.g., taking an additional subject via NIOS On-Demand exam, Lateral Entry into 2nd year B.Tech after a 3-year Polytechnic diploma, BCA -> MCA as an alternative to B.Tech CS, etc.).
3. Context-Awareness:
   - Always refer to the student's currently selected step, stream, subjects, degree, or target career.
   - Give concise, clear, structured responses with headings or bullet points. Avoid vague filler.
4. Tone:
   - Professional, supportive, realistic, and motivating. Keep the language crisp, easy to read, with exact names of exams, degrees, and government bodies.
`;

// AI Career Counsellor Chat Endpoint
app.post('/api/counsellor/chat', async (req: Request, res: Response) => {
  try {
    const { message, context, chatHistory } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({
        error: 'Gemini API key is not configured. Please add GEMINI_API_KEY to your environment variables in AI Studio.',
      });
      return;
    }

    // Build context string from student's current state
    const studentContextStr = context
      ? `
STUDENT'S CURRENT SELECTION CONTEXT:
- Current Stage: ${context.currentStep || 'Not specified'}
- Chosen Class 10 Stream: ${context.selectedStreamTitle || 'None selected yet'} (${context.selectedStreamId || ''})
- Chosen Class 11-12 Track: ${context.selectedTrackTitle || 'None selected yet'}
- Chosen Subjects/Electives: ${context.selectedSubjects?.join(', ') || 'Not specified'}
- Chosen Degree / Course: ${context.selectedDegreeTitle || 'None selected yet'}
- Target Career: ${context.selectedCareerTitle || 'None selected yet'}
`
      : 'No previous selections recorded. Student is inquiring from the beginning.';

    // Construct conversation prompt
    let conversationContext = '';
    if (Array.isArray(chatHistory) && chatHistory.length > 0) {
      conversationContext = '\nPREVIOUS CONVERSATION:\n' +
        chatHistory
          .slice(-6)
          .map((m: { role: string; content: string }) => `${m.role === 'user' ? 'Student' : 'Margdarshak AI'}: ${m.content}`)
          .join('\n') + '\n';
    }

    const fullPrompt = `${studentContextStr}
${conversationContext}
Student's Question: "${message}"

Please provide a structured, practical, and accurate response as Margdarshak AI. Address the student's question directly, taking their current pathway into account. Include relevant exams, eligibility criteria, institutional advice, and alternative options if needed.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: COUNSELLOR_SYSTEM_INSTRUCTION,
        temperature: 0.6,
      },
    });

    const replyText = response.text || 'Unable to generate response at this moment. Please try again.';

    res.json({
      reply: replyText,
    });
  } catch (error: any) {
    console.error('Error in /api/counsellor/chat:', error);
    res.status(500).json({
      error: error.message || 'An error occurred while consulting the AI counsellor.',
    });
  }
});

// Quick Career Pathway Feasibility & Strategic SWOT Check
app.post('/api/counsellor/feasibility-check', async (req: Request, res: Response) => {
  try {
    const { stream, track, targetCareer, targetCourse } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({ error: 'Gemini API key is not configured.' });
      return;
    }

    const prompt = `Analyze feasibility for an Indian student:
- Selected Stream after 10th: ${stream}
- 11th-12th Track: ${track}
- Target Undergraduate Course: ${targetCourse || 'Undecided'}
- Target Career Goal: ${targetCareer || 'Undecided'}

Provide a concise JSON response with:
1. "isDirectlyEligible": boolean
2. "eligibilityReasoning": 1-2 sentence explanation
3. "keyEntranceExams": list of strings (e.g. ["JEE Main", "CUET-UG"])
4. "required12thSubjects": list of strings
5. "alternativeRoutes": list of strings if directly ineligible or for backup
6. "strategicTips": 2-3 bullet tips for succeeding in this pathway`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: COUNSELLOR_SYSTEM_INSTRUCTION + '\nOutput must be strictly valid JSON matching the schema requested.',
        responseMimeType: 'application/json',
      },
    });

    res.json({
      analysis: JSON.parse(response.text || '{}'),
    });
  } catch (error: any) {
    console.error('Error in /api/counsellor/feasibility-check:', error);
    res.status(500).json({
      error: error.message || 'Could not analyze feasibility.',
    });
  }
});

// Setup Vite middleware in development or serve static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Margdarshak Career Guidance Server running on http://localhost:${PORT}`);
  });
}

startServer();
