<template>
  <div class="edit">
    <div class="edit-layout">
      <div class="edit-container">
        <div class="edit-wapper">
          <div class="edit-picture">添加题图</div>
          <input class="edit-title" type="text" placeholder="请输入标题(最多30个字)">
          <div class="edit-title-split"></div>
          <div class="edit-content">
            <Editormd :blogId="1"></Editormd>
          </div>
        </div>
      </div>
    </div>
    <EditSideBar :dirs="dirs"></EditSideBar>
  </div>
</template>

<script>
import EditSideBar from '@/views/edit/children/EditSideBar.vue'
import Editormd from '@/views/edit/children/Editormd.vue'

export default {
  data () {
    return {
      dirs: []
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.api.getDirs((resp) => {
        this.dirs = resp
      })
    }
  },
  components: { EditSideBar, Editormd }
}
</script>

<style scoped>
  .edit-layout {
    display: flex;
    flex-direction: row;
    padding: 0 55px 55px 55px;
    justify-content: center;
  }
  .edit-container {
    background-color: #fff;
    padding: 0;
    margin-top: 40px;
    box-shadow: 3px 3px 10px -1px rgba(0,0,0,.2), -3px 3px 10px -1px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  .edit-wapper {
    width: 890px;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .edit-picture {
    max-width: 660px;
    width: 100%;
    height: 192px;
    background-color: #f7f8f9;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
    box-shadow: 0 1px 1px -1px rgba(0,0,0,.2), 0 1px 3px 0 rgba(0,0,0,.14), 0 1px 2px 0 rgba(0,0,0,.12);
    margin-bottom: 15px;
  }
  .edit-title {
    max-width: 660px;
    width: 100%;
    height: 50px;
    margin: 10px 0 0 0;
    padding-left: 5px;
    font-size: 24px;
    font-weight: bold;
    border: 0px;
    outline: none;
  }
  .edit-title-split {
    width: 640px;
    border-top: 2px solid #8282828a;
    margin-bottom: 10px;
  }
  .edit-content {
    max-width: 660px;
    width: 100%;
  }
</style>
