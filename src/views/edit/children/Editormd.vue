<template>
  <div :id="id">
    <link href="static/editor.md/css/editormd.min.css" rel="stylesheet">
    <textarea v-html="blogContent" style="display:none;"></textarea>
  </div>
</template>

<script>
// if (typeof window !== 'undefined') {
//   var $s = require('scriptjs')
// }
import $s from 'scriptjs'

export default {
  props: {
    // 当type为html时,blogContent必填.
    blogContent: {
      type: String
    },
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
            $('.CodeMirror-gutters').css('border', 'none').css('backgroundColor', '#FFF')
            $('.CodeMirror-lines').css('marginBottom', '350px')
            $('.editormd').css('border', 'none')
            $("i[name='watch']").parent().css('display', 'none')
            this.watch()
            this.unwatch()
          },
          onwatch () {
          },
          onpreviewing () {
            this.isPreview = true
            $('.editormd-preview-container').css('padding', '20px 5px 50px 5px')
            $('.editormd-preview').css('position', 'relative')
          },
          onpreviewed () {
            this.isPreview = false
          },
          onfullscreen () {
            this.watch()
            $("i[name='watch']").parent().css('display', 'inline-block')
            $("i[name='myPreview']").parent().css('display', 'none')
            $('.CodeMirror-scroll').attr('style', 'overflow:scroll !important;');
          },
          onfullscreenExit () {
            this.unwatch()
            $("i[name='watch']").parent().css('display', 'none')
            $("i[name='myPreview']").parent().css('display', 'inline-block')
            $(".CodeMirror-vscrollbar").css('display', 'none')
            $('.CodeMirror-scroll').attr('style', 'overflow:hidden !important;');
          }
        }
      }
    }
  },
  data () {
    return {
      editorPath: 'static/editor.md',
      instance: null,
      md5: null
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
  },
  methods: {
    initEditor () {
      this.$nextTick((editormd = window.editormd) => {
        if (editormd) {
          if (this.type == 'editor') {
            this.instance = editormd(this.id, this.editorConfig)  
          } else {
            this.instance = editormd.markdownToHTML(this.id, this.editorConfig);
          }
        }
        this.md_css()
      })
      // 当editormd加载完成后 循环检测blog内容是否被修改过.
      this.$nextTick(() => {
        setInterval(() => {
          this.loop()
        }, 3000)
      })
    },
    md_css () {
      $('.editormd-html-preview, .editormd-preview-container').css('fontSize', '15px')
      if (this.type == 'html') {
        $('.editormd-html-preview, .editormd-preview-container').css('padding', '0')
        $('.editormd-html-preview, .editormd-preview-container').css('paddingTop', '10px')
      }
    },
    eventListener () {
      // 编辑页面才会 监听该事件
      if (!this.blogContent) {
        this.$bus.on('setBlogContent', this.setBlogContent)  
      }
    },
    setBlogContent (content) {
      this.instance.setMarkdown(content)
      if (this.instance.isPreview) {
        this.instance.previewing()
      }
      // md5替换一下。
      this.md5 = this.utils.md5Str(content || '')
      $('.CodeMirror-scroll').attr('style', 'overflow:hidden !important;');
    },
    /**
     * 每隔3s检测blog内容是否被修改过?
     */
    loop () {
      // md5 为null,则是第一次.
      if (!this.md5) {
        this.md5 = this.utils.md5Str(this.instance.getMarkdown() || '')
        return 
      }
      // md5值是否变更过.
      let newMD5 = this.utils.md5Str(this.instance.getMarkdown() || '')
      if (this.md5 != newMD5) {
        this.md5 = newMD5
        this.$emit('writed', this.instance.getMarkdown())
      }
    }
  }
}
</script>

<style scoped>
  /*.editormd {
    border: none !important;
  }*/
</style>
