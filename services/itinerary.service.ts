import { db } from '@/lib/firebase/config';
import { collection, doc, addDoc, getDocs, deleteDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Itinerary } from '@/types/itinerary';

const itinerariesCollection = collection(db, 'itineraries');

export const itineraryService = {
  async createFullItinerary(userId: string, itineraryData: Omit<Itinerary, 'id' | 'createdAt'>) {
    return await addDoc(itinerariesCollection, {
      ...itineraryData,
      userId,
      createdAt: new Date().toISOString()
    });
  },

  async createItinerary(userId: string, itineraryData: Omit<Itinerary, 'id' | 'createdAt'>) {
    return await addDoc(itinerariesCollection, {
      ...itineraryData,
      userId,
      createdAt: new Date().toISOString()
    });
  },

  async updateFullItinerary(itineraryId: string, itineraryData: Partial<Itinerary>) {
    const docRef = doc(itinerariesCollection, itineraryId);
    return await updateDoc(docRef, {
      ...itineraryData,
      updatedAt: new Date().toISOString()
    });
  },

  async getUserItineraries(userId: string): Promise<Itinerary[]> {
    const favoritesCollection = collection(db, 'users', userId, 'itinerary_favorites');
    const [itinerariesSnapshot, favoritesSnapshot] = await Promise.all([
      getDocs(itinerariesCollection),
      getDocs(favoritesCollection)
    ]);
    const favoriteIds = new Set(favoritesSnapshot.docs.map(favorite => favorite.id));

    return itinerariesSnapshot.docs.map(itinerary => ({
      id: itinerary.id,
      ...itinerary.data(),
      is_favorite: favoriteIds.has(itinerary.id)
    })) as Itinerary[];
  },

  async getUserFavoriteItineraries(userId: string): Promise<Itinerary[]> {
    const itineraries = await this.getUserItineraries(userId);
    return itineraries.filter(itinerary => itinerary.is_favorite);
  },

  async deleteItinerary(itineraryId: string) {
    const docRef = doc(itinerariesCollection, itineraryId);
    return await deleteDoc(docRef);
  },

  async toggleFavorite(userId: string, itineraryId: string, currentStatus: boolean) {
    const favoriteRef = doc(db, 'users', userId, 'itinerary_favorites', itineraryId);
    if (currentStatus) {
      return await deleteDoc(favoriteRef);
    }
    return await setDoc(favoriteRef, { createdAt: new Date().toISOString() });
  }
};


