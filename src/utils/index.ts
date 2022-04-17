import { load } from 'cheerio'
import SteamID from 'steamid'

import { SteamHTTP } from './Constants'
import Request from './Fetcher'

const getAppDetails = (appID: number) =>
  Request(`${SteamHTTP.API}/appdetails`, {
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

const levelToClasses = (level: number) => {
  const subnum = (number: number, from: number, length: number) =>
    String(number).substr(from, length)

  if (level < 10) {
    return ['level-0', '']
  } else if (level >= 10 && level < 100) {
    return [`level-${subnum(level, 0, 1)}0`, '']
  } else if (level >= 100 && level < 1000) {
    return [
      `level-${subnum(level, 0, 1)}00`,
      `level-plus-${subnum(level, 1, 1)}0`
    ]
  } else if (level >= 1000) {
    return [
      `level-${subnum(level, 0, 2)}00`,
      `level-plus-${subnum(level, 2, 1)}0`
    ]
  }
}

const numberFormatter = (value: number) => new Intl.NumberFormat().format(value)

const parseSteamProfileURL = (value: string) => {
  const valueMatch = value.match(
    /(?:https?:\/\/)?steamcommunity\.com\/((?:profiles|id)\/[a-zA-Z0-9]+)/
  )
  const valueParsed = Array.isArray(valueMatch) ? valueMatch[1] : value

  if (
    valueParsed.startsWith('STEAM_') ||
    valueParsed.startsWith('765') ||
    valueParsed.startsWith('[U:')
  ) {
    const steamID = new SteamID(valueParsed)

    return steamID.isValid() ? `profiles/${steamID.toString()}` : null
  } else {
    return !valueParsed.startsWith('id/') &&
      !valueParsed.startsWith('profiles/')
      ? `id/${valueParsed}`
      : valueParsed
  }
}

const requiredXPFromLevel = (level: number) => {
  if (level <= 10) {
    return 100
  } else if (level < 100) {
    const [first, last] = level
      .toString()
      .split('')
      .map((number) => +number)

    return (
      +(first + (last === 0 ? '0' : '1'))
        .split('')
        .reduce((a, b) => Number(a) + Number(b), 0) * 100
    )
  } else {
    const [penultimate, last] = level
      .toString()
      .slice(level < 1000 ? 1 : 2)
      .split('')
      .map((number) => +number)

    let lastTwoSum = 0
    lastTwoSum = +(penultimate + (last === 0 ? '0' : '1'))
      .split('')
      .reduce((a, b) => Number(a) + Number(b), 0)

    const lastTwoDigits = penultimate.toString() + last.toString()
    const leadingDigits = level.toString().replace(lastTwoDigits, '')

    if (lastTwoSum === 10) {
      return (+level.toString().replace(lastTwoDigits, '') + 1) * 1000
    } else {
      return (
        +(leadingDigits + lastTwoSum.toString()) *
        (level < 1000
          ? +leadingDigits % 10 !== 0
            ? 100
            : 10
          : +leadingDigits % 1 !== 0
          ? 1000
          : 100)
      )
    }
  }
}

const totalXPFromLevel = (level: number) => {
  let xp = 0

  for (let index = 1; index <= level; index++) {
    xp += requiredXPFromLevel(index)
  }

  return xp
}

export {
  getAppDetails,
  getAppProfileFeaturesLimited,
  levelToClasses,
  numberFormatter,
  parseSteamProfileURL,
  requiredXPFromLevel,
  totalXPFromLevel
}
