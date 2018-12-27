<template>
  <div>
    Test Render
    <date-str :datetime="'2018-12-17T10:51:24.179Z'"></date-str>
  </div>
</template>

<script>
import DateStr from '@/views/lab/children/DateStrRender.vue'
export default {
  components: { DateStr }
}
</script>