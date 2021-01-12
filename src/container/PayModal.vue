<template>
  <div>
    <VPayModal
      :dialog-shown="isShown"
      :monthly-total="monthlyTotal"
      :user-name="userName"
      :pay-limit-day="payLimitDay"
      :use-month="useMonth"
      @onClose="onClose"
      @onRegister="onRegister"
    />
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { Vue, Component, Watch } from 'vue-property-decorator'
import { payStoreModule } from '@/store/modules/payStore'
import { modalStoreModule } from '@/store/modules/modalStore'
import { StringUtil } from '@/basic/utils/stringUtil'
const audio = new Audio(require('@/assets/sounds/pay.mp3'))

const VPayModal = () => import(/* webpackChunkName: "vPayModal" */ '@/components/VPayModal.vue')
@Component({
  components: {
    VPayModal,
  },
})
export default class PayModal extends Vue {
  get isShown() {
    return payStoreModule.getDialogState.isShown
  }

  get monthlyTotal() {
    if (!payStoreModule.user.totalAmount) return 0
    return payStoreModule.user.totalAmount
  }

  get userName() {
    return `(${payStoreModule.user.userId})${payStoreModule.user.name}`
  }

  get payLimitDay() {
    if (StringUtil.isEmpty(payStoreModule.user.payLimitDay)) return ''
    return moment(payStoreModule.user.payLimitDay).format('YYYY年MM月DD日')
  }

  get useMonth() {
    return moment().format('M')
  }

  onClose() {
    payStoreModule.resetAmount()
    this.closeDialog()
  }

  async onRegister(amount: number) {
    payStoreModule.setAmount(amount)
    // 登録API呼出し
    const hasError = await payStoreModule.registerAmount()
    if (hasError) return

    // const audio = new Audio(require('@/assets/sounds/pay.mp3'))
    audio.muted = false
    audio.play()

    await modalStoreModule.openInfoModal({
      title: '支払い登録完了',
      message: '支払い登録が完了しました。',
    })

    this.closeDialog()
  }

  closeDialog() {
    payStoreModule.closeDialog()
  }

  @Watch('isShown')
  onChangeIsShown(to: any) {
    if (to) {
      // audioの先行読み込み
      audio.muted = true
      audio.autoplay = true
    }
  }
}
</script>
