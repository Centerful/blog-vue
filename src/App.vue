<template>
  <div id="app">
    <div class="content">
      <div class="layout">
        <div class="layout-head">
          <div class="head-wapper">
            <div class="head-inner">
              <header class="head-left"> </header>
              <header class="head-center"> </header>
              <header class="head-right">
                <i class="h-switch fa fa-toggle-off"></i>
                <i class="h-message fa fa-bell"></i>
                <div class="h-auth"></div>
              </header>
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
  name: 'App'
}
</script>

<style>
@import './assets/tags-init.css';
@import './assets/blog-home.css';
.fa-icon {
  width: auto;
  height: 1em;
  max-width: 100%;
  max-height: 100%;
  font-size: 1.3em;
  color: #444;
}
</style>
