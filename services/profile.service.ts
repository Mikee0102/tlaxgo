import { db } from "@/lib/firebase/config";
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getCountFromServer, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  collectionGroup 
} from "firebase/firestore";
import { UserProfile } from "@/types/user";

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

    // Conteo global seguro de itinerarios usando collectionGroup
    const itinerariesSnap = await getDocs(collectionGroup(db, "itinerarios"));

    return {
      totalUsers: usersCount.data().count,
      totalPlaces: placesCount.data().count,
      totalItineraries: itinerariesSnap.size,
      totalEvents: eventsCount.data().count,
      recentReviews: [], // Evita fallos si la ruta de reviews requiere índices avanzados
    };
  },

  // Resumen personalizado para el Dashboard de Turista
  async getUserDashboardData(userId: string) {
    const favsQuery = query(collection(db, "users", userId, "favorites"));
    const itinerariesQuery = query(collection(db, "users", userId, "itinerarios"));

    const [favsSnap, itSnap] = await Promise.all([
      getDocs(favsQuery),
      getDocs(itinerariesQuery),
    ]);

    return {
      favoritePlaces: favsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      favoriteItineraries: itSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      userReviews: [], // Evita consultas cruzadas sin permisos de grupo
    };
  },
};