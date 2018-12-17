<template>
  <form-confirm-dialog v-model="flag" :params="params" :maxWidth="570" :confirm="confirm" :autoClear="true" title="博客发布">
    <v-card-text>
      <v-autocomplete
        :items="columns"
        item-text="column_name"
        item-value="_id"
        v-model="column"
        :loading="searching"
        :search-input.sync="search"
        label="专栏"
        hint="博客只能在一个专栏上发布，发布后便无法再选择专栏。"
        :disabled="column_flag"
        persistent-hint
        :placeholder="placeholder"
        no-data-text="没有该专栏..."
        return-object
        class="mb-2"
      ></v-autocomplete>
    </v-card-text>
    <v-combobox
      v-model="tags"
      :items="totalTags"
      label="添加标签"
      chips
      hint="最多添加3个标签"
      persistent-hint
      clearable
      prepend-icon="mdi-tag"
      multiple>
      <template slot="selection" slot-scope="data">
        <v-chip :selected="data.selected" close @input="tags.splice(tags.indexOf(data.item), 1),tags = [...tags]">
          <strong>{{ data.item }}</strong>
        </v-chip>
      </template>
    </v-combobox>
    <v-switch
      :label="blog_private_name"
      v-model="blog_private"
      hint="私密博客仅自己可见"
      persistent-hint
    ></v-switch>
  </form-confirm-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    blog_id: {
      type: String,
      required: true
    },
    confirm: Function
  },
  data () {
    return {
      blog_private: false,
      column_flag: false,
      search: null,
      searching: false,
      column: null,
      entries: [],
      placeholder: '选择专栏...',
      column_name_limit: 20,
      tags: [],
      totalTags: null,
    }
  },
  // 由于v-model的多级传递，这里使用computed属性，避免当前组件直接修改props中的value，引发的vue警报。
  computed: {
    flag: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('update', val)
      }
    },
    params () {
      return {
        column: this.column,
        tags: this.tags,
        blog_private: this.blog_private
      }
    },
    blog_private_name () {
      if (this.blog_private) {
        return '私密博客'
      } else {
        return '公开博客'
      }
    },
    columns () {
      return this.entries.map(entry => {
        const column_name = entry.column_name.length > this.column_name_limit
          ? entry.column_name.slice(0, this.column_name_limit) + '...'
          : entry.column_name
        return Object.assign({}, entry, { column_name })
      })
    }
  },
  // 使用model属性，让vue自己在父组件上绑定@update="value = $event"事件（语法糖）
  model: {
    value: 'value',
    event: 'update'
  },
  watch: {
    tags (val) {
      if (val.length > 3) {
        this.$nextTick(() => this.tags.pop())
      }
    },
    value (val) {
      // 当表单打开时
      if (val) {
        // 加载blog的表单信息，以及能否修改专栏。
        this.api.getPublishSummaryById((res)=>{
          if (res.code != 0) {
            this.$bus.emit('prompt', res.message)
            return 
          }
          // 根据返回值初始化表单
          this._initForm(res.data)
        }, this.blog_id)
      }
    },
    // 查询专栏信息
    search (val) {
      if (!val) return
      if (this.searching) return
      // 采用节流策略，防止高频触发search事件
      this.searching = true
      setTimeout(() => {
        // 查询专栏信息
        this.api.getColumns((res) => {
          this.searching = false
          if (res.code != 0) {
            this.$bus.emit('prompt', res.message)
            return 
          }
          this.entries = res.data
        }, {
          keyword: this.search,
          res: ['_id', 'column_name'] // 返回字段声明,只用返回_id与column_name即可
        })
      }, 2000)
    }
  },
  methods: {
    _initForm (data) {
      this.totalTags = data.total_tags
      this.tags = data.tags
      this.blog_private = data.blog_private
      // 发布人存在，发布过，无法再次选择专栏，将专栏信息展示为
      this.column_flag = !!data.publish_user || false
      // 发布过，则将专栏的占位符设置为选择过的专栏名。
      if (data.publish_user) {
        this.placeholder = data.column_name  
      }
    }
  }
}
</script>

<style>
  
</style>
