import { db } from '@/lib/firebase/config';
import { collection, doc, addDoc, getDocs, deleteDoc, query, where, updateDoc } from 'firebase/firestore';
import { Itinerary } from '@/types/itinerary';

export const itineraryService = {
  // Método para crear itinerarios completos con días/actividades
  async createFullItinerary(userId: string, itineraryData: Omit<Itinerary, 'id' | 'createdAt'>) {
    const itinerariesRef = collection(db, 'itineraries');
    return await addDoc(itinerariesRef, {
      userId,
      ...itineraryData,
      createdAt: new Date().toISOString()
    });
  },

  async createItinerary(userId: string, itineraryData: Omit<Itinerary, 'id' | 'createdAt'>) {
    const itinerariesRef = collection(db, 'itineraries');
    return await addDoc(itinerariesRef, {
      userId,
      ...itineraryData,
      createdAt: new Date().toISOString()
    });
  },

  async updateFullItinerary(itineraryId: string, itineraryData: Partial<Itinerary>) {
    const docRef = doc(db, 'itineraries', itineraryId);
    return await updateDoc(docRef, {
      ...itineraryData,
      updatedAt: new Date().toISOString()
    });
  },

  async getUserItineraries(userId: string): Promise<Itinerary[]> {
    const q = query(collection(db, 'itineraries'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Itinerary[];
  },

  async deleteItinerary(itineraryId: string) {
    const docRef = doc(db, 'itineraries', itineraryId);
    return await deleteDoc(docRef);
  },

  async toggleFavorite(userId: string, itineraryId: string, currentStatus: boolean) {
    const docRef = doc(db, 'itineraries', itineraryId);
    return await updateDoc(docRef, {
      is_favorite: !currentStatus
    });
  }
};