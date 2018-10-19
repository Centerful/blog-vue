<template>
  <li>
    <a v-waves class="e-create-blog" @mouseover="isHover = true" @mouseout="isHover = false">
      <span class="e-row">
        <span class="e-icon"><icon name="file" :style="{color: '#666'}"/></span>
        <span class="e-name">{{ file.name }}</span>
      </span>
      <div v-waves>
        <span class="e-btn" @click.stop="doCog" :class="{ show: isHover }" :style="{color: '#666'}"><icon name="cog"/></span>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  props: ['file'],
  data () {
    return {
      isHover: false
    }
  },
  methods: {
    doCog () {

    }
  }
}
</script>

<style scoped>
  a {
    cursor: pointer;
  }
  li {
    list-style: none;
  }
  li > a {
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
  a > div {
    border-radius: 3px;
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
  .e-btn:hover {
    background: #cecece;
    transition: background 0.25s ease-in-out;
  }
</style>
