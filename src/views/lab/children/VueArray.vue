<template>
  <div>
    <v-btn @click="push">push</v-btn>
    <v-btn @click="pop">pop</v-btn>
    <div>
      <span v-for="val in arr" :key="val"> {{val}} </span>
    </div>
  </div>
</template>

<script>
export default{
  data: () => ({
    arr: []
  }),
  mounted () {
    for (var i = 3; i >= 0; i--) {
      this.arr.push(Math.random().toString(36).substr(2))
    }
  },
  methods: {
    push () {
      this.arr.push(Math.random().toString(36).substr(2))
    },
    pop () {
      this.arr.pop()
    }
  }
}
</script>

<style scoped>
  
</style>