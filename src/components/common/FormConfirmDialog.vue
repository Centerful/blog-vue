<template>
  <!-- 将父组件的v-model继续传递到v-dialog组件中 -->
  <v-dialog v-model="value" :persistent="persistent" :max-width="maxWidth">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>{{title}}</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <slot></slot>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click.native="cancelEvent">{{cancelText}}</v-btn>
        <v-btn color="primary" @click.native="confirmEvent" :disabled="!valid">{{confirmText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: Number,
      default: 360
    },
    persistent: {
      type: Boolean,
      default: true
    },
    title: String,
    confirmText: {
      type: String,
      default: '确 认'
    },
    cancelText: {
      type: String,
      default: '取 消'
    },
    confirm: Function,
    cancel: Function
  },
  model: {
    value: 'value',
    event: 'update'
  },
  data () {
    return {
      valid: false
    }
  },
  methods: {
    cancelEvent () {
      this.$emit('update', false)
      if (this.cancel) {
        this.cancel()
      }
    },
    confirmEvent () {
      if (!this.$refs.form.validate()) {
        return 
      }
      this.$emit('update', false)
      if (this.confirm) {
        this.confirm()
      }
    }
  }
}
</script>
