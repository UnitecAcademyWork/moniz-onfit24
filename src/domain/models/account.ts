export interface AccountModel {
  id: string
  name: string
  email: string
  password: string
  accessToken?: string
  role?: string
}

export interface AccountDetailsModel {
  id: string
  accountId: string
  birth: string
  weight: string
  height: string
  gender: string
  objective: string
}
