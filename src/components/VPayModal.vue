<template>
  <div>
    <v-container fluid ma-0 pa-0 fill-height>
      <v-dialog
        v-model="dialogShown"
        fullscreen
        fill-height
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-stepper v-model="pageNum" non-linear style="height: 100%;">
          <v-stepper-header>
            <v-toolbar-title class="title ml-5 mt-5">
              <h2>お支払</h2>
            </v-toolbar-title>
          </v-stepper-header>
          <!-- <v-stepper-content step="1"></v-stepper-content> -->
          <!-- 登録確認画面 -->
          <v-stepper-content step="1">
            <v-card>
              <v-container>
                <v-row class="mt-1" justify="center" style="height: 30px;" dense>
                  <v-col md="6">
                    <h3>■ ご利用者</h3>
                  </v-col>
                </v-row>
                <v-row justify="center" dense>
                  <v-col md="6">
                    <p class="subtitle-1">{{ userName }} さん</p>
                  </v-col>
                </v-row>
                <v-row justify="center" dense>
                  <v-col md="6">
                    <h3>■ ご利用金額を入力</h3>
                  </v-col>
                </v-row>
                <v-row justify="center" style="height: 20px;" dense>
                  <v-col md="6">
                    <p class="body-2">
                      （現在の{{ useMonth }}月利用合計金額： {{ monthlyTotal | payFormat }}）
                    </p>
                  </v-col>
                </v-row>
              </v-container>
              <PayEditor
                :max-length="AMOUNT_MAX_LENGTH"
                :error-message="validateAmount"
                :row-height="breakPoint.rowHeight"
              />
              <v-divider />
              <v-card-actions>
                <v-container>
                  <v-row justify="center" :style="`height: ${breakPoint.rowHeight};`" dense>
                    <v-col md="6">
                      <v-btn
                        color="accent"
                        block
                        outlined
                        height="100%"
                        @click="pageNum = 2"
                        :disabled="payBtnDisable"
                      >
                        次へ
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row justify="center" :style="`height: ${breakPoint.rowHeight};`" dense>
                    <v-col md="6">
                      <v-btn outlined block height="100%" @click="handleOnClose">
                        戻る
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card>
              <v-container>
                <v-row justify="center" style="height: 40px;" dense>
                  <v-col md="6">
                    <h3 class="mt-3">■ 今回ご利用金額</h3>
                  </v-col>
                </v-row>
                <v-row justify="center" style="height: 40px;" dense>
                  <v-col md="6" class="text-center">
                    <span class="display-1">{{ amount | payFormat }}</span>
                  </v-col>
                </v-row>
                <v-row class="mt-1" justify="center" style="height: 30px;" dense>
                  <v-col md="6">
                    <h3>■ ご利用者</h3>
                  </v-col>
                </v-row>
                <v-row justify="center" dense>
                  <v-col md="6">
                    <span class="subtitle-1">{{ userName }} さん</span>
                  </v-col>
                </v-row>
                <v-row justify="center" style="height: 30px;" dense>
                  <v-col md="6">
                    <h3 class="mt-3">■ お支払後の{{ useMonth }}月利用合計金額</h3>
                  </v-col>
                </v-row>
                <v-row class="mt-1" justify="center" style="height: 30px;" dense>
                  <v-col md="6">
                    <span class="subtitle-1">{{ payedTotalAmount | payFormat }}</span>
                  </v-col>
                </v-row>
                <v-row justify="center" style="height: 30px;" dense>
                  <v-col md="6">
                    <h3 class="mt-3">■ {{ useMonth }}月分のお支払期限</h3>
                  </v-col>
                </v-row>
                <v-row class="mt-1" justify="center" style="height: 60px;" dense>
                  <v-col md="6">
                    <span class="subtitle-1">{{ payLimitDay }}</span>
                    <br />
                    <span class="caption">※毎月1日に前月合計金額をメールでご連絡します。</span>
                  </v-col>
                </v-row>
              </v-container>
              <v-divider />
              <v-card-actions>
                <v-container>
                  <v-row justify="center" :style="`height: ${breakPoint.rowHeight};`" dense>
                    <v-col md="6">
                      <v-btn color="accent" block height="100%" @click="handleOnRegister">
                        支払う
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row justify="center" :style="`height: ${breakPoint.rowHeight};`" dense>
                    <v-col md="6">
                      <v-btn outlined block height="100%" @click="pageNum = 1">
                        戻る
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <!-- 対象者なし画面 -->
          <v-stepper-content step="99">
            <v-card>
              <v-container>
                <v-row
                  class="mt-1"
                  justify="center"
                  :style="`height: ${breakPoint.rowHeight};`"
                  dense
                >
                  <v-col md="6">
                    <p class="subtitle-1">利用者が見つかりませんでした。</p>
                  </v-col>
                </v-row>
                <v-row class="mt-1" justify="center" style="height: 30px;" dense>
                  <v-col md="6">
                    <v-spacer></v-spacer>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
            <v-divider />
            <v-card-actions>
              <v-container>
                <v-row justify="center" style="height: 40px;" dense>
                  <v-col md="6">
                    <v-btn outlined block @click="handleOnClose">
                      閉じる
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-stepper-content>
        </v-stepper>
      </v-dialog>
    </v-container>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import { payEditorStoreModule } from '@/store/modules/payEditorStore'
import { StringUtil } from '@/basic/utils/stringUtil'

const PayEditor = () => import(/* webpackChunkName: "payEditor" */ '@/container/PayEditor.vue')

@Component({
  components: {
    PayEditor,
  },
  filters: {
    payFormat: (value: string) => {
      const formatValue = StringUtil.numberCommaSeparate(value)
      return `${formatValue} 円`
    },
  },
})
export default class VPayModal extends Vue {
  AMOUNT_UNIT = 50
  AMOUNT_MAX_LENGTH = 4
  pageNum: number = 1

  // props
  @Prop({
    default: false,
  })
  dialogShown!: boolean

  @Prop({
    default: 0,
  })
  monthlyTotal!: number

  @Prop({
    default: '',
  })
  userName!: string

  @Prop({
    default: '',
  })
  payLimitDay!: string

  @Prop({
    default: '',
  })
  useMonth!: string

  // getter
  get breakPoint() {
    const point = {
      name: this.$vuetify.breakpoint.name,
      rowHeight: '55px',
    }

    if (point.name === 'xs') {
      point.rowHeight = '40px'
    }

    return point
  }

  get amount() {
    return payEditorStoreModule.value
  }

  get amountNum() {
    if (!StringUtil.isNumber(this.amount)) return 0
    return Number(this.amount)
  }

  get payedTotalAmount() {
    return Number(this.monthlyTotal) + Number(this.amountNum)
  }

  get payBtnDisable() {
    if (StringUtil.isEmpty(this.validateAmount)) return false
    return true
  }

  get validateAmount() {
    if (StringUtil.isEmpty(this.amount)) {
      return 'ご利用金額を入力してください。'
    }

    if (this.amountNum % this.AMOUNT_UNIT !== 0) {
      return `ご利用金額は${this.AMOUNT_UNIT}円単位で入力してください。`
    }

    return ''
  }

  // emits
  @Emit('onClose')
  handleOnClose() {}

  @Emit('onRegister')
  handleOnRegister() {
    return this.amountNum
  }

  // watch
  @Watch('dialogShown')
  onDialogShownChange(to: boolean) {
    if (to) {
      this.initForm()
    }
  }

  initForm() {
    if (StringUtil.isEmpty(this.userName)) {
      this.pageNum = 99
    } else {
      this.pageNum = 1
    }

    payEditorStoreModule.clearValue()
  }
}
</script>
