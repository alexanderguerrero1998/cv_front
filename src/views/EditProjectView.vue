<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'


const route = useRoute()
const router = useRouter()
const API_URL = 'http://localhost:3000/api/portfolio'
const loading = ref(true)
const error = ref('')

const form = ref({
  name: '',
  category: '',
  shortDescription: '',
  generalDescription: '',
  technologies: [] as string[],
  linkRepository: '',
  icon: '',
  linkVideo: ''
})

// Upload current data of the project
async function loadProject() {
  console.log('URL:', `${API_URL}/${route.params.id}`)
  try {
    const response = await fetch(`${API_URL}/${route.params.id}`)
    const data = await response.json()
    if (!response.ok) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error(data.message)
    }

    form.value = { ...data }  // Fill the form with current data
  } catch (e) {
    if (e instanceof Error) error.value = e.message
  } finally {
    loading.value = false
  }
}

// Send change
async function updateProject() {
  error.value = ''
  try {
    const response = await fetch(`${API_URL}/${route.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
      credentials: 'include'
    })
    const data = await response.json()
    if (!response.ok) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error(data.message)
    }

    // Go back AdminProjectView
    router.push({ name: 'projectAdmin' })
  } catch (e) {
    if (e instanceof Error) error.value = e.message
  }
}

onMounted(() => {
  loadProject()
})

</script>
<template>
  <div v-if="loading">Loading</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <input v-model="form.name" placeholder="Name" />
    <select v-model="form.category">
      <option value="">Select category</option>
      <option value="Frontend">Frontend</option>
      <option value="Backend">Backend</option>
      <option value="Fullstack">Fullstack</option>
      <option value="Mobile">Mobile</option>
    </select>
    <textarea v-model="form.shortDescription" placeholder="Short description" />
    <textarea v-model="form.generalDescription" placeholder="General description" />
    <input v-model="form.linkRepository" placeholder="Repository" />

    <input
      :value="form.technologies.join(', ')"
      @input="(e) => form.technologies = (e.target as HTMLInputElement).value.split(',').map(t => t.trim()).filter(t => t !== '')"
      placeholder="Tech 1, Tech 2, Tech 3"
    />

    <button @click="updateProject">Save</button>
  </div>
</template>
