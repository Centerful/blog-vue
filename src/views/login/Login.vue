<template>
  <div class="login">
    <div class="backdrop">
      <compontent @toSwitch="toSwitch" :is="currentTab"></compontent>
    </div>
    <FootBar></FootBar>
  </div>
</template>

<script>
import FootBar from '@/components/layout/Footer.vue'
import Login from '@/views/login/children/LoginContent.vue'
import Register from '@/views/login/children/RegisterContent.vue'
import Visitor from '@/views/login/children/VisitorContent.vue'
import Password from '@/views/login/children/PassWordReset.vue'

export default {
  data () {
    return {
      userInfo: {},
      currentTab: 'Login'
    }
  },
  created () {
  },
  methods: {
    toSwitch (data) {
      this.currentTab = data
    }
  },
  components: { Login, Register, Visitor, Password, FootBar }
}
</script>

<style>
  .backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .login-container {
    width: 280px;
    background-color: #fff;
    border-radius: 10px;
    /*box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);*/
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .login-logo {
    width: 120px;
    height: 50px;
    background-color: #7cb4bbde;
    margin-bottom: 10px;
  }
  .login-banner {
    font-style: italic;
    color: #a7a7a7;
    font-size: 0.8em;
  }
  .login-banner.register {
    margin-bottom: 20px;
  }
  .login-user-avatar {
    width: 128px;
    height: 128px;
    background-color: #ccc;
    border-radius: 50%;
    margin: 30px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 0 -2px rgba(0,0,0,.2), 0 0 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  .login-user-avatar > span {
    cursor: pointer;
  }
  .login-input {
    margin: 15px 0;
    height: 24px;
  }
  .login-btn {
    margin: 15px 0 5px 0;
    padding: 5px 15px;
  }
  .login-help-line {
    color: #a7a7a7;
    font-size: 0.8em;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .login-split {
    height: 1px;
    width: 80%;
    border-bottom: 1px solid #ccc;
    margin: 10px;
  }
  .login-multi-bar {
    color: #a7a7a7;
    font-size: 0.8em;
    margin-bottom: 10px;
    cursor: default;
  }
  .login-multi-bar > span {
    cursor: pointer;
  }
  .login-logo.logging {
    width: 192px;
    height: 80px;
  }
  .login-banner.logging {
    color: #757575;
    font-size: 0.9em;
  }
  .logging-placeholder {
    width: 192px;
    height: 100px;
  }

  .login-container.overlay {
    box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);
    z-index: 1100;
  }
  .text-field {
    font-size: 14px;
  }
</style>