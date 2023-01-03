export interface ILevelSettings {
  api_key: string
  steam_id: string
}

export interface ILevelResponse {
  xp: number
  level: number
  xp_needed_to_level_up: number
  sets_needed_to_level_up: number
  keys_needed_to_level_up: number
  dream_level: number
  xp_from_dream_level: number
  sets_needed: number
  xp_needed: number
  keys_needed: number
  emoticons_and_backgrounds: number
  coupons: number
  friends: number
}

export interface ILevelOptions {
  key: string
  steam_id: string
  dream_level: number
  rate: number
  max_level: number
}

export type LevelSettings = Omit<ILevelSettings, 'steam_id'> & {
  user: string
}
