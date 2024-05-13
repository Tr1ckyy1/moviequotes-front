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

export type UserData = {
  username?: string
  password?: string
  password_confirmation?: string
  profile_image?: File
}

export type Toast = {
  open: boolean
  text: string
  mode: string
}

export type Movie = {
  // url: string
  title: string
  year: string | number
  totalQuotes: string | number
}
