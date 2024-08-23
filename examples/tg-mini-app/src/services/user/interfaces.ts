export interface UserProfile {
  about: string
  avatar: string
  created_at: number
  email: string
  identity: null
  password: number
  source: number
  subscribe: number
  username: string
  uuid: string
}

export interface OAuthTokens {
  access_token: string
  id_token: string
  refresh_token: string
}
