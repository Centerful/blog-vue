<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      style="min-height: 230px;min-width: 200px;cursor: pointer;margin:0 9px;" 
      color="blue-grey">{{recommendation}}</v-card>
  </v-hover>
</template>

<script>
export default {
  props: ["recommendation"]
}
</script>