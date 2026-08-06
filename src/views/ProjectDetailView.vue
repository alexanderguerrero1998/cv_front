<script setup lang="ts">
import {onMounted, ref} from 'vue'
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
const projects =  ref<Project[]>([])
const error =  ref('')
const loading = ref(true)

async  function getProject(){

  try {
    const response =  await fetch(API_URL)
    const data = await response.json()
    if(!response.ok){

      // noinspection ExceptionCaughtLocallyJS
      throw new Error(data.message)
    }
    projects.value = data
    project.value = projects.value.find(p => p._id === route.params.id) ?? null


  } catch (e) {
    if(e instanceof Error)
    {
      error.value = e.message
    }

  } finally {
    loading.value = false
  }
}

onMounted(()=>{
  getProject()
})


</script>

<template>

  <div v-if="loading">Loading</div>
  <div v-else-if="error">{{error}}</div>
  <div v-else>
    <div v-if="project">
      <div>{{project.name}}</div>
      <div>{{project.category}}</div>
      <div>{{project.generalDescription}}</div>
      <div v-for="t in project.technologies">
        {{t}}
      </div>
      <div>{{project.linkRepository}}</div>
      <div>{{project.linkVideo}}</div>
    </div>
  </div>
</template>
