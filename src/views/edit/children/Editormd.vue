<template>
  <div :id="id">
    <link href="static/editor.md/css/editormd.min.css" rel="stylesheet">
    <textarea style="display:none;">
    </textarea>
  </div>
</template>

<script>
if (typeof window !== 'undefined') {
  var $s = require('scriptjs')
}

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
    editorConfig2: {
      type: Object,
      default () {
        return {
          path: 'static/editor.md/lib/',
          height: 1000,
          taskList: true,
          tex: true,
          flowChart: true,
          sequenceDiagram: true,
          syncScrolling: 'single',
          htmlDecode: 'style,script,iframe|filterXSS',
          imageUpload: true,
          imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp', 'JPG', 'JPEG', 'GIF', 'PNG', 'BMP', 'WEBP'],
          imageUploadURL: '/api/page/uploadImg',
          onload: () => {
            console.log('editor-md is onload!')
          }
        }
      }
    },
    editorConfig: {
      type: Object,
      default () {
        return {
          path: 'static/editor.md/lib/',
          width: '100%',
          syncScrolling: 'single',
          autoHeight: true,
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
              console.log(this)
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
          onload: function () {
            $("i[name='watch']").parent().css('display', 'none')
          },
          onwatch: function () {
          },
          onpreviewing: function () {
            $('.editormd-preview-container').css('padding', '20px 5px 50px 5px')
            $('.editormd-preview').css('position', 'relative')
          },
          onpreviewed: function () {
          },
          onfullscreen: function () {
            this.watch()
            $("i[name='watch']").parent().css('display', 'inline-block')
            $("i[name='myPreview']").parent().css('display', 'none')
          },
          onfullscreenExit: function () {
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
  mounted () {
    $s([ `${this.editorPath}/../jquery.min.js`, `${this.editorPath}/lib/raphael.min.js`, `${this.editorPath}/lib/flowchart.min.js` ],
      () => {
        $s([ `${this.editorPath}/../xss.min.js`, `${this.editorPath}/lib/marked.min.js`, `${this.editorPath}/lib/prettify.min.js`, `${this.editorPath}/lib/underscore.min.js`, `${this.editorPath}/lib/sequence-diagram.min.js`, `${this.editorPath}/lib/jquery.flowchart.min.js` ],
          () => {
            $s(`${this.editorPath}/editormd.js`, () => {
              this.initEditor()
            })
            $s(`${this.editorPath}/../highlight/highlight.min.js`, () => {
              // hljs.initHighlightingOnLoad()
            })
          })
      })
  },
  methods: {
    initEditor () {
      this.$nextTick((editormd = window.editormd) => {
        if (editormd) {
          editormd(this.id, this.editorConfig)
        }
      })
    }
  }
}
</script>

<style scoped>
  .editormd {
    border: none !important;
  }
</style>
