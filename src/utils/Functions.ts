import SteamID from 'steamid'
import XML2JS from 'xml2js'

import {
  getAppDetails,
  getAppProfileFeaturesLimited,
  parseSteamProfileURL,
  totalXPFromLevel
} from '.'
import {
  IAppDetails,
  IAppDetailsResponse,
  IAppProfileFeaturesLimitedResponse,
  ILeveledOptions,
  IPromiseFulfilledResult
} from '../interfaces'
import { SteamHTTP } from './Constants'
import { EPrivacyState } from './Enums'
import Request from './Fetcher'

const Identified = (value: string) =>
  Request(`${SteamHTTP.COMMUNITY}/${parseSteamProfileURL(value)}`, {
    query: { xml: 1 }
  }).then(async (body) => {
    const { profile } = await XML2JS.parseStringPromise(body, {
      explicitArray: false,
      trim: true
    })

    if (!profile) {
      throw new Error('The specified profile could not be found')
    }

    const steamID = new SteamID(profile.steamID64)

    return {
      steam_3id: steamID.getSteam3RenderedID(),
      steam_id32: steamID.getSteam2RenderedID(),
      steam_id64: steamID.getSteamID64(),
      custom_url: profile.customURL || null,
      name: profile.steamID,
      realname: profile.realname || null,
      avatar_url: {
        small: profile.avatarIcon,
        medium: profile.avatarMedium,
        full: profile.avatarFull
      },
      location: profile.location || null,
      status: profile.stateMessage.replace(/<br\/>.*/, ''),
      privacy: EPrivacyState[profile.privacyState],
      limitations: {
        vac: !!+profile.vacBanned,
        trade_ban: profile.tradeBanState !== 'None',
        limited: !!+profile.isLimitedAccount
      },
      member_since: profile.memberSince || null
    }
  })

const Leveled = ({
  key,
  steam_id,
  dream_level: dreamLevel,
  rate,
  max_level: maxLevel
}: ILeveledOptions) => {
  if (!key) throw new Error('Provide a valid steam API key')
  if (dreamLevel > maxLevel) {
    throw new RangeError(
      'The level of dreams is greater than the maximum level established for calculation'
    )
  }

  const steamID = new SteamID(steam_id)

  if (!steamID.isValid()) throw new Error('Provide a valid Steam ID')

  return Request(`${SteamHTTP.API}/IPlayerService/GetBadges/v1`, {
    query: {
      key,
      steamid: steamID.getSteamID64()
    }
  })
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
      const friends =
        dreamLevel < 350 ? (dreamLevel - level) * 5 + level * 5 + 250 : 2000

      return {
        xp: data.player_xp,
        level,
        xp_needed_to_level_up: data.player_xp_needed_to_level_up,
        sets_needed_to_level_up: setsNeededToLevelUp,
        keys_needed_to_level_up: setsNeededToLevelUp / rate,
        dream_level: dreamLevel,
        xp_from_dream_level: xpFromDreamLevel,
        sets_needed: setsNeeded,
        xp_needed: setsNeeded * 100,
        keys_needed: setsNeeded / rate,
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

const Limitished = async (appID: number) => {
  try {
    const appPromised = (await Promise.allSettled(
      [getAppDetails, getAppProfileFeaturesLimited].map(
        (appPromise) =>
          new Promise((resolve) =>
            setTimeout(() => resolve(appPromise(appID)), Math.random() * 1e3)
          )
      )
    )) as IPromiseFulfilledResult<
      IAppDetailsResponse | IAppProfileFeaturesLimitedResponse
    >[]

    const app: IAppDetails = Object.assign(
      {},
      ...appPromised.map(({ value }) => value)
    )

    return app
  } catch (error) {
    throw new Error(error.message)
  }
}

export { Identified, Leveled, Limitished }
