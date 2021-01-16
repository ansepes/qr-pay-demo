import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'

// import types
import { IQrReaderState } from '@/store/types'

@Module({ dynamic: true, store, name: 'qrReaderStr', namespaced: true })
class QrReaderStore extends VuexModule implements IQrReaderState {
  RESULT_NONE = ''
  result: string = ''
  cameraEnable: boolean = true
  cameraRearFront = true
  showCameraSwitch = true

  get getResult() {
    return this.result
  }

  get getCameraEnable() {
    return this.cameraEnable
  }

  get getReverseCameraState() {
    return this.cameraRearFront
  }

  get getShowCameraSwitch() {
    return this.showCameraSwitch
  }

  // mutation
  @Mutation
  SET_RESULT(result: string) {
    this.result = result
  }

  @Mutation
  SET_CAMERA_ENABLE(cameraEnable: boolean) {
    this.cameraEnable = cameraEnable
  }

  @Mutation
  SET_CAMERA_REAR_FRONT(cameraRearFront: boolean) {
    this.cameraRearFront = cameraRearFront
  }

  @Mutation
  SET_SHOW_CAMERA_SWITCH(showCameraSwitch: boolean) {
    this.showCameraSwitch = showCameraSwitch
  }

  @Action({ rawError: true })
  updateResult(result: string) {
    this.SET_RESULT(result)
  }

  @Action({ rawError: true })
  changeCameraEnable() {
    this.SET_CAMERA_ENABLE(true)
  }

  @Action({ rawError: true })
  changeCameraDisable() {
    this.SET_CAMERA_ENABLE(false)
  }

  @Action({ rawError: true })
  resetCamera() {
    this.resetResult()
    this.changeCameraEnable()
  }

  @Action({ rawError: true })
  resetResult() {
    this.SET_RESULT(this.RESULT_NONE)
  }

  @Action({ rawError: true })
  reverseCamera() {
    this.SET_CAMERA_REAR_FRONT(!this.cameraRearFront)
  }

  @Action({ rawError: true })
  setShowCameraSwitch(showCameraSwitch: boolean) {
    this.SET_SHOW_CAMERA_SWITCH(showCameraSwitch)
  }
}

export const qrReaderStoreModule = getModule(QrReaderStore)
