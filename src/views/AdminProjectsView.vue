<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { useRouter } from 'vue-router'

interface Project {
  _id: string
  name: string
  category: string
  shortDescription: string
  generalDescription: string
  technologies: string[]
  linkRepository: string
  icon: string
  linkVideo: string
}

const router = useRouter()
//const API_URL = 'http://localhost:3000/api/portfolio'
const API_URL = `${import.meta.env.VITE_API_URL}/api/portfolio`
const projects = ref<Project[]>([])
const error = ref('')
const loading = ref(true)

async function getProject() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    if (!response.ok) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error(data.message)
    }
    projects.value = data
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getProject()
})
async function deleteProject(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (!response.ok) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error('Delete Error')
    }

    projects.value = projects.value.filter((p) => p._id !== id)
  } catch (e) {
    if (e instanceof Error) error.value = e.message
  }
}

function editProject(id: string) {
  router.push({ name: 'projectEdit', params: { id } })
}
</script>

<template>
  <!--Here you can add a project-->
  <button @click="router.push({ name: 'projectCreate' })">New Project</button>

  <ProjectCard v-for="project in projects" :key="project._id" v-bind="project">
    <!--Here you can see detail each project-->
    <template #details>
      <RouterLink :to="{ name: 'projectDetail', params: { id: project._id } }">
        View More
      </RouterLink>
    </template>

    <!--Here you can edit or delete a project-->
    <template #actions>
      <button @click="editProject(project._id)">Edit</button>
      <button @click="deleteProject(project._id)">Delete</button>
    </template>
  </ProjectCard>
</template>
