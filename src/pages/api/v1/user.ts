import { NextApiRequest, NextApiResponse } from 'next'

import type { APIError } from '@utils/Error'
import User from '@utils/Functions/User'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { value } = request.query

  switch (request.method) {
    case 'GET':
      try {
        response.status(200).json(await User.identity(value as string))
      } catch (error) {
        const { code, message, statusCode } = error as APIError
        response.status(statusCode).json({ code, message })
      }
      break
    default:
      response.status(405).end('Method Not Allowed')
      break
  }
}
