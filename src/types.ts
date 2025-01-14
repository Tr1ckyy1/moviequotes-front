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
  user: string
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

export type User = {
  id: number | null
  username: string
  email: string
  google_id: string | null
  profile_image: string | undefined
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
  quotes: number | QuotesData[]
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

export type Comment = {
  id: number
  user: User
  comment: string
}

export type Like = {
  id: number
  user_id: number
}

export type Quote = {
  quote: { [key in Language]: string }
  image: string | File
  movie: number
}

export type QuotesData = {
  id: number
  quote: {
    en: string
    ka: string
  }
  image: string
  user: User
  comments: Comment[]
  movie: MovieData
  likes: Like[]
}

export type BroadcastLike = {
  data: {
    quote_id: number
    like_id?: number
    like?: Like
  }
}

export type BroadcastComment = {
  data: {
    quote_id: number
    comment: Comment
  }
}

export type Notification = {
  id: number
  quote_id: number
  type: string
  user_from: User
  read_at: Date | null
  created_at: Date
}

export type Language = 'en' | 'ka'

declare global {
  interface Window {
    Echo: any
    Pusher: any
  }
}
