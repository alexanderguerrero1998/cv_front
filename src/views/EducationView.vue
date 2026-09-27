<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EducationCard from '@/components/EducationCard.vue'

interface Education {
  _id: string
  name: string
  degree: string
  duration: string
  educationType: string
  description: string
  linkDownload: string
}

const API_URL = 'http://localhost:3000/api/education'
const login = ref(true)
const error = ref('')
const educations = ref<Education[]>([])

async function getEducations() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    if (!response.ok) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error(data.message)
    }
    educations.value = data
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message
    }
  } finally {
    login.value = false
  }
}
onMounted(() => {
  getEducations()
})
</script>

<template>
  <div class="box">
    <div class="cover">
      <div class="center">
        <div class="stack">
          <EducationCard v-for="education in educations" :key="education._id" v-bind="education">
            <template #details>
              <RouterLink :to="{ name: 'educationDetail', params: { id: education._id } }">
                VIEW DETAILS
              </RouterLink>
            </template>
          </EducationCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  background: var(--gray-10);
  border-radius: var(--s-5);
}
.stack > * {
  background: var(--gray-9-5);
  color: var(--gray-1);
}
.stack a {
  font-size: var(--s-2);
  color: var(--gray-5);
  background: var(--gray-9);
  text-decoration: none;
  padding: var(--s-5);
  font-weight: 500;
  border-radius: var(--s-9);
}
.stack a:hover {
  background: var(--gray-8);
}
</style>
