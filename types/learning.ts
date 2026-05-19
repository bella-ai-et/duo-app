export type LanguageCode = 'es' | 'fr' | 'it' | 'de' | 'ja' | 'ko' | 'zh';

export type ImageSource = string | { uri: string } | number;

export interface Language {
  id: string;
  code: LanguageCode;
  name: string;
  flag: string;
}

export interface Vocabulary {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
  image?: ImageSource;
}

export interface Phrase {
  id: string;
  text: string;
  translation: string;
  pronunciation?: string;
}

export type ActivityType = 
  | 'MULTIPLE_CHOICE' 
  | 'TRANSLATE' 
  | 'MATCHING' 
  | 'AUDIO_LISTENING' 
  | 'SPEAKING'
  | 'VISION_AGENT_INTRO';

export interface Activity {
  id: string;
  type: ActivityType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  audioUrl?: string;
  imageUrl?: ImageSource;
}

export interface LessonGoal {
  id: string;
  description: string;
}

export interface AITeacherPrompt {
  id: string;
  context: string;
  objective: string;
  style: 'friendly' | 'strict' | 'encouraging';
  initialMessage: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  type: 'PRACTICE' | 'THEORY' | 'VISION_AGENT';
  activities: Activity[];
  vocabulary: Vocabulary[];
  phrases: Phrase[];
  goals: LessonGoal[];
  aiTeacherPrompt?: AITeacherPrompt;
  xpReward: number;
}

export interface Unit {
  id: string;
  languageCode: LanguageCode;
  order: number;
  title: string;
  description: string;
  lessons: string[]; // Lesson IDs
}
