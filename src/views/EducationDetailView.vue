<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface Education {
  _id: string
  name: string
  degree: string
  duration: string
  educationType: string
  description: string
  linkDownload: string
}

//const API_URL = 'http://localhost:3000/api/education'
const API_URL = `${import.meta.env.VITE_API_URL}/api/education`

const loading = ref(true)
const error = ref('')
const educations = ref<Education[]>([])
const education = ref<Education | null>(null)
const route = useRoute()

async function getEducations() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    if (!response.ok) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error(data.message)
    }
    educations.value = data
    education.value = educations.value.find((e) => e._id === route.params.id) ?? null
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message
    }
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  getEducations()
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div class="box" v-else>
    <div class="cover">
      <div class="center">
        <div class="stack box-info" v-if="education">
          <div>{{ education.name }}</div>
          <div>
            <span>{{ education.educationType }}</span> {{ education.degree }} ⊙
            {{ education.duration }}
          </div>
          <div>{{ education.description }}</div>
          <div>
            <a :href="education.linkDownload" rel=""> Certificate (PDF) </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-info {
  background: var(--gray-9-5);
  padding: var(--s3);
  border-radius: var(--s-3);
}
.box {
  background: var(--gray-10);
  color: var(--gray-1);
}
.stack > div:nth-child(1) {
  font-size: clamp(var(--s3), 4vw, var(--s6));
  font-weight: 500;
  text-transform: uppercase;
}
.stack > div:nth-child(2) {
  font-size: var(--s-1);
  color: var(--gray-5);
}
.stack > div:nth-child(3) {
  color: var(--gray-5);
}

a {
  font-size: var(--s-1);
  background: var(--gray-1);
  text-decoration: none;
  color: var(--gray-10);
  padding: var(--s-5);
  border-radius: var(--s-5);
}
a:hover {
  background: var(--gray-5);
}
span {
  color: var(--blue-5);
  background-color: hsl(from var(--blue-7) h s l / 10%);
  padding: var(--s-7);
  border-radius: var(--s-5);
}
</style>
