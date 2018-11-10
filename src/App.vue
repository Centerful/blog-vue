<template>
  <div id="app">
    <v-app>
      <router-view/>  
    </v-app> 
    <prompt-dialog></prompt-dialog>
    <confirm-dialog></confirm-dialog>
    <snack-bar></snack-bar>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
