<template>
  <div class="login-container">
    <h2>Password Reset!</h2>
    <div class="login-split"></div>
    <div class="login-multi-bar"><span @click="$emit('toSwitch', 'login')">用户登录</span> / <span @click="$emit('toSwitch', 'register')">注册</span></div>
  </div>
</template>

<script>
  
</script>

<style scoped>
  
</style>