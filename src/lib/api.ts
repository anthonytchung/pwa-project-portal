// src/lib/api.ts
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Project {
  id: number;
  projectName: string;
  description: string;
  laborType: string;
  county: string;
  state: string;
  startdate: string;
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

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch("/api/projects/retrieve", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      return data.projects;
    }
    // Return null if not ok; let the caller decide how to handle it.
    return [];
  } catch (error) {
    console.error("Error fetching projects", error);
    return [];
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

export async function createProject(formData: {
  projectName: string;
  description: string;
  constructionType: string;
  state: string;
  county: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/projects/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Project creation failed" };
    }
    return { success: true };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Unexpected error creating project" };
  }
}