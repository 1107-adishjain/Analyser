import { createClient } from '@supabase/supabase-js'

function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // Enhanced debugging
  console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Not set')
  console.log('Supabase Key:', supabaseKey ? 'Set' : 'Not set')
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase environment variables not configured')
    return null
  }
  
  try {
    const client = createClient(supabaseUrl, supabaseKey)
    console.log('Supabase client created successfully')
    return client
  } catch (error) {
    console.error('Error creating Supabase client:', error)
    return null
  }
}

export const supabase = createSupabaseClient()

// Enhanced safe fallback with better error messages
const safeSupabase = supabase || {
  auth: {
    signInWithPassword: () => {
      console.error('Supabase not configured - login unavailable')
      return Promise.reject(new Error('Authentication service not configured. Please contact administrator.'))
    },
    signUp: () => {
      console.error('Supabase not configured - signup unavailable')
      return Promise.reject(new Error('Registration service not configured. Please contact administrator.'))
    },
    signOut: () => Promise.resolve(),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: (callback) => {
      // Call callback immediately with no session
      callback('SIGNED_OUT', null)
      return { data: { subscription: { unsubscribe: () => {} } } }
    }
  },
  from: (table) => ({
    insert: () => Promise.reject(new Error('Database service not configured')),
    select: () => Promise.reject(new Error('Database service not configured')),
    eq: () => this,
    order: () => this
  })
}

export default safeSupabase
