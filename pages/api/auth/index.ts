import { supabase } from '@/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res)
}