<template>
  <div class="login-container">
    <div class="login-logo">
      <img src="" alt="">
    </div>
    <div class="login-banner">创造极致写作体验.</div>
    <div class="login-user-avatar"></div>
    <input class="login-input" type="text" v-model="formData.user_name" placeholder="账号">
    <input class="login-input" type="text" v-model="formData.password" placeholder="密码">
    <button class="login-btn" @click="login">登 录</button>
    <div class="login-help-line"><span @click="$emit('toSwitch', 'password')">忘记密码?</span></div>
    <div class="login-split"></div>
    <div class="login-multi-bar"><span @click="$emit('toSwitch', 'visitor')">游客登录</span> / <span @click="$emit('toSwitch', 'register')">注册</span></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        user_name: null,
        password: null
      }
    }
  },
  methods: {
    // 表单数据校验,然后提交并加载登录动画,跳转到blog页面.
    login () {
      // 1.
      if (!this._validateForm()) {
        alert('表单校验错误')
      }
      // 2.
      // 加载动画
      this._login()
    },
    _validateForm () {
      if (!this.formData.user_name || !this.formData.password) {
        return false
      }
      return true
    },
    _login () {
      this.api.login((data) => {
        // 3.
        // 结束动画
        if (data.code == 1) {
          alert(data.message)
          return 
        }
        this.$router.push({name: 'welcome'})
      }, this.formData)
    }
  }
}
</script>

<style scoped>

</style>
