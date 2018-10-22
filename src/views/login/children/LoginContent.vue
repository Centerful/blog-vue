<template>
  <div class="login-container">
    <div class="login-logo">
      <img src="" alt="">
    </div>
    <div class="login-banner">创造极致写作体验.</div>
    <div class="login-user-avatar"></div>
    <input class="login-input" type="text" placeholder="账号">
    <input class="login-input" type="text" placeholder="密码">
    <button class="login-btn" @click="login">登 录</button>
    <div class="login-help-line"><span @click="$emit('toSwitch', 'password')">忘记密码?</span></div>
    <div class="login-split"></div>
    <div class="login-multi-bar"><span @click="$emit('toSwitch', 'visitor')">游客登录</span> / <span @click="$emit('toSwitch', 'register')">注册</span></div>
  </div>
</template>

<script>
export default {
  methods: {
    // 表单数据校验,然后提交并加载登录动画,跳转到blog页面.
    login () {
      // 1.
      this._validateForm()
      // 2.
      // _login()
      // 3.
      this.$router.push({name: 'welcome'})
    },
    _validateForm () {

    },
    _login () {
      // 2.
      // 加载动画
      let formData = {}
      this.api.login(formData).then((resp) => {
        console.log(resp)
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
