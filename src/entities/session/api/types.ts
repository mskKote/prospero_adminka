export type SessionDto = {
  token: string
  expire: string
}

export type RequestLoginBody = {
  username: string
  password: string
}

export type AdminDto = {
  user_id: string
  name: string
}
