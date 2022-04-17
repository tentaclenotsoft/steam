import { NextApiRequest, NextApiResponse } from 'next'

import { ILeveledOptions } from '../../../interfaces'
import { Leveled } from '../../../utils/Functions'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { key, steam_id, dream_level, rate } = request.query

  switch (request.method) {
    case 'GET':
      try {
        response.status(200).json(
          await Leveled({
            key,
            steam_id,
            dream_level: +dream_level,
            rate: +rate,
            max_level: 5299
          } as ILeveledOptions)
        )
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
