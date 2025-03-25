'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.error('Login error:', error.message)
    redirect('/login?error=invalid-login')
  }

  redirect('/account')
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  const origin = process.env.ORIGIN || "http://localhost:3000"

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error("Google OAuth Error:", error.message)
    throw error
  }

  if (!data.url) {
    throw new Error("No redirect URL returned from Supabase.")
  }

  redirect(data.url)
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error("Signup Error:", error.message)
    redirect("/error") // optional error route
  }

  redirect("/account")
}
