<div align="center">

# 🎓🤖 LearnSphere AI

### **The AI-Powered Personalized Learning Platform**

*Transform your study materials, notes, and chapters into comprehensive notes, 30+ MCQ quizzes, flashcards, and instant AI tutoring.*

[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

</div>

---

## 🚀 Project Vision

**LearnSphere AI** is designed to act as a **personal AI study companion** rather than a generic chatbot. The platform guides students through an intelligent learning loop:

```text
Upload Material ➔ AI Notes ➔ 30+ MCQs ➔ Quiz Solving ➔ Auto Evaluation ➔ Mistake Review & Revision
```

---

## ✨ Core Features

1. **🔐 Secure Authentication & Account Management**: Built with NextAuth.js, secure credentials hashing, **Forgot Password** recovery, and secure **Account Deletion** with confirmation modals.
2. **📤 Smart Material Upload**: Paste or upload chapters/notes for instant AI processing.
3. **📝 Automatic AI Revision Notes**: Structured Markdown study guides with key concepts, definitions, and exam tips.
4. **📥 PDF / Print Export**: One-click download and print support for all generated notes.
5. **❓ 30+ MCQ Quizzes & Fresh Retakes**: Comprehensive self-evaluation quizzes generated automatically with a **"Generate New Questions"** option on retake.
6. **📊 Detailed Wrong Answer Review**: Question-by-question breakdown showing student answers, correct answers, and tailored AI explanations.
7. **🃏 Interactive AI Flashcards Library**: Digital flip-cards organized in topic decks for active recall.
8. **🤖 Context-Aware AI Tutor**: Ask questions and receive simplified explanations based on your active study session.
9. **🌟 Immersive 3D Landing Page**: Built with Three.js and Framer Motion for a modern educational SaaS experience.
10. **📱 Fully Responsive Design**: Optimized layouts across desktop, tablet, and mobile devices with collapsible navigation and scrollable feeds.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Lucide React, Three.js, Canvas Confetti
- **Backend**: Next.js Server Actions & Route Handlers
- **Database**: Neon PostgreSQL via Prisma ORM
- **Authentication**: NextAuth.js & bcryptjs
- **AI Engine**: Google Gemini API (`gemini-3.5-flash-lite`)

---

## 📁 Project Structure

```text
learnsphere-ai/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── forgot-password/
│   │   └── signout/
│   ├── dashboard/
│   │   ├── notes/
│   │   ├── flashcards/
│   │   ├── tutor/
│   │   └── upload/
│   ├── learn/[topic]/
│   ├── quiz/[id]/
│   └── api/
├── components/
│   ├── dashboard/ (MobileNav, UploadForm, DeleteAccountButton)
│   ├── flashcards/
│   ├── notes/ (DownloadPDFButton)
│   ├── quiz/ (QuizClient, QuizReviewClient)
│   ├── shared/ (Three.js 3D Background)
│   └── tutor/
├── lib/
│   ├── ai/service.ts (Gemini AI Integration)
│   ├── auth.ts
│   └── prisma.ts
├── prisma/
│   └── schema.prisma
└── README.md
```

---

## ⚙️ Getting Started Locally

### 1. Clone the Repository & Install Dependencies
```bash
git clone https://github.com/your-username/learnsphere-ai.git
cd learnsphere-ai
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@your-neon-db-url:5432/learnsphere?schema=public"
NEXTAUTH_SECRET="your_nextauth_secret_key"
NEXTAUTH_URL="http://localhost:3000"
GEMINI_API_KEY="your_google_gemini_api_key"
```

### 3. Setup Database
```bash
npx prisma db push
npx prisma generate
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
"# learnsphereai-student-learning-platform-" 
"# learnsphereai-student-learning-platform-" 
"# learnsphere_ai" 
"# learnsphere-ai" 
