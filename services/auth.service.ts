import { auth } from '@/lib/firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

export const authService = {
  // Iniciar sesión con Email y Contraseña
  async login(email: string, pass: string) {
    return await signInWithEmailAndPassword(auth, email, pass);
  },

  // Registrar un usuario con Email y Contraseña
  async register(email: string, pass: string, name?: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    if (name && userCredential.user) {
      await updateProfile(userCredential.user, { displayName: name });
    }
    return userCredential;
  },

  // Iniciar sesión / Registro con Google
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  },

  // Cerrar sesión
  async logout() {
    return await signOut(auth);
  }
};