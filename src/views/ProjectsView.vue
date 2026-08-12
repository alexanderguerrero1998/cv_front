<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'

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

const API_URL = 'http://localhost:3000/api/portfolio'
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
</script>

<template>
  <div v-if="loading">Loading</div>
  <div v-else-if="error">{{ error }}</div>
  <div class="box" v-else>
    <div class="cover">
      <div class="center">
        <div class="stack">
          <div class="title-projects"><h1>PROJECTS</h1></div>
          <div class="grid boulder-children">
            <ProjectCard class="" v-for="project in projects" :key="project._id" v-bind="project">
              <template #details>
                <RouterLink
                  class="box-link-color"
                  :to="{ name: 'projectDetail', params: { id: project._id } }"
                >
                  view more
                </RouterLink>
              </template>
            </ProjectCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-link-color {
  color: var(--cod-gray);
}

</style>
