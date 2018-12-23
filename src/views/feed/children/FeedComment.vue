<template>
  <v-flex xs12>
    <v-layout row align-start>
      <v-flex style="max-width: 64px;">
        <v-avatar class="ma-3 elevation-1" :size="32" style="cursor: pointer;">
          <img :src="comment.user.user_avatar" alt="avatar">
        </v-avatar>
      </v-flex>
      <v-flex>
        <v-layout column align-start>
          <v-flex xs12 d-flex align-baseline pt-2 style="user-select: none;">
            <v-flex subheading font-weight-bold style="cursor: pointer;">{{ comment.user.nick_name }}</v-flex>
            <template v-if="comment.reply">
              <v-flex style="margin: 0 10px;font-size: 13px;">回复</v-flex>
              <v-flex subheading font-weight-bold style="cursor: pointer;">{{ comment.reply_user.nick_name }}</v-flex>
            </template>
            <date-str :datetime="comment.update_time"></date-str>
            <!-- <v-flex body-1 style="margin: 0 10px;" caption>{{ utils.dateFmt(new Date(comment.update_time), 'MM-dd hh:mm') }}</v-flex> -->
          </v-flex>
          <v-flex body-1 xs12 class="text-xs-left">{{ comment.content }}</v-flex>
          <v-flex xs12>
            <thumbs v-model="comment.isThumbs" :thumbs_count="comment.thumbs_count"></thumbs><v-btn class="ma-1" @click="isReply = !isReply" flat icon :color="isReply ? 'blue' : 'grey darken-1'">
              <v-icon :size="20">mdi-message-reply-text</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 style="width: 100%;" >
            <FeedReply :reply_id="comment._id" v-model="isReply"></FeedReply>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import FeedReply from '@/views/feed/children/FeedReply.vue'
import Thumbs from '@/components/common/Thumbs.vue'
import DateStr from '@/components/common/DateStr.vue'

export default {
  props:['comment'],
  data: () => ({
    isReply: false
  }),
  methods: {
  },
  components: { FeedReply, Thumbs, DateStr }
}
</script>

<style>
  
</style>