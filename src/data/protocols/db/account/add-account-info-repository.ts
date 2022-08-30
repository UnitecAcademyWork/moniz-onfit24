import { AccountInfoModel } from '@/domain/models/account'
import { AddAccountInfoModel } from '@/domain/usecases/account/add-account'

export interface AddAccountInfoRepository {
  addAccountInfo: (accountInfoData: AddAccountInfoModel) => Promise<AccountInfoModel>
}
