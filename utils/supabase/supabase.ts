import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Browser-side client (for use inside 'use client' components)
export function createBrowserSupabase() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON)
}

// Server-side client (for Server Components / Route Handlers)
export async function createServerSupabase() {
  // await the new async cookies() API
  const cookieStore = await cookies()

  return createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON,
    {
      cookies: {
        // supply only getAll & setAll per the new guide
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // if called from within a Server Component (no write rights),
            // Supabase middleware should have already refreshed the session.
          }
        },
      },
    }
  )
}
