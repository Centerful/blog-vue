<template>
  <div>
    <v-textarea
      ref="tinput"
      v-model="content"
      auto-grow
      outline
      label="动态"
      placeholder="这一刻的想法..."
      rows="1"
      autofocus
      name="tinput"
    ></v-textarea>
    <v-btn @click="insertText">Hello World!</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    content: '',
    text: 'Hello World!'
  }),
  methods: {
    insertText () {
      debugger;
      console.log(this.$refs.tinput)
      console.log(this.$refs.tinput.selectionStart)
      this._insertSomething('tinput', 'Hello World!')
    },
    _insertSomething(inputName ,val) {
      let textArea = document.getElementsByName(inputName)[0];
      let startPos = textArea.selectionStart,
      endPos = textArea.selectionEnd,
      cursorPos = startPos,
      tmpStr = textArea.value
      if (val === null) {
          return;
      }
      // insert:
      this.content = tmpStr.substring(0, startPos) + val + tmpStr.substring(endPos, tmpStr.length)
      // move cursor:
      setTimeout(() => {
        cursorPos += val.length
        textArea.selectionStart = textArea.selectionEnd = cursorPos
        textArea.focus()
      }, 10)
    }
  }

}
  
</script>

<style>
  
</style>