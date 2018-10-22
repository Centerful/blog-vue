<template>
  <div class="login-container">
    <div class="login-logo">
      <img src="" alt="">
    </div>
    <div class="login-banner register">创造极致写作体验.</div>
    <!-- <div class="login-user-avatar"></div> -->
    <input v-if="isEmail" class="login-input" name="email" type="text" placeholder="邮箱">
    <input v-else class="login-input" name="username" type="text" placeholder="账号">
    <input class="login-input" name="password" type="text" placeholder="密码">
    <input class="login-input" name="repassword" type="text" placeholder="重复密码">
    <div class="">
      <input name="sex" type="radio" checked="checked"/>男
      <input name="sex" type="radio" />女
    </div>
    <button class="login-btn" @click="register">注 册</button>
    <div class="login-help-line" @click="isEmail = !isEmail">{{ toggleName }}注册</div>
    <div class="login-split"></div>
    <div class="login-multi-bar"><span @click="$emit('toSwitch', 'visitor')">游客登录</span> / <span @click="$emit('toSwitch', 'login')">用户登录</span></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isEmail: false
    }
  },
  computed: {
    toggleName () {
      if (this.isEmail) {
        return '账号'
      } else {
        return '邮箱'
      }
    }
  },
  methods: {
    // 表单数据校验,然后提交-成功后显示注册成功,切换到login页面进行登录..
    register () {
      // 1.
      this._validateForm()
      // 2.
      // this._register()
      // 3.
      this.$emit('toSwitch', 'login')
    },
    _validateForm () {

    },
    _register () {
      // 2.
      let formData = {}
      this.api.register(formData).then((resp) => {
        console.log(resp);
        // 显示注册成功
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  
</style>
