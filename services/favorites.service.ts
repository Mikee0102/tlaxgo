import { db } from '@/lib/firebase/config';
import { collection, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';

export const favoritesService = {
  // Agregar un lugar a favoritos (subcolección del usuario)
  async addFavorite(userId: string, placeId: string, placeData?: Record<string, any>) {
    const favRef = doc(db, 'users', userId, 'favorites', placeId);
    return await setDoc(favRef, {
      placeId,
      ...placeData,
      createdAt: new Date().toISOString()
    });
  },

  // Eliminar un lugar de favoritos
  async removeFavorite(userId: string, placeId: string) {
    const favRef = doc(db, 'users', userId, 'favorites', placeId);
    return await deleteDoc(favRef);
  },

  // Obtener todos los favoritos del usuario
  async getUserFavorites(userId: string) {
    const favsCollection = collection(db, 'users', userId, 'favorites');
    const snapshot = await getDocs(favsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};