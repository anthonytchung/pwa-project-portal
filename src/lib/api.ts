// src/lib/api.ts
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
}

/**
 * Fetch the current user's profile.
 */
export async function fetchProfile(): Promise<UserProfile | null> {
  try {
    const res = await fetch("/api/profile/retrieve", {
      credentials: "include",
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data.user;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

/**
 * Log the user out.
 */
export async function logout(): Promise<boolean> {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    return res.ok;
  } catch (error) {
    console.error("Error during logout:", error);
    return false;
  }
}

/**
 * Log in the user.
 * @param email User's email.
 * @param password User's password.
 */
export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Login failed" };
    }
    return { success: true };
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, error: "Unexpected error during login" };
  }
}

/**
 * Register a new user.
 * @param name User's name.
 * @param email User's email.
 * @param password User's password.
 * @param role User's role (e.g., "DEVELOPER", "EPC", "SUBCONTRACTOR").
 */
export async function register(
  name: string,
  email: string,
  password: string,
  role: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.message || "Registration failed" };
    }
    return { success: true };
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, error: "Unexpected error during registration" };
  }
}
