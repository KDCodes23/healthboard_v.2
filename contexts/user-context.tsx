/**
 * User Context
 *
 * This context provides user authentication and profile management functionality.
 *
 * BACKEND INTEGRATION NOTES:
 * -----------------------------
 * 1. Authentication Flow:
 *    - Replace localStorage with JWT token management
 *    - Use HTTP-only cookies for secure token storage
 *    - Implement refresh token mechanism for longer sessions
 *
 * 2. Database Schema:
 *    - Users table: id, email, role, password_hash, created_at, last_login
 *    - Patient_profiles: user_id (FK), first_name, last_name, date_of_birth, gender, medical_conditions, avatar_url
 *    - Doctor_profiles: user_id (FK), first_name, last_name, specialty, hospital, bio, qualifications, avatar_url
 *    - Appointments: id, patient_id (FK), doctor_id (FK), date_time, status, meeting_link
 *    - Medical_records: id, patient_id (FK), doctor_id (FK), date, record_type, notes, attachments
 *
 * 3. API Endpoints:
 *    - POST /api/auth/login - Handle user login
 *    - POST /api/auth/register - Handle user registration
 *    - GET /api/auth/me - Get current user profile
 *    - PUT /api/auth/profile - Update user profile
 *    - POST /api/meetings/create - Create a new virtual meeting
 *    - GET /api/meetings/:id - Get meeting details
 */

"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "patient" | "doctor"

export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  gender?: string // For patients
  phoneNumber: string
  dateOfBirth?: string // For patients
  address?: {
    street: string
    city: string
    provinceOrState: string
    country: string
    postalCode: string
  }
  avatar?: string
  specialization?: string // For doctors
  professionalBio?: string // For doctors
  hospital?: string // For doctors
  medicalConditions?: string // For patients
}

interface UserContextType {
  user: UserProfile | null
  loading: boolean
  error: string | null
  login: (email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>
  register: (userData: Partial<UserProfile> & { password: string }) => Promise<{ success: boolean; error?: string }>
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>
  logout: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Mock user database
// const MOCK_USERS_KEY = "health_horizon_users"
// const CURRENT_USER_KEY = "health_horizon_current_user"

// Helper functions for local storage
// const getStoredUsers = (): Record<string, UserProfile & { password: string }> => {
//   if (typeof window === "undefined") return {}

//   const stored = localStorage.getItem(MOCK_USERS_KEY)
//   return stored ? JSON.parse(stored) : {}
// }

// const storeUsers = (users: Record<string, UserProfile & { password: string }>) => {
//   if (typeof window === "undefined") return
//   localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
// }

// const getCurrentUser = (): UserProfile | null => {
//   if (typeof window === "undefined") return null

//   const stored = localStorage.getItem(CURRENT_USER_KEY)
//   return stored ? JSON.parse(stored) : null
// }

// const storeCurrentUser = (user: UserProfile | null) => {
//   if (typeof window === "undefined") return

//   if (user) {
//     localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
//   } else {
//     localStorage.removeItem(CURRENT_USER_KEY)
//   }
// }

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return setLoading(false);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (
    email: string,
    password: string,
    role: UserRole,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authorize/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email, Password: password, Role: role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.message || 'Login failed' };
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      setUser(data.user); // Adjust based on your API response structure
      return { success: true };

    } catch (err) {
      return { success: false, error: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    userData: Partial<UserProfile> & { password: string },
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)

      if (!userData.email || !userData.password || !userData.firstName || !userData.lastName || !userData.role) {
        return { success: false, error: "Missing required fields" }
      }

      const endpoint = userData.role === 'doctor' ? '/register-doctor' : '/register-patient'


      const requestBody = {
        UserName: userData.email,
        Email: userData.email,
        Password: userData.password,
        [userData.role === 'doctor' ? 'Doctor' : 'Patient']: {
          FirstName: userData.firstName,
          LastName: userData.lastName,
          ...(userData.role === 'patient' && {
            DateOfBirth: userData.dateOfBirth,
            PhoneNumber: userData.phoneNumber,
            Gender: userData.gender,
            MedicalConditions: userData.medicalConditions,
            Address: userData.address
          }),
          ...(userData.role === 'doctor' && {
            Specialization: userData.specialization,
            PhoneNumber: userData.phoneNumber,
            HospitalName: userData.hospital,
            ProfessionalBio: userData.professionalBio
          })
        }
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authorize${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      const responseText = await response.text(); // Get raw response
      console.log("Raw API response:", responseText);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: "Unexpected response from server" };
        }
        return { success: false, error: errorData.message || "Registration failed" };
      }

      return { success: true }
    } catch (err) {
      console.error("Registration error:", err)

      return { success: false, error: "An unexpected error occurred" }
    } finally {
      setLoading(false)
    }
  }

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return

    try {
      setLoading(true)

      if (!user) throw new Error("No user to update")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          role: user.role,
          updates: {
            ...updates,
            // Include address if updating patient profile
            ...(user.role === 'patient' && updates.address && { Address: updates.address })
          }
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Update failed')
      }

      const updatedUser = await response.json()
      setUser(updatedUser)

    } catch (err) {
      console.error("Error updating profile:", err)
      setError("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      })

      // Clear client-side data
      localStorage.removeItem('authToken')
      setUser(null)
      window.location.href = "/login"

    } catch (err) {
      console.error("Error logging out:", err)
      setError("Failed to log out")
    } finally {
      setLoading(false)
    }
  }

  return (
    <UserContext.Provider value={{ user, loading, error, login, register, updateUserProfile, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}