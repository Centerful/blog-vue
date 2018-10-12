<template>
  <div class="column-item">
    <div class="column-meta">
      <div class="column-avatar">
        <img :src="blogColumn.columnImg">
      </div>
      <div class="column-meta-info">
        <div class="column-meta-title">{{ blogColumn.columnName }}</div>
        <div class="column-meta-autograph">{{ blogColumn.columnAutograph }}</div>
      </div>
    </div>
    <div class="column-btn">
      <button>进入专栏</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['blogColumn']
}
</script>

<style scoped>
.column-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.column-avatar {
  padding: 10px;
}
.column-avatar > img {
  display: block;
  border-radius: 50%;
  width: 42px;
  height: 42px;
}
.column-meta {
  display: flex;
  align-items: center;
}
.column-meta-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.column-meta-title {
  padding-top: 5px;
  color: #353535;
  font-size: 0.95em;
  font-weight: 600;
}
.column-meta-autograph {
  color: #666;
  font-size: 0.8em;
  padding: 3px 0;
}
.column-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
