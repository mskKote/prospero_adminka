export type Session = {
  token: string
  userId: string
  expire: string
}

// TODO: FSD: Move user to entities/user/model/types.ts
export type Admin = {
  user_id: string
  name: string
}
