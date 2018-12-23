<template>
  <div class="normal">
    <div class="content">
      <div class="mylayout">
        <HeadBar></HeadBar>
        <div class="layout-body">
          <router-view/>
        </div>
      </div>
    </div>
    <SideBar></SideBar>
    <FootBar></FootBar>
  </div>
</template>

<script>
import HeadBar from '@/components/layout/Header.vue'
import FootBar from '@/components/layout/Footer.vue'
import SideBar from '@/components/layout/Sidebar.vue'

export default {
  name: 'normal',
  components: { HeadBar, FootBar, SideBar },
  created () {
    this.$progress.start()
    this.$router.beforeEach((to, from, next) => {
      this.$progress.start()
      next()
    })
  }
}
</script>

<style>
  .blog-overlay {
    position: fixed;
    top: -1000px;
    right: -1000px;
    bottom: -1000px;
    left: -1000px;
    background: rgba(0,0,0,.4);
    z-index: 1000;
    /*opacity: 0;*/
    display: none;
  }
  .overlay-show {
    display: block;
    /*这里需要将body设置为overflow: hidden;用于禁止滚动*/
  }
  .clear {
    clear: both;
  }
  .head-right {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  .head-btn {
    padding: 5px;
    margin-left: 8px;
    cursor: pointer;
  }
  .h-auth {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    background-color: #9bd098;
    margin-left: 13px;
  }
  .toolbar {
    height: 50px;
    width: 100%;
    background-color: #009688;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
  }
  .content {
    display: flex;
    flex-direction: row;
    padding: 0 55px 55px 55px;
    justify-content: center;
  }
  .mylayout{
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 72%;
    max-width: 890px;
  }
  .layout-body {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: 3px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  .layout-body.is-content{
    padding: 0;
  }
  .loading {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loading > i {
    font-size: 1.2em;
    color: #5a5a5a;
  }
</style>
