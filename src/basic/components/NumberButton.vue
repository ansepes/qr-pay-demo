<template>
  <v-btn block outlined height="100%" @click="handleOnClick(num)">
    {{ num }}
  </v-btn>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component({})
export default class NumberButton extends Vue {
  // props
  @Prop({
    default: 0,
  })
  num!: number

  @Emit('onClick')
  handleOnClick(num: number) {
    return num
  }
}
</script>
