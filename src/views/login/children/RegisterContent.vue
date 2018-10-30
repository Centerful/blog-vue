<template>
  <div class="login-container">
    <div class="login-logo">
      <img src="" alt="">
    </div>
    <div class="login-banner register">创造极致写作体验.</div>
    <!-- <div class="login-user-avatar"></div> -->
    <input class="login-input" v-model="formData.user_name" type="text" :placeholder="userPlace">
    <input class="login-input" v-model="formData.password" type="text" placeholder="密码">
    <input class="login-input" v-model="formData.repassword" type="text" placeholder="重复密码">
    <button class="login-btn" @click="register">注 册</button>
    <div class="login-help-line" @click="formData.is_email = !formData.is_email">{{ toggleName }}注册</div>
    <div class="login-split"></div>
    <div class="login-multi-bar"><span @click="$emit('toSwitch', 'visitor')">游客登录</span> / <span @click="$emit('toSwitch', 'login')">用户登录</span></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        is_email: false,
        user_name: null,
        password: null,
        repassword: null
      }
    }
  },
  computed: {
    toggleName () {
      if (this.formData.is_email) {
        return '账号'
      } else {
        return '邮箱'
      }
    },
    userPlace () {
      if (!this.formData.is_email) {
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
      if (!this._validateForm()) {
        alert('表单校验错误')
        return 
      }
      // 2.
      this._register()
    },
    _validateForm () {
      // this.formData 校验
      if (!this.formData.user_name || !this.formData.password || !this.formData.repassword) {
        return false
      }
      if (this.formData.password != this.formData.repassword) {
        return false
      }
      return true
    },
    _register () {
      // 2.
      this.api.register((data) => {
        if (data.code == 1) {
          alert(data.message)
          return 
        }
        // 3.
        this.$emit('toSwitch', 'login')
      }, this.formData)
    }
  }
}
</script>

<style scoped>
  
</style>
