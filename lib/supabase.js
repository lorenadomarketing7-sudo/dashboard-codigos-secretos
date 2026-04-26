import { createClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yuanhfbzekikikafufki.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1YW5oZmJ6ZWtpa2lrYWZ1ZmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNDE4NDksImV4cCI6MjA5MjYxNzg0OX0.eerjxGlOyLm4C-dnq1H-4HI7sfXrRfZ7svNq-zkMDy8'

export const supabase = createClient(supabaseUrl, supabaseKey)
