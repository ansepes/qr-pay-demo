import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'

// import types
import { IQrReaderState } from '@/store/types'

@Module({ dynamic: true, store, name: 'qrReaderStr', namespaced: true })
class QrReaderStore extends VuexModule implements IQrReaderState {
  RESULT_NONE = ''
  result: string = ''
  cameraEnable: boolean = true

  get getResult() {
    return this.result
  }

  get getCameraEnable() {
    return this.cameraEnable
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
}

export const qrReaderStoreModule = getModule(QrReaderStore)
