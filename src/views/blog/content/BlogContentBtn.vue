<template>
  <v-flex>
    <thumbs v-model="isThumb" :thumb="thumb"></thumbs>
    <v-btn flat @click="comment = true">
      <v-icon :size="20" color="grey darken-1">mdi-message-reply</v-icon>&nbsp;{{ blogParams.comments_count ? blogParams.comments_count + '条评论' : '添加评论' }}
    </v-btn>
    <v-menu z-index="30" bottom offset-y>
      <v-btn class="ma-0" icon slot="activator">
        <v-icon :size="20" color="grey darken-1">mdi-settings</v-icon>
      </v-btn>
      <v-list>
      <v-list-tile v-for="(item, i) in ops" :key="i" @click="options(item.code)">
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile>
      </v-list>
    </v-menu>
    <comment v-model="comment"></comment>
  </v-flex>
</template>

<script>
import Thumbs from '@/components/common/Thumbs.vue'
import comment from '@/components/comment/CommentDialog.vue'

export default {
  props: ['blogParams'],
  data: () => ({
    isThumb: false,
    comment: false,
    ops: [
      {code: 'cancel', title: '取消发布'}
    ]
  }),
  /*
    在mounted时让本地data等于props传递的data
    这样thumbs可以通过v-model的语法糖动态修改isThumb的值。如果使用blogParams是无法修改,因为自组件无法修改父组件通过props中获得数组，但可疑修改data中的
    不过不建议这样使用，因为本组件的isThumb修改了，而父组件的isThumb没有修改。
    虽然父组件本身不会使用该属性但也不建议这样使用
  */
  mounted () {
    this.isThumb = this.blogParams.isThumb
  },
  methods: {
    options (code) {
      debugger
      switch (code) {
        case 'cancel':
          let cancelObj = {
            title: '取消确认',
            content: `是否取消发布博客：“${this.blogParams.blog_title}”， 取消后博客将从专栏移除！`,
            confirmColor: 'red',
            confirm: this.cancelPublish // 传递confirm时callback函数。
          }
          this.$bus.emit('confirm', cancelObj)
          break
      }
    },
    // 取消发布博客
    cancelPublish () {
      this.api.cancelPublish((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return 
        }
        // 返回上级
        this.$router.go(-1)
      }, this.blogParams._id)
    }
  },
  computed: {
    thumb () {
      return {
        relation: this.blogParams._id,
        relation_type: 'BLOG',
        thumbs_count: this.blogParams.thumbs_count
      }
    }
  },
  components: { Thumbs, comment }
}
</script>

<style>
  
</style>