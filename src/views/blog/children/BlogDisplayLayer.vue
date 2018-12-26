<template>
  <v-container>
    <v-layout column>
      <BlogRow v-for="blog in blogs" :key="blog._id" :blog="blog"></BlogRow>
    </v-layout>
  </v-container>
</template>

<script>
import BlogRow from '@/views/blog/children/BlogRow.vue'
import BlogItem from '@/views/blog/children/BlogItem.vue'

export default {
  props: {
    blogs: {
      type: Array,
      requirea: true
    }
  },
  components: { BlogRow, BlogItem }
}
</script>
