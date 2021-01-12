import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'

// import types
import { IPayEditorState } from '@/store/types'

@Module({ dynamic: true, store, name: 'payEditorStr', namespaced: true })
class PayEditorStore extends VuexModule implements IPayEditorState {
  value: string = ''

  // getter
  public get getValue() {
    return this.value
  }

  // mutations
  @Mutation
  SET_VALUE(value: string) {
    this.value = value
  }

  // actions
  @Action
  setValue(value: string) {
    this.SET_VALUE(value)
  }

  @Action
  clearValue() {
    this.SET_VALUE('')
  }
}

export const payEditorStoreModule = getModule(PayEditorStore)
