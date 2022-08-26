import { AccountInfoModel } from '@/domain/models/account'
import { AddAccountInfoModel } from '@/domain/usecases/add-account'

export interface AddAccountInfoRepository {
  addAccountInfo: (accountInfoData: AddAccountInfoModel) => Promise<AccountInfoModel>
}
