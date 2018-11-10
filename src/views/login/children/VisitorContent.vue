<template>
  <v-card class="login-container" raised>
    <div></div>
    <div class="login-logo">
      <img src="" alt="">
    </div>
    <div class="login-banner">创造极致写作体验.</div>
    <v-form ref="loginForm" v-model="valid">
      <div class="login-user-avatar"><span>Pick One</span></div>
      <v-text-field 
        class="text-field" 
        v-model="formData.nick_name"
        label="名称"
        :rules="nickNameRules"
        required>
      </v-text-field>
      <v-text-field
        class="text-field" 
        v-model="formData.email"
        label="邮箱"
        :rules="emailRules"
        required>
      </v-text-field>
    </v-form>
    <v-btn 
      color="info" 
      :disabled="!valid"
      @click="visitor">
      登 录
    </v-btn>
    <div class="login-split"></div>
    <div class="login-multi-bar"><span @click="$emit('toSwitch', 'login')">用户登录</span> / <span @click="$emit('toSwitch', 'register')">注册</span></div>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      formData: {
        nick_name: null,
        email: null,
        user_avatar: null
      },
      // 账户校验
      nickNameRules: [
        v => {
          if (!v) {
            return "名称不能为空"
          }
          if (v.length > 32) {
            return "长度不能大于三十二位"
          }
          return true
        }
      ],
      // 邮箱校验
      emailRules: [
        v => {
          if (!v) {
            return true
          }
          if (!/.+@.+/.test(v)) {
            return '无效邮箱' 
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
    // 游客登录
    // 表单数据校验,然后提交并加载登录动画,跳转到blog页面.
    visitor () {
      // 1.
      if (!this.$refs.loginForm.validate()) {
        return 
      }
      // 2.
      this._visitor()
    },
    _visitor () {
      // 2.
      // 加载动画
      this.api.visitor((data) => {
        // 3.
        // 结束动画
        if (data.code == 1) {
          this.$bus.emit('prompt', data.message)
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
