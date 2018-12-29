<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      @click="to"
      style="
      min-height: 230px;min-width: 200px;
      max-height: 230px;max-width: 200px;
      cursor: pointer;margin:0 9px;" 
      color="blue-grey">
        <v-img :src="recommendation.publish.blog_img"></v-img>
      </v-card>
  </v-hover>
</template>

<script>
export default {
  props: ["recommendation"],
  methods: {
    to () {
      this.$router.push({name: 'BlogContents', params: { _id: this.recommendation._id }})
    }
  }
}
</script>