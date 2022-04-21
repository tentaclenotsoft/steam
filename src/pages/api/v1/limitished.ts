import { NextApiRequest, NextApiResponse } from 'next'

import { Limitished } from '@utils/Functions'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { app_id } = request.query

  switch (request.method) {
    case 'GET':
      try {
        response.status(200).json(await Limitished(+app_id as number))
      } catch (error) {
        const { message } = error as Error
        response.status(500).json({ message })
      }
      break
    default:
      response.status(405).end('Method Not Allowed')
      break
  }
}
