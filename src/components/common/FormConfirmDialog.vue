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
        <v-btn flat @click.native="_cancelEvent">{{cancelText}}</v-btn>
        <v-btn color="primary" @click.native="_confirmEvent" :disabled="!valid">{{confirmText}}</v-btn>
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
    autoClear: {
      type: Boolean,
      default: false
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
    // 表单参数传递。
    params: Object,
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
    clearForm () {
      this.$refs.form.reset()
    },
    _cancelEvent () {
      this.$emit('update', false)
      if (this.cancel) {
        this.cancel()
      }
      if (this.autoClear) {
        this.$refs.form.reset()
      }
    },
    _confirmEvent () {
      if (!this.$refs.form.validate()) {
        return 
      }
      this.$emit('update', false)
      if (this.confirm) {
        this.confirm(this.params)
      }
      if (this.autoClear) {
        this.$refs.form.reset()
      }
    }
  }
}
</script>
