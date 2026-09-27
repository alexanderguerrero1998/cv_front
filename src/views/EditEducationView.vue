<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface Education {
  _id: string
  name: string
  degree: string
  duration: string
  educationType: string
  description: string
  linkDownload: string
}

const form = ref<Omit<Education, '_id'>>({
  name: '',
  degree: '',
  duration: '',
  educationType: '',
  description: '',
  linkDownload: '',
})

//const API_URL = 'http://localhost:3000/api/education'
const API_URL = `${import.meta.env.VITE_API_URL}/api/education`

const route = useRoute()
const router = useRouter()
const error = ref()
const loading = ref(true)

async function uploadDataEducation() {
  try {
    const response = await fetch(`${API_URL}/${route.params.id}`)
    const data = await response.json()

    if (!response.ok) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error(data.message)
    }
    form.value = { ...data }
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message
    }
  } finally {
    loading.value = false
  }
}

async function saveEducation() {
  try {
    const response = await fetch(`${API_URL}/${route.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
      credentials: 'include',
    })
    const data = await response.json()
    if (!response.ok) {
      //noinspection ExceptionCaughtLocallyJS
      throw new Error(data.message)
    }
    router.push({ name: 'educationAdmin' })
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message
    }
  }
}

onMounted(() => {
  uploadDataEducation()
})
</script>

<template>
  <div v-if="error">{{ error }}</div>
  <div v-else-if="loading">Loading..</div>
  <div v-else>
    <div>
      <input v-model="form.name" />
      <input v-model="form.degree" />
      <input v-model="form.description" />
      <input v-model="form.educationType" />
      <input v-model="form.duration" />
      <input v-model="form.linkDownload" />
    </div>
    <button @click="saveEducation">Save</button>
  </div>
</template>
