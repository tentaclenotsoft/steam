import { NextApiRequest, NextApiResponse } from 'next'

import SteamID from 'steamid'

import { ILevelOptions, IUser } from '@interfaces'
import { MAX_LEVEL } from '@utils/Constants'
import type { APIError } from '@utils/Error'
import Level from '@utils/Functions/Level'
import User from '@utils/Functions/User'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { key, user, dream_level, rate } = request.query as {
    key: string
    user: string
    dream_level: string
    rate: string
  }

  switch (request.method) {
    case 'GET':
      try {
        let userData: IUser | { steam_id64: string }

        if (
          user.startsWith('STEAM_') ||
          user.startsWith('765') ||
          user.startsWith('[U:')
        ) {
          const steamId = new SteamID(user)

          userData = {
            steam_id64: steamId.getSteamID64()
          }
        } else {
          userData = await User.identity(user)
        }

        response.status(200).json(
          await Level.leveling({
            key,
            steam_id: userData.steam_id64,
            dream_level: +dream_level,
            rate: rate && +rate,
            max_level: MAX_LEVEL
          } as ILevelOptions)
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
