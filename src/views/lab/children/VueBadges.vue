<template>
  <div class="text-xs-center">
    <v-badge color="red" overlap>
      <v-icon slot="badge" dark small @click="deleteImg">mdi-minus</v-icon>
      <v-card :width="500">
        <v-img class="feed-img" @click="change" :src="'http://localhost:3000/public/images/2534ebc30e3790b0c8a50688ecb92a9f.png'"></v-img>
      </v-card>
    </v-badge>
  </div>
</template>

<script>
export default {
  methods: {
    deleteImg () {
      window.alert("img delete...")
    },
    change () {
      window.alert("img change...")
    }
  }
}
</script>

<style scoped>
.feed-img {
  cursor: pointer;
}
</style>