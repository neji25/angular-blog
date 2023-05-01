export interface Environment {
  apiKey: string,
  production: boolean
}

export interface FbAuthResponse {
  idToken: string,
  expiresIn: string
}
