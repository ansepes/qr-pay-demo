<template>
  <div>
    <v-text-field ref="count" label="カウント" type="number" v-model="count" max="999" min="1" />
  </div>
</template>

<script>
// import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
// @Component({})
// export default class NumberTextField extends Vue {
//   @Prop({
//     default: '0',
//   })
//   _value!: string

//   get value() {
//     return this._value
//   }

//   set value(value: string) {
//     // this._value = value
//     // this.onValueChange(value)
//     this.$refs.value.lazyValue = value
//   }

//   @Emit('onValueChange')
//   onValueChange(value: string) {
//     return value
//   }
// }
export default {
  computed: {
    count: {
      get() {
        return this.$store.getters.count
      },
      set(num) {
        if (!this.isValue(num)) {
          num = 50
        }

        this.$refs.count.lazyValue = num
      },
    },
  },
  methods: {
    isValue(value) {
      if (value === undefined) return true
      if (value === '') return true
      const num = parseInt(value)
      if (Number.isNaN(num) || num < 1) {
        return false
      }
      return true
    },
  },
}
</script>
