import dotenv from 'dotenv';
if(!process.env.K_SERVICE){
  dotenv.config({ path: '.env.local' });
} else{
  dotenv.config();
}

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
export const GOOGLE_PROJECT_ID = process.env.GOOGLE_PROJECT_ID || 'actinfy';