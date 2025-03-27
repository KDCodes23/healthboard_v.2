"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

/**
 * Register a new doctor
 */
export async function registerDoctor(formData: FormData) {
  const supabase = createClient()

  // Extract form data
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const specialty = formData.get("specialty") as string
  const hospital = formData.get("hospital") as string
  const bio = formData.get("bio") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Validate passwords match
  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" }
  }

  try {
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: "doctor",
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (authError) {
      console.error("Auth error:", authError)
      return { success: false, error: authError.message }
    }

    // Create doctor profile in database
    const { error: profileError } = await supabase.from("doctors").insert({
      user_id: authData.user?.id,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      specialty,
      hospital,
      bio,
    })

    if (profileError) {
      console.error("Profile error:", profileError)
      return { success: false, error: profileError.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

/**
 * Register a new patient
 */
export async function registerPatient(formData: FormData) {
  const supabase = createClient()

  // Extract form data
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const dateOfBirth = formData.get("dateOfBirth") as string
  const gender = formData.get("gender") as string
  const medicalConditions = formData.get("medicalConditions") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Validate passwords match
  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" }
  }

  try {
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: "patient",
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (authError) {
      console.error("Auth error:", authError)
      return { success: false, error: authError.message }
    }

    // Create patient profile in database
    const { error: profileError } = await supabase.from("patients").insert({
      user_id: authData.user?.id,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      date_of_birth: dateOfBirth,
      gender,
      medical_conditions: medicalConditions,
    })

    if (profileError) {
      console.error("Profile error:", profileError)
      return { success: false, error: profileError.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

/**
 * Login a user
 */
export async function login(formData: FormData) {
  const supabase = createClient()

  // Extract form data
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string

  try {
    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Login error:", error)
      return { success: false, error: error.message }
    }

    // For mock client, override the role to match what was selected
    if (data.user && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
      data.user.user_metadata = {
        ...data.user.user_metadata,
        role: role,
      }
    }

    // Verify user role
    const userRole = data.user?.user_metadata?.role

    if (userRole !== role) {
      // Sign out if role doesn't match
      await supabase.auth.signOut()
      return { success: false, error: `Invalid role. You are not registered as a ${role}.` }
    }

    // Revalidate dashboard path
    revalidatePath(`/dashboard/${role}`)

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

/**
 * Logout a user
 */
export async function logout() {
  const supabase = createClient()

  try {
    await supabase.auth.signOut()
    return { success: true }
  } catch (error) {
    console.error("Logout error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

