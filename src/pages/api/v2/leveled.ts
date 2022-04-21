import { NextApiRequest, NextApiResponse } from 'next'

import { ILeveledOptions, IUserData } from '@interfaces'
import { MAX_LEVEL } from '@utils/Constants'
import { Identified, Leveled } from '@utils/Functions'
import SteamID from 'steamid'

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
        let userData: IUserData | { steam_id64: string }

        if (
          user.startsWith('STEAM_') ||
          user.startsWith('765') ||
          user.startsWith('[U:')
        ) {
          const steamID = new SteamID(user)

          userData = {
            steam_id64: steamID.getSteamID64()
          }
        } else {
          userData = await Identified(user)
        }

        response.status(200).json(
          await Leveled({
            key,
            steam_id: userData.steam_id64,
            dream_level: +dream_level,
            rate: +rate,
            max_level: MAX_LEVEL
          } as ILeveledOptions)
        )
        response.status(200)
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
