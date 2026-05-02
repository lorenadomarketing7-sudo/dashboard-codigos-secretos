import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://yuanhfbzekikikafufki.supabase.co',
  process.env.SUPABASE_SERVICE_KEY!
)

function isAdmin(req: NextApiRequest) {
  return req.headers['x-admin-key'] === process.env.ADMIN_SECRET
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .order('ordem', { ascending: true })
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }

  if (!isAdmin(req)) return res.status(401).json({ error: 'Não autorizado' })

  if (req.method === 'POST') {
    const { data, error } = await supabase.from('categorias').insert([req.body]).select()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data[0])
  }

  if (req.method === 'PUT') {
    const { id, ...body } = req.body
    const { data, error } = await supabase.from('categorias').update(body).eq('id', id).select()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data[0])
  }

  if (req.method === 'DELETE') {
    const { id } = req.body
    const { error } = await supabase.from('categorias').delete().eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ success: true })
  }

  return res.status(405).end()
}
