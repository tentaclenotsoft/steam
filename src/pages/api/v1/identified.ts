import { NextApiRequest, NextApiResponse } from 'next'

import SteamID from 'steamid'
import XML2JS from 'xml2js'

import { parseSteamProfileURL } from '../../../utils'
import Request from '../../../utils/fetcher'

const EPrivacyState = {
  public: 'Public',
  friendsonly: 'Friends Only',
  private: 'Private'
}

const Identified = (value: string) =>
  Request(`https://steamcommunity.com/${parseSteamProfileURL(value)}`, {
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

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { value } = request.query

  switch (request.method) {
    case 'GET':
      try {
        response.status(200).json(await Identified(value as string))
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
