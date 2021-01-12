<template>
  <v-app>
    <div>
      <Modal></Modal>
      <Loading></Loading>
      <Routing></Routing>
    </div>

    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="headline" @click="toHome()">
        <span>Coffe Pay</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <v-content>
      <v-footer color="primary" dark absolute>
        <v-col class="text-center caption"
          ><span>Copyright (C) XXXXX Corporation Inc. All Right Reserved.</span></v-col
        >
      </v-footer>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import HelloWorld from './components/HelloWorld.vue'
import Modal from '@/basic/components/Modal.vue'
import Loading from '@/basic/components/Loading.vue'
import Routing from '@/basic/components/Routing.vue'
import { loadingStoreModule } from '@/store/modules/loadingStore'

@Component({
  components: {
    Loading,
    Modal,
    Routing,
  },
})
export default class App extends Vue {
  // getter
  get loading() {
    return loadingStoreModule.getLoading
  }

  // methods
  toHome() {
    if (this.$router.currentRoute.path !== '/') {
      this.$router.push('/')
    }
  }
}
</script>
