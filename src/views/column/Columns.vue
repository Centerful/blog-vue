<template>
  <div class="columns">
    <placeholder/>
    <div class="columns-bg">
      <img class="columns-bg-img" src="/static/img/columns-bg-typewriter.jpg" alt="">
      <div class="columns-bg-bar">
        <div class="columns-bg-mask"></div>
        <div class="columns-bg-inner">
          <span class="columns-summary">带来极致创作体验</span>
          <v-btn depressed class="ma-2" @click="openColumn">开通专栏</v-btn>
          <v-btn flat style="color: white;" @click="writeBlog">开始写文章</v-btn>
        </div>
      </div>
    </div>
    <div class="columns-split-line">
      <span class="columns-split-word">专栏 · 发现</span>
    </div>
    <div class="columns-items">
      <template v-if="loading">
        <div class="column-load"></div>
        <div class="column-load"></div>
        <div class="column-load"></div>
      </template>
      <template v-else>
        <ColumnItem v-for="column in columns" :key="column._id" :column="column"></ColumnItem>
      </template>
    </div>
  </div>
</template>

<script>
import ColumnItem from '@/views/column/children/ColumnItem.vue'

export default {
  name: 'columns',
  data () {
    return {
      columns: [],
      loading: false
    }
  },
  components: {
    ColumnItem
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.loading = true
      this.api.getColumns((resp) => {
        this.columns = resp
        this.$progress.finish()
        this.loading = false
      })
    },
    writeBlog () {
      this.$router.push({ name: 'Edit' })
    },
    openColumn () {
      // 当前用户的id.
      this.$router.push({name: 'ColumnOpen'})
    }
  }
}
</script>

<style scoped>
  .column-load {
    width: 263px;
    height: 263px;
    margin: 8px;
    background-color: #ccc;
    border-radius: 2px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  .columns{
    padding: 20px;
  }
  .columns-bg{
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 20px;
    margin-bottom: 40px;
  }
  .columns-bg-img{
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 404px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  }
  .columns-wapper{
    width: 100%;
    max-width: 890px;
    padding: 10px;
  }
  .columns-container{

  }
  .columns-bg-bar{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 25px 0 15px 0;
  }
  .columns-bg-mask {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: #989898;
    opacity: 0.83;
    background: linear-gradient(#a2a2a2,#1f1f1f);
    filter: blur(1px);
  }
  .columns-bg-inner {
    position: relative;
    z-index: 9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .columns-summary{
    font-size: 1.5em;
    color: #ffffff;
  }
  .columns-write-btn{
  }
  .columns-open-btn{
    margin: 10px;
  }
  .columns-split-line{
    border-bottom: 1px solid #aaa;
    padding-bottom: 5px;
    margin-bottom: 15px;
  }
  .columns-split-word{
    font-weight: bold;
  }
  .columns-items{
    display: flex;
    flex-wrap: wrap;
    /*justify-content: flex-start;*/
    justify-content: center;
    margin-bottom: 60px;
  }
</style>
