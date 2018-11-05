<template>
  <div class="footer">
    Website design by <span>Centerful.</span>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .footer {
    color: #aaa;
    font-size: 0.7em;
    position: fixed;
    bottom: 5px;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 0;
    letter-spacing: 0.3px;
  }
  .footer > span {
    margin: 0 5px;
    cursor: pointer;
    font-style: italic;
  }
</style>
