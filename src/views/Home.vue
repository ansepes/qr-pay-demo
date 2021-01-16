<template>
  <div class="mt-5">
    <!-- <v-btn color="primary" @click="handleClick">
      テスト
    </v-btn> -->
    <v-container>
      <v-row class="ml-1" style="height: 20px">
        <p class="body-1">
          利用QRコードを読み込んでください。
        </p>
      </v-row>
      <v-row class="ml-1" style="height: 40px">
        <v-col class="text-right">
          <v-btn icon color="grey" @click="handleSwitchCameraClick" v-show="showCameraSwitchBtn">
            <!-- <v-icon>mdi-camera-switch</v-icon> -->
            <v-icon>{{ cameraSwitchBtnIcon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
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

  get showCameraSwitchBtn() {
    return qrReaderStoreModule.getShowCameraSwitch
  }

  get cameraSwitchBtnIcon() {
    if (qrReaderStoreModule.getReverseCameraState) {
      return 'mdi-camera-front-variant'
    } else {
      return 'mdi-camera-rear-variant'
    }
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

  handleSwitchCameraClick() {
    qrReaderStoreModule.reverseCamera()
  }
}
</script>
