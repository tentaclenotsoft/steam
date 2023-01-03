import { load } from 'cheerio'
import SteamID from 'steamid'
import XML2JS from 'xml2js'

import { IUser } from '@interfaces'
import { parseSteamProfileURL } from '@utils'
import { SteamHTTP } from '@utils/Constants'
import { EPrivacyState } from '@utils/Enums'
import { APIError } from '@utils/Error'
import Request from '@utils/Fetcher'

export default class User {
  static async identity (value: string): Promise<IUser> {
    const profileURL = `${SteamHTTP.COMMUNITY}/${parseSteamProfileURL(value)}`

    const htmlProfile = await Request(profileURL).then((body) => {
      const $ = load(body)

      return {
        private: !!$('.profile_private_info').text().trim(),
        level: +$('.friendPlayerLevelNum').first().text() || null
      }
    })

    return Request(profileURL, { query: { xml: 1 } })
      .then((body) =>
        XML2JS.parseStringPromise(body, { explicitArray: false, trim: true })
      )
      .then(({ profile }) => {
        if (!profile) {
          throw new APIError(
            'profileNotFound',
            'The specified profile could not be found',
            400
          )
        }

        const steamId = new SteamID(profile.steamID64)

        return {
          steam_3id: steamId.getSteam3RenderedID(),
          steam_id32: steamId.getSteam2RenderedID(),
          steam_id64: steamId.getSteamID64(),
          custom_url: profile.customURL || null,
          name: profile.steamID,
          realname: profile.realname || null,
          avatar_url: {
            small: profile.avatarIcon,
            medium: profile.avatarMedium,
            full: profile.avatarFull
          },
          level: htmlProfile.level,
          location: profile.location || null,
          status: profile.stateMessage.replace(/<br\/>.*/, ''),
          privacy: EPrivacyState[profile.privacyState],
          limitations: {
            vac: !!+profile.vacBanned,
            trade_ban: profile.tradeBanState !== 'None',
            limited: !!+profile.isLimitedAccount,
            community_ban: !htmlProfile.private && !htmlProfile.level
          },
          member_since: profile.memberSince || null
        }
      })
  }
}
