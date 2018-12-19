<!-- emoji选择器 -->
<template>
  <v-card color="blue-grey" class="white--text emoji-panel">
    <v-card-title>
      <h3>颜文字</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="scroll-y emoji">
      <span @click="picked">d(`･∀･)b</span>
      <span @click="picked">(∂ω∂)</span>
      <span @click="picked">_(´ཀ`」∠)_</span>
      <span @click="picked">(;´༎ຶД༎ຶ`)</span>
      <span @click="picked">(｡ì _ í｡)</span>
      <span @click="picked">(⁎⁍̴̛ᴗ⁍̴̛⁎)</span>
      <span @click="picked">(；´Д｀)</span>
      <span @click="picked">ᶘ ᵒᴥᵒᶅ</span>
      <span @click="picked">（｡・`ω´･）</span>
      <span @click="picked">（°ー°〃）</span>
      <span @click="picked">（~_~;）</span>
      <span @click="picked">（-_-）</span>
      <span @click="picked">（^_-）</span>
      <span @click="picked">（?_?）</span>
      <span @click="picked">^_^</span>
      <span @click="picked">٩(˃̶͈̀௰˂̶͈́)و</span>
      <span @click="picked">(−_−＃)</span>
      <span @click="picked">(O_o)</span>
      <span @click="picked">Σ(๑º㉨º๑ )</span>
      <span @click="picked">ꉂ೭(˵¯̴͒ꇴ¯̴͒˵)౨”</span>
      <span @click="picked">(งᵒ̌皿ᵒ̌)ง⁼³</span>
      <span @click="picked">٩(๑´3‘๑)۶</span>
      <span @click="picked">ಠ_ಠ</span>
      <span @click="picked">( ･ω･)ﾉ</span>
      <span @click="picked">(灬ºωº灬)</span>
      <span @click="picked">(๑>ᴗ<๑)</span>
      <span @click="picked">( ´◔ ‸◔')</span>
      <span @click="picked">Orz</span>
      <span @click="picked">( ´•̥̥̥ω•̥̥̥` )</span>
      <span @click="picked">(⸝⸝⸝ᵒ̴̶̥́ ⌑ ᵒ̴̶̣̥̀⸝⸝⸝)</span>
      <span @click="picked">（˙﹏˙）</span>
      <span @click="picked">●ˍ●</span>
      <span @click="picked"><（￣︶￣）></span>
      <span @click="picked">[]~（￣▽￣）~*</span>
      <span @click="picked">（￣ˇ￣）</span>
      <span @click="picked">（￣﹏￣）</span>
      <span @click="picked">（‵﹏′）</span>
      <span @click="picked">（￣ε（#￣）</span>
      <span @click="picked">（￣.￣）</span>
      <span @click="picked">╮（￣▽￣）╭</span>
      <span @click="picked">（￣▽￣）~*</span>
      <span @click="picked">（⊙ˍ⊙）</span>
      <span @click="picked">（￣▽￣）"</span>
      <span @click="picked">╮（╯▽╰）╭</span>
      <span @click="picked">（=￣ω￣=）</span>
      <span @click="picked">（￣３￣）a</span>
      <span @click="picked">（￣0 ￣）y</span>
      <span @click="picked">（。_。）</span>
      <span @click="picked">（＞﹏＜）</span>
      <span @click="picked">（→_→）</span>
      <span @click="picked">（ˇˍˇ）\</span>
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
      // if (!val) return
      // if (val.path[0].nodeName != "SPAN") return
      if (this.pick) this.pick(' '+val.target.innerText+' ')
    }
  }
}
</script>

<style scoped>
  .emoji-panel {
    width: 400px;
  }
  .emoji {
    overflow-x: hidden;
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