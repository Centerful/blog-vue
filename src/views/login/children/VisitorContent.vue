<template>
  <div class="login-container">
    <div class="login-logo">
      <img src="" alt="">
    </div>
    <div class="login-banner">创造极致写作体验.</div>
    <div class="login-user-avatar"><span>Pick One</span></div>
    <input class="login-input" type="text" v-model="formData.nick_name" placeholder="名称">
    <input class="login-input" type="text" v-model="formData.email" placeholder="邮箱">
    <button class="login-btn" @click="visitor">登录</button>
    <div class="login-split"></div>
    <div class="login-multi-bar"><span @click="$emit('toSwitch', 'login')">用户登录</span> / <span @click="$emit('toSwitch', 'register')">注册</span></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        nick_name: null,
        email: null,
        user_avatar: null
      }
    }
  },
  methods: {
    // 游客登录
    // 表单数据校验,然后提交并加载登录动画,跳转到blog页面.
    visitor () {
      // 1.
      if (!this._validateForm()) {
        alert('表单校验错误')
        return 
      }
      // 2.
      this._visitor()
    },
    _validateForm () {
      if (!this.formData.nick_name) {
        return false
      }
      return true
    },
    _visitor () {
      // 2.
      // 加载动画
      this.api.visitor((data) => {
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
