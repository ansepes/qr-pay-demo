<template>
  <v-container>
    <v-row>
      <VQrReader
        @onDecode="onDecode"
        @onDisableCameraSwitch="onDisableCameraSwitch"
        :camera-enable="cameraEnable"
        :camera-rear-front="cameraRearFront"
      />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { qrReaderStoreModule } from '@/store/modules/qrReaderStore'

const VQrReader = () => import(/* webpackChunkName: "vQrReader" */ '@/components/VQrReader.vue')

@Component({
  components: {
    VQrReader,
  },
})
export default class QrReader extends Vue {
  get cameraEnable() {
    return qrReaderStoreModule.cameraEnable
  }

  get cameraRearFront() {
    return qrReaderStoreModule.cameraRearFront
  }

  async onDecode(result: string) {
    if (this.isValidReadValue(result)) {
      qrReaderStoreModule.updateResult(result)
    }
  }

  onDisableCameraSwitch() {
    qrReaderStoreModule.setShowCameraSwitch(false)
  }

  private isValidReadValue(result: string) {
    if (!result || result === '') return false
    return true
  }
}
</script>

<style scoped>
.v-text-field {
  width: 250px;
  flex: none;
}
</style>
