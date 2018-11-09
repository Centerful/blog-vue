<template>
  <v-dialog v-model="dialogFlag" persistent :max-width="maxWidth">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text>{{content}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click.native="cancel">{{cancelText}}</v-btn>
        <v-btn color="green darken-1" flat @click.native="confirm">{{confirmText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialogFlag: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: Number,
      default: 340
    },
    title: {
      type: String,
      default: '操作确认'
    },
    content: {
      type: String,
      default: '是否进行此操作？'
    },
    confirmText: {
      type: String,
      default: '确 认'
    },
    cancelText: {
      type: String,
      default: '取 消'
    }
  },
  methods: {
    cancel () {
      this.dialogFlag = false
      this.$emit('cancel')
    },
    confirm () {
      this.dialogFlag = false
      this.$emit('confirm')
    }
  }
}
</script>
