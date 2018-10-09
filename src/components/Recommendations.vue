<template>
  <div class="blog-recommendations">
    <div class="blog-recommendations-container">
      <div class="recommendations-name">推荐阅读</div>
      <div class="recommendations-list">
        <!-- 这里的btn可以放在卡片的两端. -->
        <div class="recommendations-left">
          <div class="recommendations-btn left">
            <icon class="angle-left" name="angle-left"/>
          </div>
        </div>
        <div class="recommendations-items">
          <div class="recommendations-item"></div>
          <div class="recommendations-item"></div>
          <div class="recommendations-item"></div>
          <div class="recommendations-item"></div>
        </div>
        <div class="recommendations-right">
          <div class="recommendations-btn right">
            <icon class="angle-right" name="angle-right"/>
          </div>
        </div>
      </div>
    </div>
    <div class="blog-recommendations-blur"></div>
  </div>
</template>

<style scoped>
  .blog-recommendations {
    position: relative;
    width: 100%;
    height: 271px;
  }
  .blog-recommendations-container {
    width: 100%;
    background-color: #eaeaea;
    position: absolute;
    z-index: 2;
  }
  .recommendations-name {
    margin: 0 10%;
    padding: 30px 0 10px 0;
    margin: 5;
    font-size: 0.97em;
    font-weight: 550;
    color: #232323;
    border-bottom: 1px solid #dadada;
  }
  .recommendations-list {
    padding: 20px 0 30px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .recommendations-btn {
    width: 43px;
    height: 43px;
    background-color: #757575;
    /*box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px;*/
    will-change: box-shadow;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: inherit;
    transition: all 0.2s ease-out;
  }
  .angle-right {
    font-size: 1.5em;
    position: relative;
    left: 1px;
    color: #a2a2a2;
  }
  .angle-left {
    font-size: 1.5em;
    position: relative;
    right: 1px;
    color: #a2a2a2;
  }
  .recommendations-btn:hover {
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px;
    transition: all 0.2s ease-out;
  }
  .recommendations-btn:active {
    background-color: #ccc;
    transition: all 0.1s ease-out;
  }
  .recommendations-btn.left {
    margin-left: 20px;
  }
  .recommendations-btn.right {
    margin-right: 20px;
  }
  .recommendations-btn > i {
    font-size: 1.7em;
    color: #636363;
    font-weight: bold;
  }
  .recommendations-items {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .recommendations-item {
    width: 160px;
    height: 160px;
    margin: auto;
    background-color: rgb(157, 177, 197);
  }
  .blog-recommendations-blur {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    filter: blur(8px);
    z-index: 1;
    background-color: #eaeaea;
  }
</style>
