<template>
  <article class="post-item">
    <div class="post-container flex-small">
      <div class="post-left-side flex-mid flex-small">
        <div class="post-meta load">
        </div>
      </div>
      <div class="post-right-side flex-mid flex-small">
        <div class="post-title load">
        </div>
        <div class="post-auth-date load">
        </div>
        <div class="post-content load">
        </div>
        <div class="post-footer">
          <div class="footer-container load">
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>

export default {
  props: {},
  name: 'BlogItemLoad',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App!'
    }
  }
}
</script>

<style scoped>
.load {
  background-color: #ccc;
  border-radius: 2px;
}
.post-meta.load {
  width: 253px;
  height: 170px;
}
.post-title.load {
  margin-top: 12px;
  width: 300px;
  height: 31px;
}
.post-auth-date.load {
  margin: 6px;
  width: 260px;
  height: 20px;
}
.post-content.load {
  margin: 6px;
  height: 100px;
}
div.post-footer {
  margin: 6px;
  border: none;
  padding: 0;
}
.footer-container.load {
  height: 24px;
  width: 140px;
}
.post-item {
  width: auto;
  height: auto;
  margin: 10px;
  margin-bottom: 20px;
  flex-grow: 1;
}
.post-item.wait {
  color: #8d8d8d;
  text-align: center;
}
.post-container {
  display: flex;
  padding: 0 10px;
}

.post-left-side {
  width: 30%;
}
.post-meta {
  margin-top: 10px;
}
.post-meta.hot::before{
  content: '';
  background-color: #FF8A80;
  width: 11px;
  height: 11px;
  position: absolute;
  margin: 8px 0 0 13px;
  border-radius: 50%;
  box-shadow: 0 1px 1px 1px rgba(0,0,0,0.1);
  border: 2px solid #fff;
  z-index: 2;
}
.post-meta.new::before{
  content: '';
  background-color: #47c9e5;
  width: 11px;
  height: 11px;
  position: absolute;
  margin: 8px 0 0 13px;
  border-radius: 50%;
  box-shadow: 0 1px 1px 1px rgba(0,0,0,0.1);
  border: 2px solid #fff;
  z-index: 2;
}
.post-meta.top::before{
  content: '';
  background-color: #81C784;
  width: 11px;
  height: 11px;
  position: absolute;
  margin: 8px 0 0 13px;
  border-radius: 50%;
  box-shadow: 0 1px 1px 1px rgba(0,0,0,0.1);
  border: 2px solid #fff;
  z-index: 2;
}
.post-meta.republish::before{
  content: '';
  background-color: #FFE082;
  width: 11px;
  height: 11px;
  position: absolute;
  margin: 8px 0 0 13px;
  border-radius: 50%;
  box-shadow: 0 1px 1px 1px rgba(0,0,0,0.1);
  border: 2px solid #fff;
  z-index: 2;
}
.post-meta.del::before{
  content: '';
  background-color: #BCAAA4;
  width: 11px;
  height: 11px;
  position: absolute;
  margin: 8px 0 0 13px;
  border-radius: 50%;
  box-shadow: 0 1px 1px 1px rgba(0,0,0,0.1);
  border: 2px solid #fff;
  z-index: 2;
}
.post-meta-img {
  border-radius: 3px;
  display: block;
  width:auto;
  height:auto;
  max-width:100%;
  max-height:100%;

}
.post-right-side {
  width: 70%;
  margin-left: 7px;
  background-color: #fff;
}
.post-title {
  margin: 6px;
}
.post-title-a h2 {
  display: inline;
}
.post-auth-date {
  color: #8d8d8d;
  font-size: 0.84em;
}
.post-auth-a {
  color: #aaa;
  font-weight: bold;
}
.post-date {
  margin-left: 7px;
  color: #8d8d8d;
}
.post-content {
  font-family: "Raleway";
  color: #8d8d8d;
  line-height: 1.8;
  font-size: 14px;
  margin: 14px 0;
}
.post-content p {
  margin: 0;
}
.post-footer {
  border-top: 1px solid #e9e9e9;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgb(233, 233, 233);
  padding-top: 10px;
}
.footer-tags-a {
  color: #8d8d8d;
  font-size: 12px;
  text-transform: uppercase;
  margin: 0 2px;
}
</style>
