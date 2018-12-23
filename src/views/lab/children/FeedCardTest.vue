<template>
  <div style="width: 70%">
    <FeedCard :feed="feedData"></FeedCard>
  </div>
</template>

<script>
import FeedCard from '@/views/feed/children/FeedCard.vue'
export default {
  data: () => ({
    feedData: {
      "_id": "asasdasd",
      "images": ["http://localhost:3000/public/images/662e806f1dde027403b26ef40fae2db6.jpg"],
      "videos": [],
      "topic": [""],
      "comments_count": 15,
      "thumbs_count": 0,
      "isThumbs": false,
      "_id": "5c1b3718340fbca9977e6fec",
      "content": "这世界要是没有爱情，它在我们心中还会有什么意义！这就如一盏没有亮光的走马灯。 —— 歌德 d(`･∀･)b ",
      "creater": {
        "user_avatar": "http://localhost:3000/public/images/default_user_avater.jpg",
        "_id": "5bf36f27f927530f3005ec7d",
        "nick_name": "sanzewen@163.com"
      },
      "feed_status": "false",
      "feed_date": "2018-12-20T06:30:48.391Z",
      "thumbs": [],
      "update_time": "2018-12-20T06:30:48.399Z"
    }
  }),
  components: { FeedCard }
}
</script>

<style>
  
</style>