<template>
  <v-container pa-0>
    <placeholder :marginTop="60"/>
    <v-layout column style="padding: 0 10%;">
      <!-- 博文图片 -->
      <v-flex>
        <v-card @click="imgShow">
          <v-img :src="blog.blog_img"></v-img>  
        </v-card>
      </v-flex>
      <!-- 作者信息，文章信息 -->
      <v-flex my-3>
        <v-card>
          <v-layout column>
            <v-layout row align-start style="align-self: baseline">
              <v-flex ma-3>
                <v-avatar class="elevation-1" style="cursor: pointer;user-select: none;">
                  <img :src="blog.user.user_avatar" alt="avatar">
                </v-avatar>
              </v-flex>
              <v-flex my-3>
                <v-flex mb-1 style="cursor: pointer;"><h4>{{ blog.user.nick_name }}</h4></v-flex>
                <v-flex mt-1 body-1>{{ blog.user.signature }}</v-flex>
              </v-flex>
            </v-layout>
            <v-divider class="mx-3"></v-divider>
            <v-flex ma-3 ml-4 body-1>
              <span class="ma-2">文章编辑于：<date-str margin="ma-0" :tooltip="true" fontSize="body-1" direction="bottom" display="d-inline"  :datetime="blog.publish_time"></date-str></span><span class="ma-1">字数：{{ blogWords }}</span><span class="ma-1">浏览：{{ blog.reads }}</span>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <!-- 博文标题 -->
      <!-- 博文内容 -->
      <!-- 收录专栏 -->
      <!-- 推荐阅读 -->
    </v-layout>
  </v-container>
</template>

<script>
import DateStr from '@/components/common/DateStr.vue'
export default {
  data: () => ({
    editorId: 'readOnlyEdit',
    blog: {},
    loading: true
  }),
  created () {
    this.fetchData()
  },
  computed: {
    blogWords () {
      return this.blog.content.length
    }
  },
  methods: {
    imgShow () {
      this.$fancyBox.open(this.blog.blog_img)
    },
    fetchData () {
      this.loading = true
      this.api.getPublish((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return 
        }
        this.blog = res.data
        this.loading = false
        this.$progress.finish()
      }, this.$route.params._id)
    }
  },
  components: { DateStr }
}
</script>

<style>
</style>