<template>
  <div class="text-xs-center">
    <v-menu offset-y transition="slide-y-transition">
      <v-btn slot="activator">
        choose || {{emoji}}
      </v-btn>
      <EmojiWordPicker :pick="pick"></EmojiWordPicker>
    </v-menu>
  </div>
</template>

<script>
import EmojiWordPicker from '@/components/common/EmojiWordPicker.vue'
import EmojiPicker from '@/components/common/EmojiPicker.vue'
export default {
  data: () => ({
    emoji: null
  }),
  methods: {
    pick (val) {
      this.emoji = val
    }
  },
  components: { EmojiWordPicker, EmojiPicker }
}
</script>

<style>
  
</style>
