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

export type Category = {
  id: number
  name: {
    en: string
    ka: string
  }
}

export type Movies = {
  id: number
  description: { [key in Language]: string }
  director: { [key in Language]: string }
  name: { [key in Language]: string }
  quotes: number
  year: number
  image: string
  categories: Category[]
}

export type MovieData = {
  description: {
    en: string
    ka: string
  }
  director: {
    en: string
    ka: string
  }
  name: {
    en: string
    ka: string
  }
  categories: number[]
  image: File
  year: number
}

export type Language = 'en' | 'ka'
