export interface LoginRequestModel {
  email?: string
  password?: string
}

export interface LoginResponseModel {
  accessToken?: string
  user?: UserModel
}

export interface UserModel {
  id?: string,
  name?: string,
  email?: string,
  phone?: string,
  address?: string,
  role?: string,
}