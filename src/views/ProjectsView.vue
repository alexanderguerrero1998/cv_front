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
  <div class="box box-projects" v-else>
    <div class="cover">
      <div class="center">
        <div class="stack">
          <div class="grid">
            <ProjectCard
              class="cards"
              v-for="project in projects"
              :key="project._id"
              v-bind="project"
            >
              <template #details>
                <RouterLink
                  class="box-link-color"
                  :to="{ name: 'projectDetail', params: { id: project._id } }"
                >
                  VIEW PROJECT
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
  color: var(--gray-5);
  background-color: hsl(from var(--gray-1) h s l / 5%);

  font-size: var(--s-2);
  padding: var(--s-5);
  border-radius: var(--s-7);
  font-weight: 500;
  text-decoration: none;
}
.box-link-color:hover{
  background: var(--gray-9);
}

.box-projects {
  background-color: var(--gray-10);
}
.cards {
  background: var(--gray-9-5);
  border-radius: var(--s-5);
}
</style>
