<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

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
const route = useRoute()
const API_URL = 'http://localhost:3000/api/portfolio'
const project = ref<Project | null>(null)
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
    project.value = projects.value.find((p) => p._id === route.params.id) ?? null
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

const embedUrl = computed(() => {
  if (!project.value?.linkVideo) return ''
  const match = project.value.linkVideo.match(/(?:v=|youtu\.be\/)([^&]+)/)
  const id = match ? match[1] : ''
  return id ? `https://www.youtube.com/embed/${id}` : ''
})
</script>

<template>
  <div v-if="loading">Loading</div>
  <div v-else-if="error">{{ error }}</div>
  <div class="box" v-else>
    <div class="cover">
      <div class="center center-max">
        <div v-if="project" class="stack">
          <div class="box-info">
            <div class="stack margin-stack">
              <div>{{ project.name }}</div>
              <div>{{ project.category }}</div>
              <div>{{ project.generalDescription }}</div>
              <div class="cluster">
                <div v-for="t in project.technologies">{{ t }}</div>
              </div>

              <div>
                <a :href="project.linkRepository" target="_blank" rel="noopener noreferrer">
                  {{ project.linkRepository }}
                </a>
              </div>
            </div>
          </div>

          <div class="box-video">
            <iframe
              v-if="embedUrl"
              :src="embedUrl"
              title="Video del proyecto"
              frameborder="0"
              allow="
                accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;
              "
              allowfullscreen
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-video iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
  border-radius: 8px;
}
.margin-stack {
  --margin-stack: var(--s-5);
}
</style>
