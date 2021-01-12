<template>
  <v-container>
    <v-row justify="center" style="height: 50px;" dense>
      <v-col md="6">
        <v-card
          class="input-value pa-1 text-right headline"
          outlined
          style="border-color: #40C4FF; border-width: medium;"
        >
          {{ value | payFormat }}
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" style="height: 30px;" dense>
      <v-col md="6" class="text-right">
        <span class="body-2" style="color: red;">{{ errorMessage }}</span>
      </v-col>
    </v-row>
    <v-row justify="center" :style="`height: ${rowHeight};`" dense>
      <v-col v-for="num in [1, 2, 3]" :key="num" md="2">
        <NumberButton :num="num" @onClick="handleNumClick" />
      </v-col>
    </v-row>
    <v-row justify="center" :style="`height: ${rowHeight};`" dense>
      <v-col v-for="num in [4, 5, 6]" :key="num" md="2">
        <NumberButton :num="num" @onClick="handleNumClick" />
      </v-col>
    </v-row>
    <v-row justify="center" :style="`height: ${rowHeight};`" dense>
      <v-col v-for="num in [7, 8, 9]" :key="num" md="2">
        <NumberButton :num="num" @onClick="handleNumClick" />
      </v-col>
    </v-row>
    <v-row justify="center" :style="`height: ${rowHeight};`" dense>
      <v-col md="2"><v-spacer></v-spacer></v-col>
      <v-col md="2"><NumberButton :num="0" @onClick="handleNumClick"/></v-col>
      <v-col md="2">
        <v-btn block depressed color="grey lighten-1" height="100%" @click="handleDelClick">
          <v-icon>mdi-arrow-left-bold-box-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { payEditorStoreModule } from '@/store/modules/payEditorStore'
import { StringUtil } from '@/basic/utils/stringUtil'
const NumberButton = () =>
  import(/* webpackChunkName: "numberButton" */ '@/basic/components/NumberButton.vue')

@Component({
  components: {
    NumberButton,
  },
  filters: {
    payFormat: (value: string) => {
      const formatValue = StringUtil.numberCommaSeparate(value)
      return `${formatValue} 円`
    },
  },
})
export default class PayEditor extends Vue {
  @Prop({
    default: 99,
  })
  maxLength!: number

  @Prop({
    default: '',
  })
  errorMessage!: string

  @Prop({
    default: 'auto',
  })
  rowHeight!: string

  get breakPoint() {
    const point = {
      name: this.$vuetify.breakpoint.name,
      rowHeight: '50px',
    }

    if (point.name === 'xs') {
      point.rowHeight = '40px'
    }

    return point
  }

  get value() {
    return payEditorStoreModule.value
  }

  // handler
  handleNumClick(num: number) {
    if (this.value.length >= this.maxLength) return
    if (StringUtil.isEmpty(this.value) && num === 0) return

    payEditorStoreModule.setValue(`${this.value}${num}`)
  }

  handleDelClick() {
    if (StringUtil.isEmpty(this.value)) return

    payEditorStoreModule.setValue(this.value.slice(0, -1))
  }
}
</script>
