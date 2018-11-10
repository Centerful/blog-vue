<template>
  <!-- 将父组件的v-model继续传递到v-dialog组件中 -->
  <v-dialog v-model="flag" :persistent="persistent" :max-width="maxWidth">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>{{title}}</v-card-title>
      <v-card-text>{{content}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click.native="cancelEvent">{{cancelText}}</v-btn>
        <v-btn color="green darken-1" flat @click.native="confirmEvent">{{confirmText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      flag: false,
      maxWidth: 360,
      persistent: true,
      title: '操作确认',
      content: '是否进行此操作？',
      confirmText: '确 认',
      cancelText: '取 消',
      confirm: null,
      cancel: null
    }
  },
  mounted () {
    this.$bus.on('confirm', this.open)
  },
  methods: {
    open (data = {maxWidth, persistent, title, content, confirmText, cancelText, confirm, cancel }) {
      this.flag = true
      this.maxWidth = data.maxWidth || this.maxWidth
      this.persistent = data.persistent || this.persistent
      this.title = data.title || this.title
      this.content = data.content || this.content
      this.confirmText = data.confirmText || this.confirmText
      this.cancelText = data.cancelText || this.cancelText
      this.confirm = data.confirm || this.confirm
      this.cancel = data.cancel || this.cancel
    },
    cancelEvent () {
      this.flag = false
      if (this.cancel) {
        this.cancel()
      }
      this.maxWidth = 360
      this.persistent = true
      this.title = '操作确认'
      this.content = '是否进行此操作？'
      this.confirmText = '确 认'
      this.cancelText = '取 消'
      this.confirm = null
      this.cancel = null
    },
    confirmEvent () {
      this.flag = false
      if (this.confirm) {
        this.confirm()
      }
    }
  }
}
</script>
