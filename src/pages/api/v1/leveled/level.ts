import { NextApiRequest, NextApiResponse } from 'next'

import QS from 'querystring'
import SteamID from 'steamid'

import { totalXPFromLevel } from '../../../../utils'

interface LevelOptions {
  key: string
  steam_id: string
  dream_level: number
  rate: number
  max_level: number
}

const Level = ({
  key,
  steam_id,
  dream_level: dreamLevel,
  rate,
  max_level: maxLevel
}: LevelOptions) => {
  if (!key) throw new Error('Provide a valid steam API key')
  if (dreamLevel > maxLevel) {
    throw new RangeError(
      'The level of dreams is greater than the maximum level established for calculation'
    )
  }

  const steamID = new SteamID(steam_id)

  if (!steamID.isValid()) throw new Error('Provide a valid Steam ID')

  return fetch(
    `http://api.steampowered.com/IPlayerService/GetBadges/v1?${QS.stringify({
      key,
      steamid: steamID.getSteamID64()
    })}`
  )
    .then((response) =>
      response.ok ? response.json() : Promise.reject(response)
    )
    .then(({ response: data }) => {
      const level: number = data.player_level

      if (dreamLevel <= level)
        throw new RangeError(
          'Dream level is less than or equal to current level'
        )

      const currentLevelXP = +(data.player_xp.toString().slice(0, -2) + '00')
      const xpFromDreamLevel = totalXPFromLevel(dreamLevel)
      const setsNeeded = (xpFromDreamLevel - currentLevelXP) / 100
      const setsNeededToLevelUp = Math.ceil(
        data.player_xp_needed_to_level_up / 100
      )

      return {
        xp: data.player_xp,
        level,
        xp_needed_to_level_up: data.player_xp_needed_to_level_up,
        sets_needed_to_level_up: setsNeededToLevelUp,
        keys_needed_to_level_up: setsNeededToLevelUp / rate,
        dream_level: dreamLevel,
        sets_needed: setsNeeded,
        xp_needed: setsNeeded * 100,
        keys_needed: setsNeeded / rate,
        emoticons: setsNeeded,
        backgrounds: setsNeeded
      }
    })
    .catch(async (response) => {
      if (response.status === 403) {
        const message = await response.text()
        throw new Error(
          message.match(/(?<=<\/h1>)(.+)(?=<pre>)/)?.shift() + 'key.'
        )
      } else {
        throw new Error(response.message)
      }
    })
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { key, steam_id, dream_level, rate } = request.query

  switch (request.method) {
    case 'GET':
      try {
        response.status(200).json(
          await Level({
            key,
            steam_id,
            dream_level: +dream_level,
            rate: +rate,
            max_level: 5299
          } as LevelOptions)
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
