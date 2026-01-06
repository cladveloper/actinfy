import { db } from './../config/firebase';
import { firestore } from 'firebase-admin';

export class AnalysisService{
    private collection = db.collection('analysis');

    async create(data: any): Promise<{
      id: string; createdAt: Date; updatedAt: Date;
    }> {
        const docRef = this.collection.doc();
        const now = firestore.Timestamp.now();

        const newAnalysis = {
            ...data,
            id: docRef.id,
            createdAt: now,
            updatedAt: now,
        };

        await docRef.set(newAnalysis);
        return {
            id: newAnalysis.id,
            createdAt: now.toDate(),
            updatedAt: now.toDate(),
        };
    }

  async getById(id: string): Promise<any | null> {
    const doc = await this.collection.doc(id).get();
    
    if (!doc.exists) return null;
    
    const data = doc.data()!;
    return {
      id: doc.id,
      ...data,
      createdAt: (data.createdAt as firestore.Timestamp)?.toDate(),
      updatedAt: (data.updatedAt as firestore.Timestamp)?.toDate(),
      expiresAt: (data.expiresAt as firestore.Timestamp)?.toDate(),
    };
  }

}