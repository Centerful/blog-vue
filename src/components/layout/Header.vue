<template>
  <div class="layout-head">
    <div class="head-wapper">
      <div class="head-inner">
        <div class="head-container">
          <header class="head-left"> </header>
          <header class="head-center"> </header>
          <header class="head-right">
            <icon class="head-btn" name="toggle-off"/>
            <icon class="head-btn" name="bell"/>
            <div class="h-auth" @click="login"></div>
          </header>
        </div>
        <progress-bar></progress-bar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headbar',
  data () {
    return {}
  },
  methods: {
    login () {
      // TODO 目前先定为,退出返回到login页面.
      this.api.logout((data) => {
        this.$router.push({ name: 'Login' })
      }, this.formData)
    },

  }
}
</script>

<style scoped>
  .fa-icon {
    width: auto;
    height: 1em;
    max-width: 100%;
    max-height: 100%;
    font-size: 1.1em;
    color: #777;
  }
  .layout-head {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    min-width: 520px;
  }
  .head-wapper {
    position: relative;
    padding: 0 55px;
    display: flex;
    justify-content: center;
  }
  .head-inner {
    height: 43px;
    background-color: #fff;
    width: 72%;
    max-width: 890px;
    box-shadow: 0 1px 5px -1px rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid #C6C6C6;
    opacity: 0.955;
    z-index: 999;
    position: relative;
  }
  .head-container {
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .head-back {
    z-index: 20;
    font-size: 2em;
    cursor: pointer;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    border-radius: 6px;
    padding: 4px;
    color: #808080;
    transition: all 0.5s ease-out;
  }
  .head-back:hover {
    background-color: #d2d2d2;
    transition: all 0.5s ease-out;
  }
</style>
