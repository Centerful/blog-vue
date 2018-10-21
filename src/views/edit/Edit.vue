<template>
  <div class="edit">
    <div class="edit-layout">
      <EditContent></EditContent>
    </div>
    <EditSideBar :dirs="dirs"></EditSideBar>
  </div>
</template>

<script>
import EditSideBar from '@/views/edit/children/EditSideBar.vue'
import EditContent from '@/views/edit/children/EditContent.vue'

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
  components: { EditSideBar, EditContent }
}
</script>

<style scoped>
  .edit-layout {
    display: flex;
    flex-direction: row;
    padding: 0 55px 55px 55px;
    justify-content: center;
  }
</style>
