import { load } from 'cheerio'
import SteamID from 'steamid'
import XML2JS from 'xml2js'

import { parseSteamProfileURL, totalXPFromLevel } from '.'
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

const getAppDetails = (appID: number) =>
  Request(`${SteamHTTP.STORE_API}/appdetails`, {
    query: { appids: appID }
  }).then((data) => {
    const success = data[appID].success
    const appDetails = data[appID].data
    const app = {
      app_id: appID,
      name: appDetails?.name,
      removed: !success,
      is_free: appDetails?.is_free,
      is_dlc_or_soundtrack: /dlc|music/.test(appDetails?.type)
    }

    return app
  })

const getAppProfileFeaturesLimited = (appID: number) =>
  Request(`${SteamHTTP.STORE}/app/${appID}`, {
    options: {
      headers: {
        Cookie:
          'Steam_Language=english; birthtime=-2211651935; wants_mature_content=1;'
      }
    }
  }).then((body) => {
    const $ = load(body)
    const categories = []

    $('.game_area_details_specs_ctn > .label').each(function () {
      categories.push($(this).html())
    })

    const app = {
      app_id: appID,
      has_profile_features_limited: !!categories.find(
        (category) =>
          category.startsWith('Profile Features Limited') ||
          category.startsWith('Steam is learning about this game')
      )
    }

    return app
  })

const Identified = async (value: string) => {
  const userProfile = await Request(
    `${SteamHTTP.COMMUNITY}/${parseSteamProfileURL(value)}`
  ).then((body) => {
    const $ = load(body)

    return {
      private: !!$('.profile_private_info').text().trim(),
      level: +$('.friendPlayerLevelNum').first().text() || null
    }
  })

  return Request(`${SteamHTTP.COMMUNITY}/${parseSteamProfileURL(value)}`, {
    query: { xml: 1 }
  })
    .then((body) =>
      XML2JS.parseStringPromise(body, {
        explicitArray: false,
        trim: true
      })
    )
    .then(({ profile }) => {
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
        level: userProfile.level,
        location: profile.location || null,
        status: profile.stateMessage.replace(/<br\/>.*/, ''),
        privacy: EPrivacyState[profile.privacyState],
        limitations: {
          vac: !!+profile.vacBanned,
          trade_ban: profile.tradeBanState !== 'None',
          limited: !!+profile.isLimitedAccount,
          community_ban: !userProfile.private && !userProfile.level
        },
        member_since: profile.memberSince || null
      }
    })
}

const Leveled = ({
  key,
  steam_id,
  dream_level: dreamLevel,
  rate,
  max_level: maxLevel
}: ILeveledOptions) => {
  if (!key) throw new Error('Provide a valid steam API key')
  if (!dreamLevel) throw new Error('Provide a valid dream level')
  if (dreamLevel > maxLevel) {
    throw new RangeError(
      'The level of dreams is greater than the maximum level established for calculation'
    )
  }
  if (!rate && rate !== 0) throw new Error('Provide a valid rate')
  if (rate < 1) throw new RangeError('The rate is too low')

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
