import { db } from "@/lib/firebase/config";
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getCountFromServer, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit 
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

  // Actualizar perfil de usuario (permite cualquier propiedad de UserProfile)
  async updateProfile(
    userId: string,
    updates: Partial<UserProfile>
  ) {
    const userRef = doc(db, "users", userId);
    const updatedData = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    // setDoc con merge guarda o actualiza sin sobrescribir el documento completo
    await setDoc(userRef, updatedData, { merge: true });

    const snap = await getDoc(userRef);
    return { id: snap.id, ...snap.data() } as UserProfile;
  },

  // Métricas agregadas para el Dashboard de Administrador
  async getAdminStats() {
    const [usersCount, placesCount, itinerariesCount, eventsCount, reviewsSnap] = await Promise.all([
      getCountFromServer(collection(db, "users")),
      getCountFromServer(collection(db, "places")),
      getCountFromServer(collection(db, "itineraries")),
      getCountFromServer(collection(db, "events")),
      getDocs(query(collection(db, "reviews"), orderBy("created_at", "desc"), limit(5))),
    ]);

    return {
      totalUsers: usersCount.data().count,
      totalPlaces: placesCount.data().count,
      totalItineraries: itinerariesCount.data().count,
      totalEvents: eventsCount.data().count,
      recentReviews: reviewsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    };
  },

  // Resumen personalizado para el Dashboard de Turista
  async getUserDashboardData(userId: string) {
    const favsQuery = query(collection(db, "users", userId, "favorites"));
    const itinerariesQuery = query(collection(db, "itineraries"), where("userId", "==", userId));
    const reviewsQuery = query(collection(db, "reviews"), where("user_id", "==", userId));

    const [favsSnap, itFavsSnap, reviewsSnap] = await Promise.all([
      getDocs(favsQuery),
      getDocs(itinerariesQuery),
      getDocs(reviewsQuery),
    ]);

    return {
      favoritePlaces: favsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      favoriteItineraries: itFavsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      userReviews: reviewsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    };
  },
};