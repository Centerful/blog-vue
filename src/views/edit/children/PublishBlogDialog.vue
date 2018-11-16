<template>
  <form-confirm-dialog v-model="value" :maxWidth="570" :confirm="confirm" :autoClear="true" title="博客发布">
    <v-autocomplete
      :items="columns"
      item-text="column_name"
      item-value="_id"
      v-model="column"
      label="专栏"
      placeholder="选择专栏..."
      no-data-text="没有该专栏"
      required
    ></v-autocomplete>
    <v-combobox
      v-model="chips"
      :items="tags"
      label="添加标签"
      chips
      hint="最多添加3个标签"
      persistent-hint
      clearable
      prepend-icon="mdi-tag"
      multiple>
      <template slot="selection" slot-scope="data">
        <v-chip :selected="data.selected" close @input="chips.splice(chips.indexOf(data.item), 1),chips = [...chips]">
          <strong>{{ data.item }}</strong>
        </v-chip>
      </template>
    </v-combobox>
  </form-confirm-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    confirm: Function
  },
  data () {
    return {
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
      chips: [],
      tags: ['Java', 'Redis', 'Node.js']
    }
  },
  watch: {
    chips (val) {
      if (val.length > 3) {
        this.$nextTick(() => this.chips.pop())
      }
    }
  }
}
</script>

<style>
  
</style>
