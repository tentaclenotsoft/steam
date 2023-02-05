import SteamID from 'steamid'

import { ILevel, ILevelOptions } from '@interfaces'
import { totalXPFromLevel } from '@utils'
import { SteamHTTP } from '@utils/Constants'
import { APIError } from '@utils/Error'
import Request from '@utils/Fetcher'

export default class Level {
  static leveling (options: ILevelOptions): Promise<ILevel> {
    if (!options.key) {
      throw new APIError('invalidKey', 'Provide a valid steam API key', 400)
    }

    if (!options.dream_level) {
      throw new APIError(
        'invalidDreamLevel',
        'Provide a valid dream level',
        400
      )
    }

    if (options.dream_level > options.max_level) {
      throw new APIError(
        'dreamLevelHigherThanMaximumLevel',
        'The level of dreams is greater than the maximum level established for calculation',
        400
      )
    }

    if (!options.rate && options.rate !== 0) {
      throw new APIError('invalidRate', 'Provide a valid rate', 400)
    }

    if (options.rate < 1) {
      throw new APIError('rateTooLow', 'The rate is too low', 400)
    }

    const steamId = new SteamID(options.steam_id)

    if (!steamId.isValid()) {
      throw new APIError('invalidSteamId', 'Provide a valid Steam ID', 400)
    }

    return Request(`${SteamHTTP.API}/IPlayerService/GetBadges/v1`, {
      query: {
        key: options.key,
        steamid: steamId.getSteamID64()
      }
    })
      .then(({ response: data }) => {
        const level: number = data.player_level

        if (options.dream_level <= level) {
          throw new APIError(
            'dreamLevelLessThanOrEqual',
            'Dream level is less than or equal to current level',
            400
          )
        }

        const currentLevelXP = +(data.player_xp.toString().slice(0, -2) + '00')
        const xpNeededToCurrentLevel = totalXPFromLevel(level)
        const xpFromDreamLevel = totalXPFromLevel(options.dream_level)
        const setsNeeded = (xpFromDreamLevel - currentLevelXP) / 100
        const setsNeededToLevelUp = Math.ceil(
          data.player_xp_needed_to_level_up / 100
        )
        const friends =
          options.dream_level < 350
            ? (options.dream_level - level) * 5 + level * 5 + 250
            : 2000

        return {
          xp: data.player_xp,
          level,
          xp_needed_to_current_level: xpNeededToCurrentLevel,
          xp_needed_to_level_up: data.player_xp_needed_to_level_up,
          sets_needed_to_level_up: setsNeededToLevelUp,
          keys_needed_to_level_up: setsNeededToLevelUp / options.rate,
          dream_level: options.dream_level,
          xp_from_dream_level: xpFromDreamLevel,
          sets_needed: setsNeeded,
          xp_needed: setsNeeded * 100,
          keys_needed: setsNeeded / options.rate,
          emoticons_and_backgrounds: setsNeeded * 2,
          coupons: setsNeeded,
          friends
        }
      })
      .catch((error) => {
        if (!error.message) {
          throw new Error(
            error.match(/(?<=<\/h1>)(.+)(?=<pre>)/)?.shift() + 'key.'
          )
        } else {
          throw new Error(error.message)
        }
      })
  }
}
