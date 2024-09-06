<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { IUserInfo, LoginType, XterEventEmiter, XterioAuth } from '@xterio-sdk/auth'

defineProps<{ msg: string }>()

const userinfo = ref('')
const isLogin = ref(XterioAuth.isLogin)

onMounted(() => {
  XterEventEmiter.subscribe((res: IUserInfo) => {
    console.log('info1=', res)
    userinfo.value = JSON.stringify(res)
    isLogin.value = XterioAuth.isLogin
  })
})
onUnmounted(() => {
  XterEventEmiter.unsubscribe()
})

const login = (mode?: LoginType) => {
  XterioAuth.login(mode)
}
const logout = () => {
  XterioAuth.logout()
  userinfo.value = ''
  isLogin.value = XterioAuth.isLogin
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <div className="card">
    <p>是否登录: {{ isLogin ? 'true' : 'false' }}</p>
    <p>用户信息: {{ userinfo }}</p>
    <button @click="login()">默认登录</button>
    <button @click="login(LoginType.Email)">邮箱登录</button>
    <button @click="login(LoginType.Mini)">TT 登录</button>
    <button @click="logout()">退出登录</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
