import { defineStore } from 'pinia'
import { ref } from 'vue'

//const API_URL = 'http://localhost:3000/auth'
const API_URL = `${import.meta.env.VITE_API_URL}/auth`


export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const email = ref('')

  async function login(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include'
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message)
    }

    const data = await response.json()
    isAuthenticated.value = true
    email.value = data.email
  }

  async function logout() {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    isAuthenticated.value = false
    email.value = ''
  }

  async function checkAuth() {
    try {
      const response = await fetch(`${API_URL}/me`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        isAuthenticated.value = true
        email.value = data.email
      } else {
        isAuthenticated.value = false
      }
    } catch {
      isAuthenticated.value = false
    }
  }

  return { isAuthenticated, email, login, logout, checkAuth }
})
