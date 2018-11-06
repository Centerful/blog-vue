<template>
  <div id="app">
    <v-app>
      <router-view/>  
    </v-app> 
    <div class="text-xs-center">
      <v-dialog
        v-model="dialog"
        width="500">
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title>
            {{ title }}
          </v-card-title>
          <v-card-text>
            {{ msg }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="close">
              {{ btnText }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      msg: '',
      title: '通 知',
      dialog: false,
      btnText: '确 定'
    }
  },
  mounted () {
    this.eventListener()
  },
  methods: {
    eventListener () {
      // 监听自定义事件
      this.$bus.on('dialog', this.open)
    },
    open (msg, title, btnText) {
      this.title= title || '通 知'
      this.btnText= btnText || '确 定'
      this.dialog = true
      this.msg= msg
    },
    close () {
      this.title= '通 知'
      this.btnText= '确 定'
      this.dialog = false
      this.msg= ''
    }
  }
}
</script>
