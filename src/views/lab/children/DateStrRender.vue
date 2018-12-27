<script>
export default {
  props: {
    datetime: {
      type: [String, Date],
      required: true
    },
    // 是否显示绝对日期
    abs: {
      type: Boolean,
      required: false
    },
    format: {
      type: String,
      default: 'MM-dd hh:mm'
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'right'
    },
    display: {
      type: String,
      default: 'd-inline'
    },
    margin: {
      type: String,
      default: 'mx-2'
    },
    fontSize: {
      type: String,
      default: 'caption'
    }
  },
  render (h) {
    if (this.tooltip) // 显示tips
      return h('v-tooltip', // 根元素
        { // 根元素的属性设置
          attrs: this.direct
        }, 
        [ // 子元素，数组形式可以是多个，每个里面都是对象
          h('v-flex', { // v-flex
            attrs: this.font,
            style: {
              userSelect: 'none'
            },
            class: this.class_style,
            slot: 'activator'
          }, this.dateStr),
          h('span', this.absolute) // span 提示窗
        ]
      )
    else // 不显示tips
      return h('v-flex', {
        attrs: this.font,
        style: {
          userSelect: 'none'
        },
        class: this.class_style
      }, this.dateStr)
  },
  computed: {
    direct () {
      let d = {}
      d[this.direction] = ''
      return d
    },
    font () {
      let d = {}
      d[this.fontSize] = ''
      return d
    },
    dateStr () {
      return this.abs ? this.absolute : this.relative
    },
    absolute () {
      return this.utils.dateFmt(new Date(this.datetime), this.format)
    },
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
  },
}
</script>