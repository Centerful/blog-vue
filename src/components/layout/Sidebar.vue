<template>
  <div class="multi-bar">
    <div class="columns-btn btn"><router-link to="/columns">
      <v-tooltip class="tip-btn" right nudge-right="5">
        <v-icon slot="activator">mdi-widgets</v-icon>
        <span>专栏</span>
      </v-tooltip>
    </router-link></div>
    <div class="blog-btn btn"><router-link to="/blog">
      <v-tooltip class="tip-btn" right nudge-right="5">
        <v-icon slot="activator">mdi-book-open-variant</v-icon>
        <span>博客</span>
      </v-tooltip>
    </router-link></div>
    <div class="talk-btn btn"><router-link to="/feed">
      <v-tooltip class="tip-btn" right nudge-right="5">
        <v-icon slot="activator">mdi-forum</v-icon>
        <span>动态</span>
      </v-tooltip>
    </router-link></div>
    <div class="edit-btn btn"><router-link to="/edit">
      <v-tooltip class="tip-btn" right nudge-right="5">
        <!-- <v-icon slot="activator">mdi-pencil</v-icon> -->
        <v-icon slot="activator">mdi-circle-edit-outline</v-icon>
        <span>编辑</span>
      </v-tooltip>
    </router-link></div>
    <div class="talk-btn btn"><router-link to="/lab">
      <v-tooltip class="tip-btn" right nudge-right="5">
        <v-icon slot="activator">mdi-creation</v-icon>
        <span>实验室</span>
      </v-tooltip>
    </router-link></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .fa-icon {
    width: auto;
    height: 1em;
    max-width: 100%;
    max-height: 100%;
    font-size: 1.2em;
    color: #777;
  }
  .multi-bar {
    position: fixed;
    /*
    居中的button
    left: 1%;
    bottom: 3.5%;
    width: 60px;
    height: 85%;
    */
    /*左下角button*/
    left: 2%;
    bottom: 4.5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btn{
    width: 40px;
    height: 40px;
    background-color: #757575;
    margin: 3px 0;
    /**/
    will-change: box-shadow;
    border-radius: 50%;
    cursor: pointer;

    background-color: inherit;
    border-color: #fff;
    transition: all 0.5s ease-out;
  }
  .btn:hover{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1px 1px, rgba(0, 0, 0, 0.14) 0px 3px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background-color: #cacaca;
    transition: background-color 0.5s ease-out;
  }
  .btn:active {
    background-color: #ccc;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 15px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px;
    transition: background-color 0.5s ease-out;
  }
  .btn > a {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tip-btn {
    height: 24px;
  }
</style>
