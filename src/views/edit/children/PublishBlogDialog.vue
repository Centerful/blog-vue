<template>
  <form-confirm-dialog v-model="flag" :params="params" :maxWidth="570" :confirm="confirm" :autoClear="true" title="博客发布">
    <v-autocomplete
      :items="columns"
      item-text="column_name"
      item-value="_id"
      v-model="column"
      label="专栏"
      hint="博客只能在一个专栏上发布，发布后便无法再选择专栏。"
      :disabled="column_flag"
      persistent-hint
      placeholder="选择专栏..."
      no-data-text="没有该专栏"
      required
      class="mb-2"
    ></v-autocomplete>
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
    }
  },
  // 使用model属性，让vue自己在父组件上绑定@update="value = $event"事件（语法糖）
  model: {
    value: 'value',
    event: 'update'
  },
  data () {
    return {
      blog_private: false,
      column_flag: false,
      columns: [
        {
          _id: '637483596khtgjfh',
          column_name: '后端技术栈'
        }, {
          _id: '832394890234dwdw',
          column_name: '前端技术栈'
        }, {
          _id: '2134jfejfwoef',
          column_name: '数据库技术栈'
        }
      ],
      column: null,
      tags: [],
      totalTags: ['Java', 'Redis', 'Node.js']
    }
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
    }
  },
  methods: {
    _initForm (data) {
      this.columns = data.total_columns
      this.totalTags = data.total_tags
      this.column = data.column
      this.tags = data.tags
      this.blog_private = data.blog_private
      // 发布人存在，发布过，无法再次选择专栏
      this.column_flag = !!data.publish_user || false
    }
  }
}
</script>

<style>
  
</style>
