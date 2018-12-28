<template>
  <v-container pa-0>
    <placeholder :marginTop="60"/>
    <v-layout column style="padding: 0 10%;">
      <!-- 博文图片 -->
      <v-flex>
        <v-card style="cursor: pointer;" @click="imgShow">
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
              <span class="ma-2">文章编辑于：<date-str margin="ma-0" :tooltip="true" fontSize="body-1" direction="bottom" display="d-inline" :datetime="publishTime"></date-str></span><span class="ma-1">字数：{{ blogWords }}</span><span class="ma-1">浏览：{{ blog.reads }}</span>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <!-- 博文标题 -->
      <v-flex headline mt-4 pa-1 font-weight-bold>{{blog.title}}</v-flex>
      <v-divider class="my-2"></v-divider>
      <!-- 博文内容 -->
      <v-flex pa-1>
        <Editormd type="html" :blogContent="blog.content" :ref="editorId" :key="editorId" :id="editorId"></Editormd>
      </v-flex>
      <!-- 标签 -->
      <v-flex v-if="blog.tags.length" mt-4 mb-5>
        <v-icon class="mx-1" small>mdi-tag</v-icon><v-chip small color="teal lighten-1" text-color="white" v-for="tag in blog.tags" :key="tag">{{tag}}</v-chip>
      </v-flex>
      <!-- 收录专栏 -->
      <v-flex v-if="blog.column">
        <v-flex style="font-size: 18px;cursor: default;" font-weight-bold>文章收录于以下专栏</v-flex>
        <v-divider class="my-2"></v-divider>
        <v-layout align-start style="align-self: baseline;" >
          <v-flex style="max-width: 80px;" ma-2>
          <v-card @click="" style="cursor: pointer;">
            <v-img :src="blog.column.column_img" aspect-ratio="1"></v-img>
          </v-card>
          </v-flex>
          <v-flex my-2>
            <v-flex><span class="font-weight-bold" style="cursor: pointer;">{{blog.column.column_name}}</span></v-flex>
            <v-flex>{{blog.column.introduction}}</v-flex>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <!-- 推荐阅读 -->
    <v-flex>
      <recommendations></recommendations>
    </v-flex>
  </v-container>
</template>

<script>
import Editormd from '@/views/edit/children/Editormd.vue'
import DateStr from '@/components/common/DateStr.vue'
import recommendations from '@/views/blog/content/Recommendations.vue'

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
    },
    publishTime () {
      return this.blog.republish_time || this.blog.publish_time
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
  components: { DateStr, Editormd, recommendations }
}
</script>

<style>
</style>