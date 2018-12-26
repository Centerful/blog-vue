<template>
  <v-menu z-index="30" bottom offset-y>
    <v-icon slot="activator" class="ma-2" :color="icon" style="cursor: pointer;">mdi-dots-horizontal</v-icon>
    <v-list>
    <v-list-tile v-for="(item, i) in ops" v-if="item.type.indexOf(type) != -1" :key="i" @click="options(item.code)">
      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
    </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data: () => ({
    ops: [
      // 只有feed是自己的时才有cardbtn
      {code: 'public', title: '设为公开', type: 'PRIVATE'},
      {code: 'delete', title: '删除动态', type: ['NORMAL','PRIVATE']},
      // 别人的话说不定可以添加设置为不敢兴趣功能，该功能偏社交非必须，目前暂不考虑
      // {code: 'hide', title: '不感兴趣', type: 'NOTMINE'},
    ]
  }),
  computed: {
    icon () {
      if (this.type === 'PRIVATE') {
        return 'grey lighten-3'
      } else {
        return 'grey darken-1'
      }
    }
  },
  methods: {
    options (code) {
      switch (code) {
        case 'public':
          this.$emit('public')
          break
        case 'delete':
          this.$emit('del')
          break
      }
    }
  }
}
</script>

<style>
  
</style>