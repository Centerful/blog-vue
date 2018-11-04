<template>
  <v-card class="login-container" raised>
    <div class="login-logo">
      <img src="" alt="">
    </div>
    <div class="login-banner">创造极致写作体验.</div>
    <v-form v-model="valid">
      <div class="login-user-avatar"></div>
      <v-text-field v-model="formData.user_name" :counter="24" label="账号" required></v-text-field>
      <v-text-field 
        v-model="formData.password" 
        :type="pwShow ? 'text' : 'password'" 
        label="密码" 
        :append-icon="pwShow ? 'Off' : 'vi'"
        @click:append="pwShow = !pwShow"
        required ></v-text-field>

    </v-form>
    <button class="login-btn" @click="login">登 录</button>
    <div class="login-help-line"><span @click="$emit('toSwitch', 'password')">忘记密码?</span></div>
    <div class="login-split"></div>
    <div class="login-multi-bar"><span @click="$emit('toSwitch', 'visitor')">游客登录</span> / <span @click="$emit('toSwitch', 'register')">注册</span></div>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      pwShow: false,
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
        return 
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
