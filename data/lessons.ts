import { Lesson } from '../types/learning';

export const lessons: Lesson[] = [
  // Spanish Lessons
  {
    id: 'es-lesson-1',
    unitId: 'es-unit-1',
    title: 'Hello & Goodbye',
    description: 'Learn the most common ways to greet people.',
    type: 'PRACTICE',
    xpReward: 10,
    goals: [
      { id: 'g1', description: 'Say hello in Spanish' },
      { id: 'g2', description: 'Say goodbye in Spanish' },
    ],
    vocabulary: [
      { id: 'v1', word: 'Hola', translation: 'Hello', pronunciation: 'OH-lah' },
      { id: 'v2', word: 'Adiós', translation: 'Goodbye', pronunciation: 'ah-DYOHS' },
    ],
    phrases: [
      { id: 'p1', text: '¿Cómo estás?', translation: 'How are you?', pronunciation: 'KOH-moh es-TAHS' },
    ],
    activities: [
      {
        id: 'a1',
        type: 'MULTIPLE_CHOICE',
        question: 'How do you say "Hello" in Spanish?',
        options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
        correctAnswer: 'Hola',
      },
      {
        id: 'a2',
        type: 'TRANSLATE',
        question: 'Translate "Adiós" to English',
        correctAnswer: 'Goodbye',
      },
    ],
  },
  {
    id: 'es-lesson-2',
    unitId: 'es-unit-1',
    title: 'AI Introduction',
    description: 'Meet your AI teacher and practice basic greetings.',
    type: 'VISION_AGENT',
    xpReward: 20,
    goals: [
      { id: 'g3', description: 'Practice speaking greetings' },
      { id: 'g4', description: 'Interact with an AI teacher' },
    ],
    vocabulary: [],
    phrases: [],
    activities: [
      {
        id: 'a3',
        type: 'VISION_AGENT_INTRO',
        question: 'Talk to Maria about your day.',
        correctAnswer: '', // N/A for vision agent intro
      },
    ],
    aiTeacherPrompt: {
      id: 'tp1',
      context: 'The user is a beginner learning Spanish. This is their first interaction.',
      objective: 'Help the user practice saying "Hola" and introducing themselves.',
      style: 'friendly',
      initialMessage: '¡Hola! I am Maria, your Spanish teacher. Can you say "Hola" to me?',
    },
  },
  {
    id: 'es-lesson-3',
    unitId: 'es-unit-1',
    title: 'Common Phrases',
    description: 'Learn polite phrases like please and thank you.',
    type: 'PRACTICE',
    xpReward: 15,
    goals: [
      { id: 'g5', description: 'Use polite expressions' },
    ],
    vocabulary: [
      { id: 'v3', word: 'Gracias', translation: 'Thank you' },
      { id: 'v4', word: 'Por favor', translation: 'Please' },
    ],
    phrases: [
      { id: 'p2', text: 'De nada', translation: 'You are welcome' },
    ],
    activities: [
      {
        id: 'a4',
        type: 'MATCHING',
        question: 'Match the words with their translations',
        options: ['Gracias', 'Por favor'],
        correctAnswer: 'Thank you, Please',
      },
    ],
  },

  // Spanish Unit 2 Lessons
  {
    id: 'es-lesson-4',
    unitId: 'es-unit-2',
    title: 'Common Objects 1',
    description: 'Learn names of everyday items.',
    type: 'PRACTICE',
    xpReward: 10,
    goals: [{ id: 'g6', description: 'Identify common objects' }],
    vocabulary: [
      { id: 'v5', word: 'La mesa', translation: 'Table' },
      { id: 'v6', word: 'La silla', translation: 'Chair' },
    ],
    phrases: [],
    activities: [],
  },
  {
    id: 'es-lesson-5',
    unitId: 'es-unit-2',
    title: 'Common Objects 2',
    description: 'Learn more names of everyday items.',
    type: 'PRACTICE',
    xpReward: 10,
    goals: [{ id: 'g7', description: 'Identify more common objects' }],
    vocabulary: [
      { id: 'v7', word: 'El libro', translation: 'Book' },
      { id: 'v8', word: 'El bolígrafo', translation: 'Pen' },
    ],
    phrases: [],
    activities: [],
  },

  // French Lessons
  {
    id: 'fr-lesson-1',
    unitId: 'fr-unit-1',
    title: 'Greetings',
    description: 'Learn how to say hello and welcome in French.',
    type: 'PRACTICE',
    xpReward: 10,
    goals: [
      { id: 'fg1', description: 'Say hello in French' },
    ],
    vocabulary: [
      { id: 'fv1', word: 'Bonjour', translation: 'Hello/Good morning', pronunciation: 'bon-ZHOOR' },
      { id: 'fv2', word: 'Bienvenue', translation: 'Welcome', pronunciation: 'byen-vuh-NEW' },
    ],
    phrases: [
      { id: 'fp1', text: 'Comment ça va ?', translation: 'How is it going?', pronunciation: 'koh-mon sah vah' },
    ],
    activities: [
      {
        id: 'fa1',
        type: 'MULTIPLE_CHOICE',
        question: 'What does "Bonjour" mean?',
        options: ['Goodbye', 'Hello', 'Please', 'Thank you'],
        correctAnswer: 'Hello',
      },
    ],
  },
];
