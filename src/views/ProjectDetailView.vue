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
//const API_URL = 'http://localhost:3000/api/portfolio'
const API_URL = `${import.meta.env.VITE_API_URL}/api/portfolio`

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
  <div class="box box-header" v-else>
    <div class="cover">
      <div class="">
        <div v-if="project" class="side-bar">
          <div class="box-info">
            <div class="stack margin-stack">
              <div class="name">{{ project.name }}</div>
              <div class="category">{{ project.category }}</div>
              <div class="description">{{ project.generalDescription }}</div>
              <div class="cluster">
                <div class="icono" v-for="t in project.technologies">{{ t }}</div>
              </div>

              <div class="boton">
                <a :href="project.linkRepository" target="_blank" rel="noopener noreferrer">
                  <span class="with-icon">
                    <svg class="icon">
                      <use href="#icon-github"></use>
                    </svg>
                    <p>View on GitHub</p>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div class="frame">
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
.margin-stack {
  --margin-stack: var(--s-2);
}

.box-header {
  background: var(--gray-10);
}
.box-info {
  color: var(--gray-1);

  padding: var(--s1);
  max-width: 60ch;
}

.name {
  font-size: clamp(var(--s3), 4vw, var(--s8));
  text-transform: uppercase;
  font-weight: 500;
}
.category {
  font-size: clamp(var(--s2), 4vw, var(--s5));
  color: var(--gray-5);
}
.description {
  font-size: var(--s-1);
  color: var(--gray-5);
}
.icono {
  font-size: var(--s-2);
  background-color: var(--gray-9);
  padding: var(--s-6);
  border-radius: var(--s-8);
  color: var(--gray-5);
}
.boton > a {
  font-size: var(--s-1);
  padding: var(--s-6);
  color: var(--gray-10);
  text-decoration: none;
  font-weight: 500;
  background: white;
}
</style>
