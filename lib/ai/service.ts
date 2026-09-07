import { GoogleGenerativeAI } from '@google/generative-ai'

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
  if (!apiKey) {
    return null
  }
  return new GoogleGenerativeAI(apiKey)
}

export async function generateNotesFromContent(title: string, content: string): Promise<string> {
  const genAI = getGeminiClient()
  if (!genAI) {
    return generateMockNotes(title, content)
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' })
    const prompt = `You are an expert AI tutor for LearnSphere AI. Create comprehensive, structured study notes based on the following material.
Title: ${title}
Content: ${content}

Format the notes in Markdown with:
1. Topic Overview & Introduction
2. Important Concepts & Definitions
3. Key Points & Bullet Points
4. Real-world Examples
5. Exam-focused Points / Common Mistakes
6. Quick Revision Summary`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text() || generateMockNotes(title, content)
  } catch (error) {
    console.error('Gemini AI Notes Generation Error:', error)
    return generateMockNotes(title, content)
  }
}

export async function generateQuizFromContent(title: string, content: string, seed: number = Date.now()): Promise<any[]> {
  const genAI = getGeminiClient()
  if (!genAI) {
    return generateExpandedMockQuiz(title)
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' })
    const prompt = `You are an expert quiz generator for LearnSphere AI. Generate AT LEAST 30 unique multiple choice questions (MCQs) based on the material below. Ensure there are no duplicate questions. Use variation seed ${seed} for completely fresh questions.
Title: ${title}
Content: ${content}

Return ONLY a valid JSON array of objects with this exact structure (no markdown code blocks, just raw JSON):
[
  {
    "questionText": "Question here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A",
    "explanation": "Why this is correct...",
    "concept": "Core concept tag"
  }
]`

    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text()
    
    text = text.replace(/```json/g, '').replace(/```/g, '').trim()

    const parsed = JSON.parse(text)
    const questions = Array.isArray(parsed) ? parsed : (parsed.questions || generateExpandedMockQuiz(title))
    
    // Ensure at least 30 questions
    if (questions.length < 30) {
      const extra = generateExpandedMockQuiz(title)
      while (questions.length < 30) {
        questions.push(...extra)
      }
    }
    return questions.slice(0, 35)
  } catch (error) {
    console.error('Gemini AI Quiz Generation Error:', error)
    return generateExpandedMockQuiz(title)
  }
}

export async function generateFlashcardsFromContent(title: string, content: string): Promise<any[]> {
  const genAI = getGeminiClient()
  if (!genAI) {
    return generateMockFlashcards(title)
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' })
    const prompt = `Generate 8-12 flashcards based on this material:
Title: ${title}
Content: ${content}

Return ONLY a valid JSON array of objects with this exact structure (no markdown code blocks, just raw JSON):
[
  {
    "front": "Concept or Question",
    "back": "Clear definition or answer"
  }
]`

    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text()
    text = text.replace(/```json/g, '').replace(/```/g, '').trim()

    const parsed = JSON.parse(text)
    return Array.isArray(parsed) ? parsed : (parsed.flashcards || generateMockFlashcards(title))
  } catch (error) {
    console.error('Gemini AI Flashcard Generation Error:', error)
    return generateMockFlashcards(title)
  }
}

export async function askAITutor(question: string, contextContent: string): Promise<string> {
  const genAI = getGeminiClient()
  if (!genAI) {
    return `As your LearnSphere AI Tutor, I'm here to help! Regarding your question "${question}": Based on your uploaded materials, this topic emphasizes core principles, practical understanding, and clear revision.`
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' })
    const prompt = `You are LearnSphere AI, a friendly, encouraging personal AI study companion and tutor. Help the student with their question based on the study context provided.

Study Context:
${contextContent.substring(0, 4000)}

Student Question:
${question}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text() || 'I am here to help you learn! Could you rephrase your question?'
  } catch (error) {
    console.error('Gemini AI Tutor Error:', error)
    return 'I encountered an error connecting to the Gemini AI tutor service. Please try again shortly!'
  }
}

function generateMockNotes(title: string, content: string): string {
  return `# 📚 Study Notes: ${title}

## 1. Topic Overview & Introduction
Welcome to your AI-generated notes for **${title}**. These notes break down the core concepts from your material into digestible, structured learning segments.

## 2. Important Concepts & Definitions
- **Core Principle:** The foundational idea behind ${title} focuses on structured understanding and practical application.
- **Key Terminology:** Essential concepts identified in your uploaded material are indexed for fast recall.

## 3. Key Points & Bullet Points
- Comprehensive coverage of fundamental rules and mechanics.
- Step-by-step logical progression from beginner to advanced understanding.

## 4. Real-world Examples & Applications
- Applied scenarios illustrating how theoretical knowledge translates into practical problem-solving.

## 5. Critical Exam Points
- **Watch out for:** Misinterpreting core definitions or skipping foundational steps.
- **Exam Tip:** Always verify your assumptions and structure your answers logically.

## 6. Quick Revision Summary
1. Understand core definitions thoroughly.
2. Practice active recall using LearnSphere Flashcards.
3. Test your knowledge with the auto-generated 30+ MCQ Quiz.`
}

function generateExpandedMockQuiz(title: string): any[] {
  const base = [
    { q: `What is the core objective of ${title}?`, a: 'Practical mastery and conceptual understanding' },
    { q: `Which strategy is best for studying ${title}?`, a: 'Active recall and spaced repetition' },
    { q: `Why review incorrect answers in ${title}?`, a: 'To eliminate knowledge gaps and prevent future errors' },
    { q: `How does LearnSphere AI assist with ${title}?`, a: 'By generating structured notes, flashcards, and quizzes' },
    { q: `What level of difficulty is standard for this topic?`, a: 'Intermediate to Advanced adaptive levels' }
  ]

  const list = []
  for (let i = 1; i <= 35; i++) {
    const item = base[(i - 1) % base.length]
    list.push({
      questionText: `[Q${i}] ${item.q} (Ref #${i * 7})`,
      options: [item.a, 'Incorrect Distractor A', 'Incorrect Distractor B', 'Incorrect Distractor C'],
      correctAnswer: item.a,
      explanation: `Detailed AI explanation for question ${i} regarding ${title}.`,
      concept: `Concept Domain ${i}`
    })
  }
  return list
}

function generateMockFlashcards(title: string): any[] {
  return [
    { front: `What is ${title}?`, back: 'An AI-powered learning topic.' },
    { front: 'What is Active Recall?', back: 'A study method stimulating memory.' },
    { front: 'How does LearnSphere AI help?', back: 'By generating notes, quizzes, and flashcards automatically.' },
    { front: 'Why do 30+ MCQs matter?', back: 'They ensure complete coverage of the syllabus.' },
    { front: 'What is Spaced Repetition?', back: 'Reviewing material at increasing intervals.' }
  ]
}
