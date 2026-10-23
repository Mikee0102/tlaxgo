import { db } from '@/lib/firebase/config';
import { collection, doc, addDoc, getDocs, deleteDoc, query, where } from 'firebase/firestore';

export const itineraryService = {
  // Crear un nuevo itinerario
  async createItinerary(userId: string, itineraryData: any) {
    const itinerariesRef = collection(db, 'itineraries');
    return await addDoc(itinerariesRef, {
      userId,
      ...itineraryData,
      createdAt: new Date().toISOString()
    });
  },

  // Obtener itinerarios por usuario
  async getUserItineraries(userId: string) {
    const q = query(collection(db, 'itineraries'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Eliminar itinerario
  async deleteItinerary(itineraryId: string) {
    const docRef = doc(db, 'itineraries', itineraryId);
    return await deleteDoc(docRef);
  }
};