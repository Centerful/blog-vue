<template>
  <v-card class="login-container" raised>
    <div></div>
    <div class="login-logo">
      <img src="" alt="">
    </div>
    <div class="login-banner">创造极致写作体验.</div>
    <v-form ref="loginForm" v-model="valid">
      <div class="login-user-avatar"></div>
      <v-text-field 
        class="text-field" 
        v-model="formData.user_name"
        label="账号"
        :rules="userNameRules"
        required>
      </v-text-field>
      <v-text-field 
        class="text-field"
        v-model="formData.password" 
        :type="pwShow ? 'text' : 'password'" 
        label="密码"
        :counter="32" 
        :rules="passwordRules"
        :append-icon="pwShow ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="pwShow = !pwShow"
        required >
      </v-text-field>
    </v-form>
    <!-- <button  class="login-btn" @click="login">登 录</button> -->
    <v-btn 
      color="info" 
      :disabled="!valid"
      @click="login">
      登 录
    </v-btn>
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
      },
      valid: false,
      // 账户校验
      userNameRules: [
        v => {
          if (!v) {
            return "账号不能为空"
          }
          if (v.length < 8) {
            return "长度不能少于八位"
          }
          if (v.length > 32) {
            return "长度不能大于三十二位"
          }
          return true
        }
      ],
      // 密码校验
      passwordRules: [
        v => {
          if (!v) {
            return "密码不能为空"
          }
          if (v.length < 8) {
            return "长度不能少于八位"
          }
          if (v.length > 32) {
            return "长度不能大于三十二位"
          }
          return true
        }
      ]
    }
  },
  methods: {
    // 表单数据校验,然后提交并加载登录动画,跳转到blog页面.
    login () {
      // 1.
      if (!this.$refs.loginForm.validate()) {
        return 
      }
      // 2.
      // 加载动画
      this._login()
    },
    _login () {
      this.api.login((res) => {
        // 3.
        // 结束动画
        if (res.code == 1) {
          this.$bus.emit('dialog', res.message)
          return 
        }
        this.$router.push({name: 'welcome'})
      }, this.formData)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
