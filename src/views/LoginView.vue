<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = ref({ email: '', password: '' })
const error = ref('')

async function login() {
  error.value = ''
  try {
    await auth.login(form.value)
    router.push({ name: 'admin' })
  } catch (e) {
    if (e instanceof Error) error.value = e.message
  }
}
</script>

<template>
  <h1>Login</h1>
  <div v-if="error">{{ error }}</div>
  <div>
    <input v-model="form.email" type="email" placeholder="Email" />
    <input v-model="form.password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>
