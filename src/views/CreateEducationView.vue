<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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

const router = useRouter()
const error = ref('')

async function createEducation() {
  error.value = '' // Clean before of each attempt
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
      credentials: 'include',
    })
    const data = await response.json()
    if (!response.ok) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error(data.message)
    }
    router.push({ name: 'educationAdmin' })
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message
    }
  }
}
</script>

<template>
  <h1>Create Education</h1>
  <div v-if="error">{{ error }}</div>
  <div>
    <input v-model="form.name" placeholder="Name Education" />
    <input v-model="form.degree" placeholder="Degree" />
    <input v-model="form.duration" placeholder="Duration" />
    <input v-model="form.educationType" placeholder="Type Education" />
    <input v-model="form.description" placeholder="Description" />
    <input v-model="form.linkDownload" placeholder="linkDownload" />
    <button @click="createEducation">Save</button>
  </div>
</template>
