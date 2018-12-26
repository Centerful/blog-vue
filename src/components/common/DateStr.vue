<template>
  <v-flex :class="display">
    <v-tooltip right v-if="tooltip">
      <v-flex :class="class_style" slot="activator" caption  style="user-select: none">{{ abs ? utils.dateFmt(new Date(datetime), format) : relative }}</v-flex>
      <span>{{utils.dateFmt(new Date(datetime), format)}}</span>
    </v-tooltip>
    <v-flex v-else :class="class_style" slot="activator" caption style="user-select: none">{{ abs ? utils.dateFmt(new Date(datetime), format) : relative }}</v-flex>
  </v-flex>
</template>

<script>
export default {
  props: {
    datetime: {
      type: [String, Date],
      required: true
    },
    format: {
      type: String,
      default: 'MM-dd hh:mm'
    },
    // 是否显示绝对日期
    abs: {
      type: Boolean,
      required: false
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    display: {
      type: String,
      default: 'd-inline'
    },
    margin: {
      type: String,
      default: 'mx-2'
    }
  },
  computed: {
    class_style () {
      return [this.display, this.margin]
    },
    relative () {
      let now = new Date()
      let time = new Date(this.datetime)
      let seconds = Math.ceil(Math.abs(now.getTime() - Date.parse(this.datetime))/ 1000)
      let minute = 60,
          hour = minute * 60,
          day = hour * 24,
          week = day * 7,
          month = day * 30,
          years = now.getFullYear() - time.getFullYear(),
          months = years * 12 + now.getMonth() - time.getMonth()
      if (seconds < minute)
        return '刚刚'
      if (seconds >= minute && seconds < hour)
        return Math.ceil(seconds/minute) + '分钟前'
      if (seconds >= hour && seconds < day)
        return Math.ceil(seconds/hour) + '小时前'
      if (seconds >= day && seconds < week)
        return Math.ceil(seconds/day) + '天前'
      if (seconds >= week && seconds < month)
        return Math.ceil(seconds/week) + '周前'
      if (years > 0) 
        return (now.getFullYear() - time.getFullYear()) + '年前'
      else 
        return months + '月前'
    },
  }
}
</script>

<style>
  
</style>