<!-- emoji选择器 -->
<template>
  <v-card color="blue-grey" class="white--text emoji-panel">
    <v-card-title>
      <h3>颜文字</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="scroll-y emoji" @click="picked">
      <span>d(`･∀･)b</span>
      <span>(∂ω∂)</span>
      <span>_(´ཀ`」∠)_</span>
      <span>(;´༎ຶД༎ຶ`)</span>
      <span>(｡ì _ í｡)</span>
      <span>(⁎⁍̴̛ᴗ⁍̴̛⁎)</span>
      <span>(；´Д｀)</span>
      <span>ᶘ ᵒᴥᵒᶅ</span>
      <span>（｡・`ω´･）</span>
      <span>（°ー°〃）</span>
      <span>（~_~;）</span>
      <span>（-_-）</span>
      <span>（^_-）</span>
      <span>（?_?）</span>
      <span>^_^</span>
      <span>٩(˃̶͈̀௰˂̶͈́)و</span>
      <span>(−_−＃)</span>
      <span>(O_o)</span>
      <span>Σ(๑º㉨º๑ )</span>
      <span>ꉂ೭(˵¯̴͒ꇴ¯̴͒˵)౨”</span>
      <span>(งᵒ̌皿ᵒ̌)ง⁼³</span>
      <span>٩(๑´3‘๑)۶</span>
      <span>ಠ_ಠ</span>
      <span>( ･ω･)ﾉ</span>
      <span>(灬ºωº灬)</span>
      <span>(๑>ᴗ<๑)</span>
      <span>( ´◔ ‸◔')</span>
      <span>Orz</span>
      <span>( ´•̥̥̥ω•̥̥̥` )</span>
      <span>(⸝⸝⸝ᵒ̴̶̥́ ⌑ ᵒ̴̶̣̥̀⸝⸝⸝)</span>
      <span>（˙﹏˙）</span>
      <span>●ˍ●</span>
      <span><（￣︶￣）></span>
      <span>[]~（￣▽￣）~*</span>
      <span>（￣ˇ￣）</span>
      <span>（￣﹏￣）</span>
      <span>（‵﹏′）</span>
      <span>（￣ε（#￣）</span>
      <span>（￣.￣）</span>
      <span>╮（￣▽￣）╭</span>
      <span>（￣▽￣）~*</span>
      <span>（⊙ˍ⊙）</span>
      <span>（￣▽￣）"</span>
      <span>╮（╯▽╰）╭</span>
      <span>（=￣ω￣=）</span>
      <span>（￣３￣）a</span>
      <span>（￣0 ￣）y</span>
      <span>（。_。）</span>
      <span>（＞﹏＜）</span>
      <span>（→_→）</span>
      <span>（ˇˍˇ）\</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    pick: Function
  },
  data () {
    return {
    }
  },
  methods: {
    picked (val) {
      if (!val) return
      if (val.path[0].nodeName != "SPAN") return
      if (this.pick) this.pick(val.target.innerText)
    }
  }
}
</script>

<style scoped>
  .emoji-panel {
    width: 400px;
  }
  .emoji {
    max-height: 300px;
    user-select: none;
  }
  .emoji > span {
    background-color: #78909C;
    padding: 5px 8px;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;
    display: inline-flex;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)
  }
  .emoji::-webkit-scrollbar-track-piece {
    background-color:inherit;
  }
  .emoji::-webkit-scrollbar-thumb {
    background-color: #e0e0e0;
  }
  .emoji::-webkit-scrollbar {
    width: 5px;
  }
</style>