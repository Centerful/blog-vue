<template>
  <v-hover>
    <v-card
      dark
      slot-scope="{ hover }"
      class="recomm-card"
      :class="`elevation-${hover ? 12 : 2}`"
      @click="to" 
      :color="color">
        <v-img :src="recommendation.publish.blog_img" height="118"></v-img>
        <v-flex ma-3>
          <h4>{{recommendation.publish.title}}</h4>
          <v-flex class="recomm-content">{{recommendation.publish.content}}</v-flex>
          <v-flex class="recomm-auth">{{recommendation.user.nick_name}}</v-flex>
        </v-flex>
      </v-card>
  </v-hover>
</template>

<script>
export default {
  props: ["recommendation"],
  computed: {
    color () {
      return this.utils.randomColor()
    }
  },
  methods: {
    to () {
      this.$router.push({name: 'BlogContents', params: { _id: this.recommendation._id }})
    }
  }
}
</script>

<style scoped>
  .recomm-card {
    height: 255px;
    width: 210px;
    cursor: pointer;margin:0 9px;
  }
  .recomm-content {
    font-size: 13px;
    overflow: hidden;
    max-height: 63px;

    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .recomm-auth {
    font-size: 15px;
    position: absolute;
    bottom: 10px;
    overflow: hidden;
    max-width: 178px;
    text-overflow: ellipsis;
  }
</style>