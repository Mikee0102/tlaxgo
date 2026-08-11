import { createClient } from "@/lib/supabase/client";

export async function signIn(
  email: string,
  password: string,
) {
  const supabase = createClient();

  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signUp(
  email: string,
  password: string,
  fullName: string,
) {
  const supabase = createClient();

  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
}

export async function signOut() {
  const supabase = createClient();

  return await supabase.auth.signOut({
    scope: "local",
  });
}

export async function resetPassword(email: string) {
  const supabase = createClient();

  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/update-password`,
  });
}

export async function updatePassword(password: string) {
  const supabase = createClient();

  return await supabase.auth.updateUser({
    password,
  });
}