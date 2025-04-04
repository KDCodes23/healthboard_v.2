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


// /**
//  * Login a user
//  */
// export async function login(formData: FormData) {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authorize/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         Email: formData.get('email'),
//         Password: formData.get('password'),
//         Role: formData.get('role') // Send role for validation
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       const errorMessage = errorData.message 
//         || (errorData.errors ? Object.values(errorData.errors).flat().join(', ') : 'Login failed');
        
//       return { success: false, error: errorMessage };
//     }

//     const data = await response.json();
//     localStorage.setItem('authToken', data.token); // Store JWT token
//     // localStorage.setItem('userId', data.id); // Store User ID
//     // localStorage.setItem('userRole', formData.get('role') as string); // Store Role
    
//     return { success: true };
//     //return { success: true, token: data.token, userId: data.id, userRole: formData.get('role') };

//   } catch (error) {
//     console.error('Login error:', error);
//     return { success: false, error: 'Network error - Could not reach server' };
//   }
// }

// /**
//  * Logout a user
//  */
// export function logout() {
//   // Clear local storage
//   localStorage.removeItem('authToken');
//   localStorage.removeItem('userId');
//   localStorage.removeItem('userRole');

//   // Redirect to login page
//   window.location.href = "/login"; 
// }

// /**
//  * Login a user
//  */
// export async function login(formData: FormData) {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authorize/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         Email: formData.get('email'),
//         Password: formData.get('password'),
//         Role: formData.get('role') // Send role for validation
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       const errorMessage = errorData.message 
//         || (errorData.errors ? Object.values(errorData.errors).flat().join(', ') : 'Login failed');
        
//       return { success: false, error: errorMessage };
//     }

//     const data = await response.json();
//     console.log("Login response data:", data);

//     if (data.userId) {
//       localStorage.setItem('userId', data.userId);  // Store userId if it exists
//       console.log('Stored userId:', data.userId);  // Debugging line
//     } else {
//       console.error("User ID not found in response:", data);
//     }

//     // // Store JWT token and userId in localStorage
//     // localStorage.setItem('authToken', data.token);
//     // localStorage.setItem('userId', data.userId);  // Assuming the response contains userId
//     // console.log('Stored userId:', data.userId); 

//     return { success: true };

//   } catch (error) {
//     console.error('Login error:', error);
//     return { success: false, error: 'Network error - Could not reach server' };
//   }
// }

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
    console.log('Backend Response Data:', data); // Log the entire response to check the data
    
    localStorage.setItem('authToken', data.token); // Store JWT token
    localStorage.setItem('userId', data.id); // Store user ID

    return { success: true };

  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Network error - Could not reach server' };
  }
}

/**
 * Logout a user
 */
export function logout() {
  // Clear local storage
  localStorage.removeItem('authToken');
  localStorage.removeItem('userId'); // Remove userId as well

  // Redirect to login page
  window.location.href = "/login"; 
}
