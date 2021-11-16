export interface IUser {
  id: string
  name: string
  email: string
  driver_license: string
  avatar?: string
  password: string
  admin?: boolean
  created_at: Date
  updated_at: Date
}
