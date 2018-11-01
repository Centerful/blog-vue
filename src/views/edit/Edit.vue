<template>
  <div class="edit">
    <div class="edit-layout">
      <EditContent></EditContent>
    </div>
    <EditSideBar></EditSideBar>
  </div>
</template>

<script>
import EditSideBar from '@/views/edit/children/EditSideBar.vue'
import EditContent from '@/views/edit/children/EditContent.vue'

export default {
  data () {
    return {
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
