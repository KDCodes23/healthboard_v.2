"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"



/**
 * Register a new patient
 */
export async function registerPatient(formData: FormData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authorize/register-patient`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        UserName: formData.get('email'),
        Email: formData.get('email'),
        Password: formData.get('password'),
        Patient: {
          FirstName: formData.get('firstName'),
          LastName: formData.get('lastName'),
          DateOfBirth: formData.get('dateOfBirth'),
          PhoneNumber: formData.get('phone'),
          Gender: formData.get('gender'),
          MedicalConditions: formData.get('medicalConditions'),
          Address: {
            Street: formData.get('address.street'),
            City: formData.get('address.city'),
            ProvinceOrState: formData.get('address.provinceOrState'),
            Country: formData.get('address.country'),
            PostalCode: formData.get('address.postalCode')
          }
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.errors 
        ? Object.values(errorData.errors).flat().join(', ') 
        : errorData.message || 'Registration failed';
        
      return { success: false, error: errorMessage };
    }

    return { success: true };

  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Network error - Could not reach server' };
  }
}

/**
 * Register a new doctor
 */
export async function registerDoctor(formData: FormData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authorize/register-doctor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        UserName: formData.get('email'),
        Email: formData.get('email'),
        Password: formData.get('password'),
        Doctor: {
          FirstName: formData.get('firstName'),
          LastName: formData.get('lastName'),
          Specialization: formData.get('specialization'),
          PhoneNumber: formData.get('phone'),
          HospitalName: formData.get('hospitalName'),
          ProfessionalBio: formData.get('professionalBio')
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.errors 
        ? Object.values(errorData.errors).flat().join(', ') 
        : errorData.message || 'Registration failed';
        
      return { success: false, error: errorMessage };
    }

    return { success: true };

  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Network error - Could not reach server' };
  }
}


/**
 * Login a user
 */
export async function login(formData: FormData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authorize/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Email: formData.get('email'),
        Password: formData.get('password'),
        Role: formData.get('role') // Send role for validation
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message 
        || (errorData.errors ? Object.values(errorData.errors).flat().join(', ') : 'Login failed');
        
      return { success: false, error: errorMessage };
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.token); // Store JWT token
    
    return { success: true };

  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Network error - Could not reach server' };
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

