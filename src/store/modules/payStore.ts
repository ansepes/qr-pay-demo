import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'
// import moment from 'moment'

// import types
import { IPayState, IPayDialogState, IQRUserState } from '@/store/types'

// repository
// import { QRUsersRepo } from '@/api/modules/qrusersRepo'
// import { QRAmountRepo } from '@/api/modules/qramountRepo'
// import { ISearchQRUserCriteria, IQRAmountValue } from '@/api/types'
import { StringUtil } from '@/basic/utils/stringUtil'

@Module({ dynamic: true, store, name: 'payStr', namespaced: true })
class PayStore extends VuexModule implements IPayState {
  dialogState: IPayDialogState = {
    isShown: false,
  }

  amount = 0
  user: IQRUserState = {
    userId: '',
    name: '',
    yearMonth: '',
    payLimitDay: '',
    totalAmount: 0,
  }

  // getter
  public get getDialogState() {
    return this.dialogState
  }

  public get getAmount() {
    return this.amount
  }

  public get getUser() {
    return this.user
  }

  // mutations
  @Mutation
  SET_DIALOG_STATE_SHOWN(value: boolean) {
    this.dialogState.isShown = value
  }

  @Mutation
  SET_AMOUNT(amount: number) {
    this.amount = amount
  }

  @Mutation
  SET_QRUSER(user: IQRUserState) {
    this.user = user
  }

  // actions
  @Action
  async showDialog(userId: string) {
    await this.fetchQRUser(userId)
    this.resetAmount()
    this.SET_DIALOG_STATE_SHOWN(true)
  }

  @Action
  closeDialog() {
    this.SET_DIALOG_STATE_SHOWN(false)
  }

  @Action
  setAmount(amount: number) {
    this.SET_AMOUNT(amount)
  }

  @Action
  resetAmount() {
    this.SET_AMOUNT(0)
  }

  @Action
  async fetchQRUser(userId: string) {
    // const criteria: ISearchQRUserCriteria = {
    //   userId,
    //   yearMonth: moment().format('YYYY-MM'),
    // }
    // const { hasError, data } = await QRUsersRepo.get(criteria)
    // if (hasError) return

    const data = {
      userId,
      name: '山田 太郎',
      yearMonth: '2021-01',
      payLimitDay: '2021-02-12',
      totalAmount: 300,
    }

    const user = {
      userId: data.userId,
      name: data.name,
      yearMonth: data.yearMonth,
      payLimitDay: data.payLimitDay,
      totalAmount: data.totalAmount,
    }

    this.SET_QRUSER(user)
  }

  @Action
  async registerAmount() {
    if (StringUtil.isEmpty(this.getUser.userId)) return

    // const userId = this.getUser.userId ?? ''
    // const param: IQRAmountValue = {
    //   userId,
    //   yearMonth: moment().format('YYYY-MM'),
    //   amount: this.getAmount,
    // }

    // const { hasError } = await QRAmountRepo.post(param)
    // return hasError

    return false
  }
}

export const payStoreModule = getModule(PayStore)
