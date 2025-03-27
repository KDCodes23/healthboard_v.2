"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"

type UserRole = "patient" | "doctor"

interface UserProfile {
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
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>
  logout: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        if (data.session?.user) {
          const userData = data.session.user
          const metadata = userData.user_metadata || {}

          // Create a user profile from the session data
          const userProfile: UserProfile = {
            id: userData.id,
            email: userData.email || "",
            firstName: metadata.first_name || "",
            lastName: metadata.last_name || "",
            role: (metadata.role as UserRole) || "patient",
            avatar: metadata.avatar_url,
            specialty: metadata.specialty,
            hospital: metadata.hospital,
            medicalConditions: metadata.medical_conditions,
          }

          setUser(userProfile)
        }
      } catch (err) {
        console.error("Error fetching user:", err)
        setError("Failed to load user profile")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return

    try {
      setLoading(true)
      const supabase = createClient()

      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: updates.firstName || user.firstName,
          last_name: updates.lastName || user.lastName,
          avatar_url: updates.avatar || user.avatar,
          specialty: updates.specialty || user.specialty,
          hospital: updates.hospital || user.hospital,
          medical_conditions: updates.medicalConditions || user.medicalConditions,
        },
      })

      if (error) throw error

      // Update local state
      setUser({
        ...user,
        ...updates,
      })
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
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()

      if (error) throw error

      setUser(null)
      // Redirect will be handled by the middleware
    } catch (err) {
      console.error("Error logging out:", err)
      setError("Failed to log out")
    } finally {
      setLoading(false)
    }
  }

  return (
    <UserContext.Provider value={{ user, loading, error, updateUserProfile, logout }}>{children}</UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

