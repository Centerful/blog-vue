<template>
  <v-card class="login-container" raised>
    <div></div>
    <div class="login-logo">
      <img src="" alt="">
    </div>
    <div class="login-banner register">创造极致写作体验.</div>
    <v-form ref="loginForm" v-model="valid">
      <v-text-field 
        class="text-field" 
        v-model="formData.user_name"
        :label="userPlace"
        :rules="userNameRules"
        required>
      </v-text-field>
      <v-text-field 
        class="text-field"
        v-model="formData.password" 
        :type="pwShow ? 'text' : 'password'" 
        label="密码"
        :rules="passwordRules"
        :append-icon="pwShow ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="pwShow = !pwShow"
        required >
      </v-text-field>
      <v-text-field 
        class="text-field"
        v-model="formData.repassword" 
        :type="repwShow ? 'text' : 'password'" 
        label="重复密码"
        :rules="repasswordRules"
        :append-icon="repwShow ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="repwShow = !repwShow"
        required >
      </v-text-field>
    </v-form>
    <v-btn 
      color="info" 
      :disabled="!valid"
      @click="register">
      注 册
    </v-btn>
    <div class="login-help-line" @click="emailRegister">{{ toggleName }}注册</div>
    <div class="login-split"></div>
    <div class="login-multi-bar"><span @click="$emit('toSwitch', 'visitor')">游客登录</span> / <span @click="$emit('toSwitch', 'login')">用户登录</span></div>
  </v-card>
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
      },
      repwShow: false,
      pwShow: false,
      repwShow: false,
      valid: false,
      // 账户校验
      userNameRules: [
        v => {
          if (!v && this.formData.is_email) {
            return "邮箱不能为空"
          }
          if (!v) {
            return "账号不能为空"
          }
          if (this.formData.is_email && !/.+@.+/.test(v)) {
            return "无效邮箱"
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
      ],
      repasswordRules: [
        v => {
          if (!v) {
            return "重复密码不能为空"
          }
          if (v != this.formData.password) {
            return '两次输入的密码不一致'
          }
          return true
        }
      ]
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
      if (!this.$refs.loginForm.validate()) {
        return 
      }
      // 2.
      this._register()
    },
    emailRegister () {
      this.formData.is_email = !this.formData.is_email
      this.formData.user_name = null
    },
    _register () {
      // 2.
      this.api.register((data) => {
        if (data.code == 1) {
          this.$bus.emit('prompt', data.message)
          return 
        }
        // 3.
        this.$emit('toSwitch', 'login')
      }, this.formData)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
