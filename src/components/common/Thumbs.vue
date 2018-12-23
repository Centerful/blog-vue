<template>
  <v-flex d-inline-block mr-1>
    <v-btn flat class="ma-1" icon @click="toThumb()" :color="value ? 'blue' : 'grey darken-1'">
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
    thumbs_count: {
      type:Number,
      required: true
    },
  },
  model: {
    value: 'value',
    event: 'update'
  },
  data: () => ({
    myThumb: 0
  }),
  computed: {
    thumbCount () {
      return this.thumbs_count + this.myThumb
    },
  },
  methods: {
    toThumb () {
      if (this.value) {
        --this.myThumb
      } else {
        ++this.myThumb
      }
      this.$emit('update', !this.value)
      // this.api.thumb()
    }
  }
}
</script>

<style>
  
</style>