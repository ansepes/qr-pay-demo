<template>
  <v-container fluid ma-0 pa-0 fill-height>
    <v-row>
      <span class="errMsg">{{ error }}</span>
      <QrcodeStream :camera="camera" @decode="handleOnDecode" @init="onInit" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator'
const { QrcodeStream } = require('vue-qrcode-reader')

@Component({
  components: {
    QrcodeStream,
  },
})
export default class VQrReader extends Vue {
  CAMERA_AUTO = 'auto'
  CAMERA_REAR = 'rear'
  CAMERA_FRONT = 'front'
  CAMERA_DISABLEA = 'off'
  error: string = ''
  camera: string = 'rear'
  defaultCamera = 'rear'

  @Prop({
    default: true,
  })
  cameraEnable!: boolean

  @Prop({
    default: true,
  })
  cameraRearFront!: boolean

  // emits
  @Emit('onDecode')
  handleOnDecode(result: string) {
    return result
  }

  @Emit('onDisableCameraSwitch')
  onDisableCameraSwitch() {}

  // methods
  async onInit(promise: Promise<any>) {
    try {
      await promise
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        this.error = 'ERROR: カメラへのアクセス権限がありませんでした。'
      } else if (error.name === 'NotFoundError') {
        this.error = 'ERROR: カメラが見つかりませんでした。'
      } else if (error.name === 'NotSupportedError') {
        this.error = 'ERROR: secure context required (HTTPS, localhost)'
      } else if (error.name === 'NotReadableError') {
        this.error = 'ERROR: is the camera already in use?'
      } else if (error.name === 'OverconstrainedError') {
        // this.error = 'ERROR: installed cameras are not suitable'
        this.onDisableCameraSwitch()
        this.camera = this.CAMERA_AUTO
        this.defaultCamera = this.CAMERA_AUTO
      } else if (error.name === 'StreamApiNotSupportedError') {
        this.error = 'ERROR: このブラウザはカメラが使用できません。'
      }
    }
  }

  // watcher
  @Watch('cameraEnable')
  onChangeCameraEnable(to: boolean) {
    if (to) {
      this.camera = this.defaultCamera
    } else {
      this.camera = this.CAMERA_DISABLEA
    }
  }

  @Watch('cameraRearFront')
  onChangeCameraRearFront() {
    if (this.defaultCamera === this.CAMERA_REAR) {
      this.defaultCamera = this.CAMERA_FRONT
    } else {
      this.defaultCamera = this.CAMERA_REAR
    }
    this.camera = this.defaultCamera
  }
}
</script>

<style scoped>
.errMsg {
  color: red;
}
</style>
