<template>
  <v-flex d-inline-block mr-1>
    <v-btn flat class="ma-1" icon @click="toThumb()" :color="btn[theme_style][value]">
      <v-icon :size="20">mdi-thumb-up</v-icon>
    </v-btn><span style="cursor: default;user-select: none;" class="thumb-count caption" v-show="thumbCount">{{thumbCount}}</span>
  </v-flex>
</template>

<script>
export default {
  props: {
    value: {
      type:Boolean,
      default: false
    },
    thumb: {
      relation: {
        type: String,
        required: true
      },
      relation_type: {
        type: String,
        required: true
      },
      thumbs_count: {
        type:Number,
        required: true
      },
    },
    // 由于thumbs是通用组件，所以theme样式不与feed强绑定，不是private而是dark模式。
    theme_style: {
      type: String,
      default: 'light',
      validator: (val) => {return ['light', 'dark'].indexOf(val.toLowerCase()) + 1}
    }
  },
  model: {
    value: 'value',
    event: 'update'
  },
  data: () => ({
    myThumb: 0,
    btn: {
      dark: {
        true: 'red',
        false: 'grey lighten-3'
      },
      light: {
        true: 'blue',
        false: 'grey darken-1'
      }
    }
  }),
  computed: {
    thumbCount () {
      return this.thumb.thumbs_count + this.myThumb
    },
  },
  methods: {
    toThumb () {
      if (this.value) {
        --this.myThumb
        this.api.deleteThumb((res) => {
          if (res.code != 0) {
            this.$bus.emit('prompt', res.message)
            return
          }
        }, {
          relation: this.thumb.relation,
          relation_type: this.thumb.relation_type
        })
      } else {
        ++this.myThumb
        this.api.addThumb((res) => {
          if (res.code != 0) {
            this.$bus.emit('prompt', res.message)
            return
          }
        }, {
          relation: this.thumb.relation,
          relation_type: this.thumb.relation_type
        })
      }
      this.$emit('update', !this.value)
    }
  }
}
</script>

<style>
  
</style>