export interface Environment {
  apiKey: string,
  production: boolean,
  fbDbUrl: string
}

export interface FbAuthResponse {
  idToken: string,
  expiresIn: string
}
