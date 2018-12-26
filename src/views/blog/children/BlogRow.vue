<template>
  <v-layout row ma-3>
    <v-flex xs4>
      <v-card :class="blog.blog_type.toLowerCase()">
        <v-img @click="imgShow" style="cursor: pointer;" :src="blog.blog_img" aspect-ratio="1.414" ></v-img>
      </v-card>
    </v-flex>
    <v-flex xs8 pl-2>
      <v-layout column>
        <v-flex><h2 style="display: inline;cursor: pointer;" @click="to">{{blog.title}}</h2></v-flex>
        <v-flex mb-2>
          <v-flex d-inline style="cursor: pointer;">{{ blog.user.nick_name }}</v-flex><date-str :tooltip="true" :display="'d-inline'" :datetime="blog.publish_time"></date-str>
        </v-flex>
        <v-flex body-1>
          <p class="blog_content">{{ blog.content }}</p>
        </v-flex>
        <v-flex v-if="blog.tags" my-2>
          <v-icon class="mx-1" small>mdi-tag</v-icon><v-chip label color="teal lighten-1" text-color="white" small v-for="tag in blog.tags">{{tag}}</v-chip>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import DateStr from '@/components/common/DateStr.vue'
export default {
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  methods: {
    imgShow () {
      this.$fancyBox.open(this.blog.blog_img)
    },
    to () {
      this.$router.push({name: 'BlogContents', params: { _id: this.blog._id }})
    }
  },
  components: { DateStr }
}
</script>

<style scoped>
  .blog_content {
    text-overflow: ellipsis;
    word-break: break-all;
    overflow: hidden;
    max-height: 96px;
    min-height: 96px;
    margin: 0;
    line-height: 1.8;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .hot::before {
    cursor: pointer;
    content: '';
    background-color: #FF8A80;
    width: 11px;
    height: 11px;
    position: absolute;
    margin: 10px 0 0 10px;
    border-radius: 50%;
    box-shadow: 0 1px 1px 1px rgba(0,0,0,0.1);
    border: 2px solid #fff;
    z-index: 2;
  }
  .new::before {
    cursor: pointer;
    content: '';
    background-color: #47c9e5;
    width: 11px;
    height: 11px;
    position: absolute;
    margin: 10px 0 0 10px;
    border-radius: 50%;
    box-shadow: 0 1px 1px 1px rgba(0,0,0,0.1);
    border: 2px solid #fff;
    z-index: 2;
  }
  .top::before {
    cursor: pointer;
    content: '';
    background-color: #81C784;
    width: 11px;
    height: 11px;
    position: absolute;
    margin: 10px 0 0 10px;
    border-radius: 50%;
    box-shadow: 0 1px 1px 1px rgba(0,0,0,0.1);
    border: 2px solid #fff;
    z-index: 2;
  }
  .republish::before {
    cursor: pointer;
    content: '';
    background-color: #FFE082;
    width: 11px;
    height: 11px;
    position: absolute;
    margin: 10px 0 0 10px;
    border-radius: 50%;
    box-shadow: 0 1px 1px 1px rgba(0,0,0,0.1);
    border: 2px solid #fff;
    z-index: 2;
  }
  .del::before {
    cursor: pointer;
    content: '';
    background-color: #BCAAA4;
    width: 11px;
    height: 11px;
    position: absolute;
    margin: 10px 0 0 10px;
    border-radius: 50%;
    box-shadow: 0 1px 1px 1px rgba(0,0,0,0.1);
    border: 2px solid #fff;
    z-index: 2;
  }
</style>
