import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://yuanhfbzekikikafufki.supabase.co',
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const { Customer } = req.body

    if (!Customer?.email) {
      return res.status(400).json({ error: 'Email não encontrado' })
    }

    const email = Customer.email
    const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8).toUpperCase() + '!2'

    const { error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name: Customer.full_name }
    })

    if (error && error.message !== 'User already registered') {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ success: true })

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
