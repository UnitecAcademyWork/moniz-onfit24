export interface Encrypter {
  encrypt: (value: string, accountDetails: boolean) => Promise<string>
}
