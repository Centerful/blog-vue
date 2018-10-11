<template>
  <div class="head-progress-bar" :class="clss" :style="style"></div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    style () {
      const progress = this.progress
      const options = progress.options
      const style = {
        'height': options.height
      }
      return style
    },
    clss () {
      const clss = {
        'finish': this.progress.options.isShow,
        'start': this.progress.options.reStart
      }
      return clss
    },
    progress () {
      return window.ProgressBarEventBus.PB
    }
  }
}
</script>

<style scoped>
.head-progress-bar {
  position: absolute;
  bottom: -3px;
  border-radius: 3px;
  width: 100%;
  z-index: 20;
  background-color: #ff0000;
  transform-origin: left;
  opacity: 0;
}
.head-progress-bar.start {
  opacity: 1;
  animation: progressStart 5s ease-out forwards;
}
.head-progress-bar.start.finish {
  animation: progressFinish .5s ease-out forwards;
}
@keyframes progressStart {
  0% { transform:scaleX(0) }
  10% { transform:scaleX(0.2) }
  30% { transform:scaleX(0.2) }
  40% { transform:scaleX(0.4) }
  60% { transform:scaleX(0.4) }
  70% { transform:scaleX(0.6) }
  80% { transform:scaleX(0.6) }
  90% { transform:scaleX(0.8) }
  100% { transform:scaleX(0.8) }
}
@keyframes progressFinish {
  0% { transform:scaleX(0.4); opacity: 1 }
  80% { transform:scaleX(1); opacity: .5 }
  100% { transform:scaleX(1); opacity: 0 }
}
</style>
