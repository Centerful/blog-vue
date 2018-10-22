<template>
  <div class="login-container">
    <div class="login-logo">
      <img src="" alt="">
    </div>
    <div class="login-banner">创造极致写作体验.</div>
    <div class="login-user-avatar"><span>Pick One</span></div>
    <input class="login-input" type="text" placeholder="名称">
    <input class="login-input" type="text" placeholder="邮箱">
    <button class="login-btn" @click="visitor">登录</button>
    <div class="login-split"></div>
    <div class="login-multi-bar"><span @click="$emit('toSwitch', 'login')">用户登录</span> / <span @click="$emit('toSwitch', 'register')">注册</span></div>
  </div>
</template>

<script>
export default {
  methods: {
    // 游客登录
    // 表单数据校验,然后提交并加载登录动画,跳转到blog页面.
    visitor () {
      // 1.
      this._validateForm()
      // 2.
      // _visitor()
      // 3.
      this.$router.push({name: 'welcome'})
    },
    _validateForm () {

    },
    _visitor () {
      // 2.
      // 加载动画
      let formData = {}
      this.api.visitor(formData).then((resp) => {
        console.log(resp);
        // 结束动画
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  
</style>
