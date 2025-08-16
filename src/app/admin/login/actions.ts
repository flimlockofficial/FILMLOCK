
'use server'
 
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
    console.warn("ADMIN_PASSWORD environment variable not set. Admin login will not work.");
}
 
export async function login(formData: FormData) {
  const password = formData.get('password')
 
  if (password === ADMIN_PASSWORD) {
    cookies().set('film_lock_admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })
    return { success: true, message: 'Login successful' };
  }
 
  return { success: false, message: 'Invalid password' };
}

export async function logout() {
    cookies().set('film_lock_admin_auth', '', { expires: new Date(0) })
    redirect('/admin/login')
}
