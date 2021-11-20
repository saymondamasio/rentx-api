interface IAuthConfig {
  httpSecure: boolean
  secret_token: string
  expires_in_token: string
  secret_refresh_token: string
  expires_in_refresh_token: string
  expires_in_refresh_token_days: number
  path_refresh_token: string
}

export const authConfig = {
  httpSecure: process.env.HTTP_SECURE || false,
  secret_token: process.env.SECRET_TOKEN || 'secret_token',
  expires_in_token: '10s',
  secret_refresh_token:
    process.env.SECRET_REFRESH_TOKEN || 'secret_refresh_token',
  expires_in_refresh_token: '30d',
  expires_in_refresh_token_days: 30,
  path_refresh_token: '/sessions/refresh-token',
} as IAuthConfig
