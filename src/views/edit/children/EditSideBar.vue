<template>
  <div class="edit-side-bar">
    <div class="edit-side-fake" @click="isOpen = true" :class="{ hover: isHover }">
      <section @mouseover="isHover = true" @mouseout="isHover = false"></section>
    </div>
    <div class="edit-container">
      <div class="edit-mask" :class="{ loaded: isOpen }" @click="isOpen = false"></div>
      <div class="edit-side" :class="{ loaded: isOpen }">
        <header>
          <div title="7篇文章" class="edit-header-number">
            <strong>7</strong>
            <span>文章</span>
          </div>
          <div class="edit-header-bar">
            <div><icon name="search"/></div>
            <div><icon name="sort-amount-down"/></div>
            <div><icon name="ellipsis-v"/></div>
          </div>
        </header>
        <section class="edit-content">
          <ul>
            <Dir v-for="dir in dirs" :key="dir.id" :dir="dir"></Dir>
          </ul>
        </section>
        <footer @click="back" class="edit-footer">
          <a>回到首页</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Dir from '@/views/edit/children/Dir.vue'
export default {
  name: 'EditSideBar',
  props: ['dirs'],
  data () {
    return {
      isHover: false,
      isOpen: false
    }
  },
  components: { Dir },
  mounted () {
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .edit-side-bar {
    font-size: 0.95em;
  }
  .edit-side-fake {
    position: fixed;
    top: 0;
    left: -41px;
    height: 100%;
    background-color: #777;
    width: 40px;
    opacity: 0;
    transition: left .15s ease-in-out,opacity .2s ease-in-out;
  }
  .edit-side-fake.hover {
    left: 0px;
    opacity: 1;
    transition: left .15s ease-in-out,opacity .2s ease-in-out;
  }
  .edit-side-fake > section {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 30px;
    opacity: 0;
  }
  .edit-side {
    position: fixed;
    top: 0;
    height: 100%;
    width: 350px;
    background-color: #fff;
    z-index: 99;
    box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);

    left: -360px;
    opacity: 0.8;
    transition: left .15s ease-in-out,opacity .15s ease-in-out;
  }
  .edit-side.loaded {
    left: 0px;
    opacity: 1;
    transition: left .15s ease-in-out,opacity .15s ease-in-out;
  }

  .edit-mask {
    position: fixed;
    top: -10px;
    right: -10px;
    bottom: -10px;
    left: -10px;
    /*background: rgba(0,0,0,.4);*/
    background: rgba(255,255,255,0.8);
    z-index: 98;
    /*display: none;*/
    opacity: 0.8;
    display: none;
    transition: opacity .2s ease-in-out;
  }
  .edit-mask.loaded {
    /*display: block;*/
    opacity: 1;
    display: block;
    transition: opacity .2s ease-in-out;
  }

  .edit-side > header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 12px;
    background: #1b82f1;
    transition: background 0.3s;
    box-shadow: 0 6px 12px -3px rgba(0,0,0,0.2);
    overflow: hidden;
    color: #fff;
    z-index: 10;
  }
  .edit-header-number {
    display: flex;
    align-items: baseline;
    cursor: default;
  }
  .edit-header-number > strong{
    font-size: 1.5em;
    font-weight: 400;
    padding: 8px;
  }
  .edit-header-number > span {
    font-size: 0.9em;
    position: relative;
    bottom: 1.5px;
    opacity: 0.8;
  }
  .edit-header-bar {
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .edit-header-bar > div {
    cursor: pointer;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 50%;
    margin: 0 1px;
    width: 24px;
    height: 24px;
    transition: background-color 0.3s ease-in-out;
  }
  .edit-header-bar > div:hover {
    background-color: #ffffff30;
    transition: background-color 0.3s ease-in-out;
  }
  .edit-content {
    height: 100%;
    overflow-y: scroll;
  }
  /*滚动条凹槽的颜色，还可以设置边框属性*/
  .edit-content::-webkit-scrollbar-track-piece {
    background-color:#fff;
  }
  /*滚动条的宽度*/
  .edit-content::-webkit-scrollbar {
    width:5px;
    /*height: 15px;*/
  }
  /*滚动条的设置*/
  .edit-content::-webkit-scrollbar-thumb {
    background-color: #bbb;
    background-clip: padding-box;
    border-radius: 2px;
    /*min-height: 40px;*/
  }
  /*hover设置*/
  .edit-content::-webkit-scrollbar-thumb:hover {
    background-color:#26A69A;
  }
  .edit-content > ul {
    font-size: 0.9em;
    padding: 10px;
    margin-bottom: 90px;
  }
  .edit-footer {
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ddd;

    cursor: pointer;
  }
  .edit-footer > a {
    font-size: 0.97em;
    padding: 10px;
  }

</style>
