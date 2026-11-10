import { auth } from '@/lib/firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword as firebaseUpdatePassword
} from 'firebase/auth';

// Función nombrada para la actualización de contraseña
export async function updatePassword(newPassword: string): Promise<{ error: any }> {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { error: { message: 'No hay una sesión activa de usuario.' } };
    }
    await firebaseUpdatePassword(user, newPassword);
    return { error: null };
  } catch (err: any) {
    if (err.code === 'auth/requires-recent-login') {
      return { 
        error: { message: 'Por seguridad, debes cerrar sesión y volver a ingresar para cambiar tu contraseña.' } 
      };
    }
    return { error: { message: err.message || 'Error al actualizar la contraseña.' } };
  }
}

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

  // Actualizar contraseña
  updatePassword,

  // Cerrar sesión
  async logout() {
    return await signOut(auth);
  }
};