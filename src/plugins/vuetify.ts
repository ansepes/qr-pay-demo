import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.brown.darken1,
        secondary: colors.brown.lighten4,
        accent: colors.lightBlue.accent2,
      },
    },
  },
})
