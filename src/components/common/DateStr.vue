<template>
  <v-flex caption :class="margin" style="user-select: none">{{ abs ? utils.dateFmt(new Date(datetime), format) : relative }}</v-flex>
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
    margin: {
      type: String,
      default: 'mx-2'
    }
  },
  computed: {
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
    // content () {
    //     let publishTime = Date.parse(this.datetime),
    //     d_seconds,
    //     d_minutes,
    //     d_hours,
    //     d_days,
    //     timeNow = parseInt(new Date().getTime() / 1000),
    //     d,
    //     date = new Date(publishTime),
    //     Y = date.getFullYear(),
    //     M = date.getMonth() + 1,
    //     D = date.getDate(),
    //     H = date.getHours(),
    //     m = date.getMinutes(),
    //     s = date.getSeconds()
    //     //小于10的在前面补0
    //     if (M < 10) {
    //       M = '0' + M
    //     }
    //     if (D < 10) {
    //       D = '0' + D
    //     }
    //     if (H < 10) {
    //       H = '0' + H
    //     }
    //     if (m < 10) {
    //       m = '0' + m
    //     }
    //     if (s < 10) {
    //       s = '0' + s
    //     }
    //     d = timeNow - publishTime
    //     d_days = parseInt(d / 86400)
    //     d_hours = parseInt(d / 3600)
    //     d_minutes = parseInt(d / 60)
    //     d_seconds = parseInt(d)

    //     if (d_days > 0 && d_days < 3) {
    //       return d_days + '天前'
    //     } else if (d_days <= 0 && d_hours > 0) {
    //       return d_hours + '小时前'
    //     } else if (d_hours <= 0 && d_minutes > 0) {
    //       return d_minutes + '分钟前'
    //     } else if (d_seconds < 60) {
    //       if (d_seconds <= 0) {
    //         return '刚刚'
    //       } else {
    //         return d_seconds + '秒前'
    //       }
    //     } else if (d_days >= 3 && d_days < 30) {
    //       return M + '-' + D + ' ' + H + ':' + m
    //     } else if (d_days >= 30) {
    //       return Y + '-' + M + '-' + D + ' ' + H + ':' + m
    //     }
    // }
  }
}
</script>

<style>
  
</style>