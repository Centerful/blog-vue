<template>
  <li class="e-dir">
    <a @mouseover="isHover = true" @mouseout="isHover = false" @click="fold = !fold" >
      <span class="e-row">
        <span class="e-icon"><icon name="book"/></span>
        <span clas s="e-name">{{ dir.name }}</span>
      </span>
      <span class="e-btn" :class="{ show: isHover }"><icon name="cog"/></span>
    </a>
    <ul :style="{ height:subHeight + 'px' }">
      <li>
        <a class="e-create-blog" @mouseover="subIsHover = true" @mouseout="subIsHover = false">
          <span class="e-row">
            <span class="e-icon"><icon name="plus"/></span>
            <span class="e-name">新建文章</span>
          </span>
          <span class="e-btn" :class="{ show: subIsHover }"><icon name="cog"/></span>
        </a>
      </li>
      <file v-for="file in dir.files" :key="file.id" :file="file"></file>
    </ul>
  </li>
</template>

<script>
import file from '@/views/edit/children/File.vue'
export default {
  props: ['dir'],
  data () {
    return {
      isHover: false,
      subIsHover: false,
      fold: true,
      subHeight2: 0
    }
  },
  components: { file },
  computed: {
    subHeight () {
      if (this.fold) {
        return 0
      } else {
        return (this.dir.files.length + 1) * 44
      }
    }
  },
  watch: {
  }
}
</script>

<style scoped>
  a {
    cursor: pointer;
  }
  .e-dir > a{
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    margin: 0 10px 0 10px;
    border-radius: 3px;
    background: #fff;
    transition: background 0.3s ease-in-out;
  }
  ul > li > a {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    margin: 0 10px 0 30px;
    border-radius: 3px;
    background: #fff;
    transition: background 0.3s ease-in-out;
  }
  .e-dir > ul {
    height:0px;
    padding: 0px;
    overflow: hidden;
    transition: height 0.5s ease 0s;
  }
  .dir-open {
    transition: height 0.5s ease 0s;
  }
  .e-create-blog {
    color: #aaa;
  }
  .e-row {
    display: flex;
  }
  .e-icon {
    padding-right: 15px;
  }
  .e-name {
    word-break: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 180px;
  }
  .e-dir > a > .e-row > .e-name {
    max-width: 200px;
  }
  .e-btn {
    background: inherit;
    padding: 5px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  .e-btn.show {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }
</style>