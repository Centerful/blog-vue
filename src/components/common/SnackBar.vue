<template>
  <v-snackbar
    v-model="flag"
    :timeout="timeout"
    :color="color"
    :left="x === 'left'"
    :right="x === 'right'"
    :top="y === 'top'"
    :bottom="y === 'bottom'"
    :multi-line="mode === 'multi-line'"
    :vertical="mode === 'vertical'">
    {{ content }}
    <v-btn dark flat @click="closeEvent"> {{ btnText }} </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      flag: false,
      btnText: '关 闭',
      close: null,
      timeout: 3000,
      content: '',
      x: '',
      y: 'top',
      mode: '',
      color: 'info' // SUCCESS,INFO,ERROR
    }
  },
  mounted () {
    this.$bus.on('snack', this.open)
  },
  methods: {
    open (data = { btnText, close, timeout, content, x, y, mode, color }) {
      this.flag = true
      this.btnText = data.btnText || this.btnText
      this.close = data.close || this.close
      this.timeout = data.timeout || this.timeout
      this.content = data.content || this.content
      this.x = data.x || this.x
      this.y = data.y || this.y
      this.mode = data.mode || this.mode
      this.color = (data.color || this.color).toLowerCase()
    },
    closeEvent () {
      this.flag = false
      if (this.close) {
        this.close()
      }
      this.btnText = '关 闭'
      this.close = null
      this.timeout = 6000
      this.content = ''
      this.x = ''
      this.y = 'top'
      this.mode = ''
      this.color = 'info'
    }
  }
}
</script>