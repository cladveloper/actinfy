import * as admin from 'firebase-admin';
import { GOOGLE_PROJECT_ID } from './env';

admin.initializeApp({
  projectId: GOOGLE_PROJECT_ID
});

export const db = admin.firestore();
export const auth = admin.auth();