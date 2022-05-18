const MAX_LEVEL = 5299

const Locales = [
  { locale: 'en', country: 'US', title: 'English' },
  { locale: 'br', country: 'BR', title: 'Português do Brasil' }
]

const ProjectPages = [
  {
    title: 'Leveled',
    path: '/leveled'
  },
  {
    title: 'Limitished',
    path: '/limitished'
  },
  {
    title: 'Identified',
    path: '/identified'
  }
]

const SteamHTTP = {
  API: 'https://api.steampowered.com',
  STORE: 'https://store.steampowered.com',
  STORE_API: 'http://store.steampowered.com/api',
  COMMUNITY: 'https://steamcommunity.com'
}

export { MAX_LEVEL, Locales, ProjectPages, SteamHTTP }
