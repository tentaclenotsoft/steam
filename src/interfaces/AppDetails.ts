export interface IAppDetailsResponse {
  app_id: number
  name: string
  removed: boolean
  is_free: boolean
  is_dlc_or_soundtrack: boolean
}

export interface IAppProfileFeaturesLimitedResponse {
  app_id: number
  has_profile_features_limited: boolean
}

export type IAppDetails = IAppDetailsResponse &
  IAppProfileFeaturesLimitedResponse
