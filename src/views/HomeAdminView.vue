<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

async function logout() {
  await auth.logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <h1>Home Admin</h1>


  <RouterLink :to="{name:'projectAdmin'}">
    Projects
  </RouterLink>

  <RouterLink :to="{name:'educationAdmin'}">
    Education
  </RouterLink>

  <RouterLink :to="{name:'profileAdmin'}">
    Profile
  </RouterLink>

  <RouterLink :to="{name:'sectionAdmin'}">
    Section
  </RouterLink>
  <button @click="logout">Logout</button>
</template>
