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
  avatar?: string
  specialty?: string // For doctors
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
const MOCK_USERS_KEY = "health_horizon_users"
const CURRENT_USER_KEY = "health_horizon_current_user"

// Helper functions for local storage
const getStoredUsers = (): Record<string, UserProfile & { password: string }> => {
  if (typeof window === "undefined") return {}

  const stored = localStorage.getItem(MOCK_USERS_KEY)
  return stored ? JSON.parse(stored) : {}
}

const storeUsers = (users: Record<string, UserProfile & { password: string }>) => {
  if (typeof window === "undefined") return
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
}

const getCurrentUser = (): UserProfile | null => {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem(CURRENT_USER_KEY)
  return stored ? JSON.parse(stored) : null
}

const storeCurrentUser = (user: UserProfile | null) => {
  if (typeof window === "undefined") return

  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize with demo users if none exist
  useEffect(() => {
    const users = getStoredUsers()

    if (Object.keys(users).length === 0) {
      // Add demo users
      const demoUsers: Record<string, UserProfile & { password: string }> = {
        "patient@example.com": {
          id: "patient-1",
          email: "patient@example.com",
          firstName: "John",
          lastName: "Smith",
          role: "patient",
          password: "password",
          medicalConditions: "Hypertension, Mild asthma",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        "doctor@example.com": {
          id: "doctor-1",
          email: "doctor@example.com",
          firstName: "Sarah",
          lastName: "Johnson",
          role: "doctor",
          password: "password",
          specialty: "Cardiology",
          hospital: "City General Hospital",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      }

      storeUsers(demoUsers)
    }

    // Check for existing session
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }

    setLoading(false)
  }, [])

  const login = async (
    email: string,
    password: string,
    role: UserRole,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)

      // BACKEND INTEGRATION:
      // Replace this with a real authentication API call:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, role })
      // });
      // const data = await response.json();
      //
      // Store the JWT token:
      // if (data.token) {
      //   localStorage.setItem('authToken', data.token);
      // }

      const users = getStoredUsers()
      const user = users[email]

      if (!user) {
        return { success: false, error: "User not found" }
      }

      if (user.password !== password) {
        return { success: false, error: "Invalid password" }
      }

      if (user.role !== role) {
        return { success: false, error: `Invalid role. You are not registered as a ${role}.` }
      }

      // Create a user profile without the password
      const { password: _, ...userProfile } = user

      setUser(userProfile)
      storeCurrentUser(userProfile)

      return { success: true }
    } catch (err) {
      console.error("Login error:", err)
      return { success: false, error: "An unexpected error occurred" }
    } finally {
      setLoading(false)
    }
  }

  const register = async (
    userData: Partial<UserProfile> & { password: string },
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)

      if (!userData.email || !userData.password || !userData.firstName || !userData.lastName || !userData.role) {
        return { success: false, error: "Missing required fields" }
      }

      const users = getStoredUsers()

      if (users[userData.email]) {
        return { success: false, error: "Email already in use" }
      }

      // Create new user
      const newUser: UserProfile & { password: string } = {
        id: `${userData.role}-${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        password: userData.password,
        specialty: userData.specialty,
        hospital: userData.hospital,
        medicalConditions: userData.medicalConditions,
        avatar: userData.avatar || "/placeholder.svg?height=40&width=40",
      }

      // Add to users
      users[userData.email] = newUser
      storeUsers(users)

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

      // BACKEND INTEGRATION:
      // Replace this with an API call like:
      // const response = await fetch('/api/auth/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // });
      //
      // If using Supabase:
      // const { data, error } = await supabase
      //   .from(user.role === 'patient' ? 'patient_profiles' : 'doctor_profiles')
      //   .update(updates)
      //   .eq('user_id', user.id);
      //
      // If there's an avatar image upload, use a separate function to handle
      // the file upload to a storage bucket before updating the profile.

      const users = getStoredUsers()
      const currentUser = users[user.email]

      if (!currentUser) {
        throw new Error("User not found")
      }

      // Update user
      const updatedUser = {
        ...currentUser,
        ...updates,
      }

      users[user.email] = updatedUser
      storeUsers(users)

      // Update current user
      const { password: _, ...userProfile } = updatedUser
      setUser(userProfile)
      storeCurrentUser(userProfile)
    } catch (err) {
      console.error("Error updating profile:", err)
      setError("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      setUser(null)
      storeCurrentUser(null)

      // Redirect will be handled by the component
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

