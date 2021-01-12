<template>
  <div class="mt-5">
    <p class="body-1 ml-3">
      利用QRコードを読み込んでください。
    </p>
    <!-- <v-btn color="primary" @click="handleClick">
      テスト
    </v-btn> -->
    <v-container>
      <v-row class="text-center ml-3">
        <QrReader />
      </v-row>
      <v-row>
        <PayModal />
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { qrReaderStoreModule } from '@/store/modules/qrReaderStore'
import { payStoreModule } from '@/store/modules/payStore'
import { StringUtil } from '@/basic/utils/stringUtil'

const QrReader = () => import(/* webpackChunkName: "qrReader" */ '@/container/QrReader.vue')
const PayModal = () => import(/* webpackChunkName: "payModal" */ '@/container/PayModal.vue')
@Component({
  components: {
    QrReader,
    PayModal,
  },
})
export default class Home extends Vue {
  get readedQrValue() {
    return qrReaderStoreModule.result
  }

  get payModalShown() {
    return payStoreModule.dialogState.isShown
  }

  get inputAmount() {
    return payStoreModule.amount
  }

  // watch
  @Watch('readedQrValue')
  async onChangeReadedQrValue(to: any) {
    const userId: string = to

    if (!StringUtil.isEmpty(userId)) {
      // console.log(`onChangeReadedQrValue: ${to}`)
      qrReaderStoreModule.changeCameraDisable()
      await payStoreModule.showDialog(userId)
    }
  }

  @Watch('payModalShown')
  onPayModalShown(to: any) {
    if (!to) {
      // console.log(`closePayModal`)
      qrReaderStoreModule.resetCamera()
    }
  }

  // debug
  handleClick() {
    this.onChangeReadedQrValue('dc728066-a350-49d6-ac44-80af742036dc')
  }
}
</script>
