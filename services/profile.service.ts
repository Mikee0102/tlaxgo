import { db } from "@/lib/firebase/config";
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getCountFromServer, 
  getDocs, 
  query
} from "firebase/firestore";
import { UserProfile } from "@/types/user";
import { itineraryService } from "@/services/itinerary.service";

export const profileService = {
  // Obtener perfil por ID
  async getProfile(userId: string) {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as UserProfile;
    }
    return null;
  },

  // Actualizar perfil de usuario
  async updateProfile(
    userId: string,
    updates: Partial<UserProfile>
  ) {
    const userRef = doc(db, "users", userId);
    const updatedData = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    await setDoc(userRef, updatedData, { merge: true });

    const snap = await getDoc(userRef);
    return { id: snap.id, ...snap.data() } as UserProfile;
  },

  // Métricas agregadas para el Dashboard de Administrador
  async getAdminStats() {
    const [usersCount, placesCount, eventsCount] = await Promise.all([
      getCountFromServer(collection(db, "users")),
      getCountFromServer(collection(db, "places")),
      getCountFromServer(collection(db, "events")),
    ]);

    const itinerariesCount = await getCountFromServer(collection(db, "itineraries"));

    return {
      totalUsers: usersCount.data().count,
      totalPlaces: placesCount.data().count,
      totalItineraries: itinerariesCount.data().count,
      totalEvents: eventsCount.data().count,
      recentReviews: [], // Evita fallos si la ruta de reviews requiere índices avanzados
    };
  },

  // Resumen personalizado para el Dashboard de Turista
  async getUserDashboardData(userId: string) {
    const favsQuery = query(collection(db, "users", userId, "favorites"));

    const [favsSnap, favoriteItineraries] = await Promise.all([
      getDocs(favsQuery),
      itineraryService.getUserFavoriteItineraries(userId),
    ]);

    return {
      favoritePlaces: favsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      favoriteItineraries,
      userReviews: [], // Evita consultas cruzadas sin permisos de grupo
    };
  },
};