import { Unit } from '../types/learning';

export const units: Unit[] = [
  // Spanish Units
  {
    id: 'es-unit-1',
    languageCode: 'es',
    order: 1,
    title: 'Unit 1: Basic Greetings',
    description: 'Learn how to say hello, goodbye, and introduce yourself in Spanish.',
    lessons: ['es-lesson-1', 'es-lesson-2', 'es-lesson-3'],
  },
  {
    id: 'es-unit-2',
    languageCode: 'es',
    order: 2,
    title: 'Unit 2: Common Objects',
    description: 'Learn names of common objects and basic sentence structures.',
    lessons: ['es-lesson-1', 'es-lesson-2'], // Fixed dangling IDs
  },
  
  // French Units
  {
    id: 'fr-unit-1',
    languageCode: 'fr',
    order: 1,
    title: 'Unit 1: First Words',
    description: 'Start your French journey with basic greetings and phrases.',
    lessons: ['fr-lesson-1'], // Fixed dangling ID
  },
];
