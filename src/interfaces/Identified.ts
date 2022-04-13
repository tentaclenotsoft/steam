export interface IUserData {
  steam_3id: string
  steam_id32: string
  steam_id64: string
  custom_url: string | null
  name: string
  realname: string | null
  avatar_url: {
    small: string
    medium: string
    full: string
  }
  location: string | null
  status: string
  privacy: string
  limitations: {
    vac: boolean
    trade_ban: boolean
    limited: boolean
  }
  member_since: string | null
}
