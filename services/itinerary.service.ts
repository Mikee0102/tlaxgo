import { db } from '@/lib/firebase/config';
import { collection, doc, addDoc, getDocs, deleteDoc, query, updateDoc } from 'firebase/firestore';
import { Itinerary } from '@/types/itinerary';

export const itineraryService = {
  // Método para crear itinerarios completos apuntando a la subcolección del usuario
  async createFullItinerary(userId: string, itineraryData: Omit<Itinerary, 'id' | 'createdAt'>) {
    const itinerariesRef = collection(db, 'users', userId, 'itinerarios');
    return await addDoc(itinerariesRef, {
      ...itineraryData,
      createdAt: new Date().toISOString()
    });
  },

  async createItinerary(userId: string, itineraryData: Omit<Itinerary, 'id' | 'createdAt'>) {
    const itinerariesRef = collection(db, 'users', userId, 'itinerarios');
    return await addDoc(itinerariesRef, {
      ...itineraryData,
      createdAt: new Date().toISOString()
    });
  },

  async updateFullItinerary(userId: string, itineraryId: string, itineraryData: Partial<Itinerary>) {
    const docRef = doc(db, 'users', userId, 'itinerarios', itineraryId);
    return await updateDoc(docRef, {
      ...itineraryData,
      updatedAt: new Date().toISOString()
    });
  },

  async getUserItineraries(userId: string): Promise<Itinerary[]> {
    const itinerariesRef = collection(db, 'users', userId, 'itinerarios');
    const snapshot = await getDocs(itinerariesRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Itinerary[];
  },

  async deleteItinerary(userId: string, itineraryId: string) {
    const docRef = doc(db, 'users', userId, 'itinerarios', itineraryId);
    return await deleteDoc(docRef);
  },

  async toggleFavorite(userId: string, itineraryId: string, currentStatus: boolean) {
    const docRef = doc(db, 'users', userId, 'itinerarios', itineraryId);
    return await updateDoc(docRef, {
      is_favorite: !currentStatus
    });
  }
};