"use server"

import { revalidatePath } from "next/cache"

/**
 * Register a new doctor
 */
export async function registerDoctor(formData: FormData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctor/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      FirstName: formData.get('firstName'),
      LastName: formData.get('lastName'),
      Email: formData.get('email'),
      Phone: formData.get('phone'),
      Specialty: formData.get('specialty'),
      HospitalName: formData.get('hospitalName'),
      ProfessionalBio: formData.get('professionalBio'),
      Password: formData.get('password')
    }),
  });

  if (!response.ok) {
    const errorText = await response.text(); // Get raw response
    console.error("API Error Response:", errorText);
    throw new Error(errorText || "Doctor Registration failed");
  }

  return await response.json();
}

/**
 * Register a new patient
 */
export async function registerPatient(formData: FormData) {
  const addressData = {
    Street: formData.get('Address.Street'), // PascalCase
    City: formData.get('Address.City'),
    ProvinceOrState: formData.get('Address.ProvinceOrState'),
    Country: formData.get('Address.Country'),
    PostalCode: formData.get('Address.PostalCode')
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patient/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      FirstName: formData.get('firstName'),
      LastName: formData.get('lastName'),
      Email: formData.get('email'),
      Phone: formData.get('phone'),
      DateOfBirth: formData.get('dateOfBirth'),
      Gender: formData.get('gender'),
      MedicalConditions: formData.get('medicalConditions'),
      Password: formData.get('password'),
      Address: addressData // PascalCase "Address" key
    }),
  });

  if (!response.ok) {
    const errorText = await response.text(); // Get raw response
    console.error("API Error Response:", errorText);
    throw new Error(errorText || "Patient Registration failed");
  }

  return await response.json();
}

/**
 * Login a user
 */
export async function login(formData: FormData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      role: formData.get("role"),
      email: formData.get("email"),
      password: formData.get("password")
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return await response.json();
}

/**
 * Logout a user
 */
export async function logout() {
  // For development, just return success
  return { success: true }
}

