<template>
  <div id="app">
    <div class="content">
      <div class="layout">
        <div class="layout-head">
          <div class="head-wapper">
            <div class="head-inner">
              <div class="head-container">
                <header class="head-left"> </header>
                <header class="head-center"> </header>
                <header class="head-right">
                  <icon class="head-btn" name="toggle-off"/>
                  <icon class="head-btn" name="bell"/>
                  <div class="h-auth"></div>
                </header>
              </div>
              <progress-bar></progress-bar>
            </div>
          </div>
        </div>
        <div class="layout-body">
          <router-view/>
        </div>
      </div>
    </div>
    <div class="multi-bar">
      <div class="columns-btn btn"><router-link to="/columns"><icon name="columns"/></router-link></div>
      <div class="blog-btn btn"><router-link to="/blog"><icon name="book"/></router-link></div>
      <div class="talk-btn btn"><router-link to="/talk"><icon name="comments"/></router-link></div>
      <div class="edit-btn btn"><router-link to="/edit"><icon name="pen"/></router-link></div>
    </div>
    <div class="footer">
      Website design by <span>Centerful.</span>
    </div>
  </div>

</template>

<script>
export default {
  name: 'App',
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
@import './assets/css/tags-init.css';
@import './assets/css/blog-common.css';
.fa-icon {
  width: auto;
  height: 1em;
  max-width: 100%;
  max-height: 100%;
  font-size: 1.3em;
  color: #777;
}
</style>
