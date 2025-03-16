"use server"

import { revalidatePath } from "next/cache"

/**
 * Register a new doctor
 */
export async function registerDoctor(formData: FormData) {
  // For development, just return success
  console.log("Doctor registration form data:", Object.fromEntries(formData.entries()))
  return { success: true }
}

/**
 * Register a new patient
 */
export async function registerPatient(formData: FormData) {
  // For development, just return success
  console.log("Patient registration form data:", Object.fromEntries(formData.entries()))
  return { success: true }
}

/**
 * Login a user
 */
export async function login(formData: FormData) {
  // Extract form data
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string

  // For development, just return success
  console.log(`Login attempt: ${email} as ${role}`)

  // Revalidate dashboard path
  revalidatePath(`/dashboard/${role}`)

  return { success: true }
}

/**
 * Logout a user
 */
export async function logout() {
  // For development, just return success
  return { success: true }
}

