<template>
  <div :id="id">
    <link href="static/editor.md/css/editormd.min.css" rel="stylesheet">
    <textarea style="display:none;"></textarea>
  </div>
</template>

<script>
// if (typeof window !== 'undefined') {
//   var $s = require('scriptjs')
// }
import $s from 'scriptjs'
let thisEditor = null

export default {
  props: {
    type: {
      type: String,
      default: 'editor'
    },
    id: {
      type: String,
      default: 'editor-md'
    },
    editorConfig: {
      type: Object,
      default () {
        return {
          path: 'static/editor.md/lib/',
          width: '100%',
          syncScrolling: 'single',
          autoHeight: true,
          placeholder: '写点什么...',
          watch: false,
          toolbarIcons: function () {
            return [ 'bold', 'del', 'italic', 'quote', 'list-ul', 'list-ol', 'hr', '|', 'link', 'reference-link', 'image', 'code', 'preformatted-text', 'code-block', 'table', '||', 'watch', 'myPreview', 'fullscreen', 'help' ]
          },
          toolbarIconsClass: {
            // 指定一个FontAawsome的图标类
            myPreview: 'fa-desktop'
          },
          toolbarHandlers: {
            myPreview: function (cm, icon, cursor, selection) {
              this.watch()
              this.unwatch()
              this.previewing()
            }
          },
          lang: {
            toolbar: {
              myPreview: '预览文章'
            }
          },
          onload () {
            $("i[name='watch']").parent().css('display', 'none')
            $('.editormd').css('border', 'none')
            $('.CodeMirror-lines').css('marginBottom', '350px')
            $('.CodeMirror-gutters').css('border', 'none').css('backgroundColor', '#FFF')
            $('.editormd-html-preview, .editormd-preview-container').css('fontSize', '15px')
            // $('.editormd .CodeMirror pre').css('fontSize', '15px') 修改的edit-lib的css文件
          },
          onwatch () {
          },
          onpreviewing () {
            $('.editormd-preview-container').css('padding', '20px 5px 50px 5px')
            $('.editormd-preview').css('position', 'relative')
          },
          onpreviewed () {
          },
          onfullscreen () {
            this.watch()
            $("i[name='watch']").parent().css('display', 'inline-block')
            $("i[name='myPreview']").parent().css('display', 'none')
          },
          onfullscreenExit () {
            this.unwatch()
            $("i[name='watch']").parent().css('display', 'none')
            $("i[name='myPreview']").parent().css('display', 'inline-block')
            $(".CodeMirror-vscrollbar").css('display', 'none')
          }
        }
      }
    }
  },
  data () {
    return {
      editorPath: 'static/editor.md'
    }
  },
  created () {
    this.eventListener()
  },
  mounted () {
    $s([ `${this.editorPath}/../jquery.min.js`, `${this.editorPath}/lib/raphael.min.js`, `${this.editorPath}/lib/flowchart.min.js` ],
      () => {
        $s([ `${this.editorPath}/../xss.min.js`, `${this.editorPath}/lib/marked.min.js`, `${this.editorPath}/lib/prettify.min.js`, `${this.editorPath}/lib/underscore.min.js`, `${this.editorPath}/lib/sequence-diagram.min.js`, `${this.editorPath}/lib/jquery.flowchart.min.js` ],
          () => {
            $s(`${this.editorPath}/editormd.js`, () => {
              this.initEditor()
            })
            $s(`${this.editorPath}/../highlight/highlight.min.js`, () => {
              hljs.initHighlightingOnLoad()
            })
          })
      })
    this.$nextTick(() => {
    })
  },
  methods: {
    initEditor () {
      this.$nextTick((editormd = window.editormd) => {
        if (editormd) {
          thisEditor = editormd(this.id, this.editorConfig)
        }
      })
    },
    eventListener () {
      this.$bus.on('setBlogText', this.setBlogText)
      this.$bus.on('clearBlogText', this.clearBlogText)
    },
    setBlogText (blogText) {
      thisEditor.setMarkdown(blogText)
    },
    clearBlogText () {
      thisEditor.setMarkdown(null)
    }
  }
}
</script>

<style scoped>
  /*.editormd {
    border: none !important;
  }*/
</style>
