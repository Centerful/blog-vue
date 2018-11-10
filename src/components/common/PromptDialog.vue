<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="flag"
      :persistent="persistent" 
      :max-width="maxWidth">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          {{ title }}
        </v-card-title>
        <v-card-text>
          {{ content }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="closeEvent">
            {{ btnText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: false,
      title: '提 示',
      maxWidth: 500,
      content: '',
      persistent: false,
      btnText: '确 定',
      close: null
    }
  },
  mounted () {
    this.$bus.on('prompt', this.open)
  },
  methods: {
    open (content, title, btnText, persistent, maxWidth) {
      this.flag = true
      this.persistent = persistent || this.persistent
      this.maxWidth = maxWidth || this.maxWidth
      this.title= title || this.title
      this.btnText= btnText || this.btnText
      this.content= content
    },
    closeEvent () {
      this.flag = false
      this.title = '提 示'
      this.maxWidth = 500
      this.content = ''
      this.persistent = false
      this.btnText = '确 定'
      if (this.close) {
        this.close()
      }
      this.close = null
    }
  }
}
</script>
