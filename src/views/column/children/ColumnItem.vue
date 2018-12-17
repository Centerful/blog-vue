<template>
  <div class="columns-item">
    <div class="columns-item-img">
      <div class="columns-item-bar">
        <!-- 连载中,完结 -->
        <div v-if="column.column_status === 'open'" class="columns-item-status">连载中</div>
        <div v-else-if="column.column_status === 'close'" class="columns-item-status finish">已完结</div>
        <div class="columns-item-multi"><icon name="ellipsis-h"/></div>
      </div>
      <img :src="column.column_img" alt="">
    </div>
    <div class="columns-item-content">
      <div class="columns-item-title" @click="toBlogs()">{{ column.column_name }}</div>
      <div class="columns-item-summary">{{ column.introduction }}</div>
      <span class="columns-item-founder">{{ column.creater.nick_name }}</span>
      <div class="columns-item-footer">
        <div class="columns-item-left">
          <span v-for="tag in column.tags" :key="tag" class="columns-item-tag">{{ tag }}</span>
        </div>
        <div class="columns-item-right">
          <span class="columns-item-article">{{ column.blog_count }} 篇文章</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'columnItem',
  props: ['column'],
  methods: {
    // 进入专栏查看专栏里的文章.
    toBlogs () {
      this.$router.push({name: 'ColumnContent', params: { _id: this.column._id }})
    }
  }
}
</script>

<style scoped>
  .columns-item{
    width: 262px;
    margin: 8px;
    border-radius: 2px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);

    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .columns-item-img{
    width: 262px;
    height: 161px;
    position: relative;
    overflow: hidden;
  }
  .columns-item-img img {
    width: auto;
    height: auto;
    max-width: 262px;
    cursor: pointer;

    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }
  .columns-item-bar{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    z-index: 9;
  }
  .columns-item-status{
    font-size: 0.7em;
    background-color: #26A69A;
    padding: 2px 4px;
    border-top-left-radius: 2px;
    border-bottom-right-radius: 8px;
    color: #fff;
  }
  .columns-item-status.finish{
    background-color: #757575;
  }

  .columns-item-multi{
    font-size: 0.7em;
    position: absolute;
    right: 10px;
    top: 5px;
    color: #555;
  }
  .columns-item-content{
    display: flex;
    flex-direction: column;
    padding: 5px 10px 10px 10px;
    border-top: 1px solid #BBB;
  }
  .columns-item-title{
    font-size: 0.98em;
    font-weight: bold;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .columns-item-summary{
    font-size: 0.8em;
    color: #4a4a4a;
    margin-bottom: 5px;
  }
  .columns-item-footer{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .columns-item-left{

  }
  .columns-item-tag{
    font-size: 0.785em;
    cursor: pointer;
    margin-right: 10px;
  }
  .columns-item-right{
    display: flex;
    align-items: baseline;
  }
  .columns-item-founder{
    font-size: 0.88em;
    font-weight: bold;
    color: #5a5a5a;
    cursor: pointer;
    margin: 0 7px;
  }
  .columns-item-article{
    font-size: 0.8em;
  }
</style>
