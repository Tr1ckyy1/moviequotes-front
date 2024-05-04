export type Signup = {
  username: string
  email: string
  password: string
  password_confirmation: string
}
export type Queries = {
  id: string
  hash?: string
  expires: string
  signature?: string
}

export type Login = {
  email: string
  password: string
}

export type ResetPassword = {
  password: string
  password_confirmation: string
  token: string
  email: string
}

export type TokenValidity = {
  email: string
  token: string
}
