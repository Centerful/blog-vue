<template>
  <article class="post-item">
    <div class="post-container flex-small">
      <div class="post-left-side flex-mid flex-small">
        <div class="post-meta" :class="blog_type.toLowerCase()">
          <v-img class="post-meta-img elevation-1" :src="blog_img"></v-img>
        </div>
      </div>
      <div class="post-right-side flex-mid flex-small">
        <div class="post-title">
          <span class="post-title-a" @click="to()">
            <h2>{{ title }}</h2>
          </span>
        </div>
        <div class="post-auth-date">
          <span class="post-auth">by <span href="#" class="post-auth-a"> {{ user.nick_name }} </span></span>
          <span href="#" class="post-date">{{ utils.getYMD(new Date(update_time)) }}</span>
        </div>
        <div class="post-content">
          <p>
            {{ content }}
          </p>
        </div>
        <div class="post-footer">
          <div class="footer-container">
            <span class="footer-tags">
              <span v-for="tag in tags" :key="tag._id" class="footer-tags-a" href="#">{{ tag.name }}</span>
            </span>
            <span href="#" class="footer-comments"></span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    _id: {
      type: String,
      required: true
    },
    blog_type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    blog_img: {
      type: String,
      required: true
    },
    user: {
      required: true,
      nick_name: {
        type: String,
        required: true
      }
    },
    update_time: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      required: false,
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  },
  name: 'BlogItem',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App!'
    }
  },
  methods: {
    to: function () {
      this.$router.push({name: 'BlogContent', params: { _id: this._id }})
    }
  }
}
</script>

<style scoped>
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
.post-meta::before {
  cursor: pointer;
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
  cursor: pointer;
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
  cursor: pointer;
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
  min-height: 100px;
}
.post-content p {
  margin: 0;
  overflow: hidden;
  /*添加最大高度，防止ie浏览器 -webkit-box失效后高度不受控制问题。*/
  max-height: 100px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  word-break: break-all;
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
