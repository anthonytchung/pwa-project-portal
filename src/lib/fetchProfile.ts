
interface UserProfile {
    id: number;
    name: string;
    email: string;
    role: string;
  }


export async function fetchProfile(): Promise<null | UserProfile>{
    try {
      const res = await fetch("/api/profile/retrieve", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        return data.user
      } else {
        // Not logged in or unauthorized
        return null
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null
    }
  }
