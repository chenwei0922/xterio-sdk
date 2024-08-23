import request from 'src/common/request'
import { OAuthTokens, UserProfile } from './interfaces'

export const PLATFORM_API_URL = import.meta.env.VITE_PLATFORM_API_URL

export const getAuthorizitionTokenByCode = async ({ code }: { redirect_uri: string; code: string }) => {
  const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID
  const clientSecret = import.meta.env.VITE_OAUTH_CLIENT_SECRET
  const redirectUri = import.meta.env.VITE_LOGIN_MIDWAY_URL
  const tokens = request.post<OAuthTokens>(`${PLATFORM_API_URL}/account/v1/oauth2/token`, {
    client_id: clientId,
    redirect_uri: redirectUri,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    code
  })
  console.log('fetch tokens:', tokens, 'params:', { clientId, redirectUri, clientSecret, code })
  return tokens
}

export const getUserProfile = async () => {
  return request.get<UserProfile>(`${PLATFORM_API_URL}/account/v1/user/profile?s=`)
}
