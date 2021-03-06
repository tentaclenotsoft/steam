import { NextApiRequest, NextApiResponse } from 'next'

import { ILeveledOptions } from '@interfaces'
import { MAX_LEVEL } from '@utils/Constants'
import type { APIError } from '@utils/Error'
import { Leveled } from '@utils/Functions'

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
            rate: rate && +rate,
            max_level: MAX_LEVEL
          } as ILeveledOptions)
        )
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
