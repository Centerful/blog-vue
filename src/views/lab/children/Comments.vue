<template>
  <div>
    <v-btn @click="flag = true">open</v-btn>
    <comment v-model="flag"></comment>  
  </div>
</template>

<script>
import comment from '@/components/comment/CommentDialog.vue'

export default {
  data: () => ({
    flag: false
  }),
  components: { comment }
}
</script>

<style>
  
</style>