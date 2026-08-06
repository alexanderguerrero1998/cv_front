<script setup lang="ts">
import {ref} from "vue"
import {useRouter} from 'vue-router'

const API_URL = 'http://localhost:3000/api/portfolio'
const error = ref('')
const router = useRouter()

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


const form = ref<Omit<Project, '_id'>>({
  name: '',
  category: '',
  shortDescription: '',
  generalDescription: '',
  technologies: [] as string[],
  linkRepository: '',
  icon: '',
  linkVideo: ''
})

async function createProject(){
  error.value = '' // Clean before of each attempt
  try{
    const response = await fetch(API_URL,{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(form.value),
      credentials: 'include'
    })
    const data = await  response.json()
    if(!response.ok) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error(data.message)
    }
    router.push({name:'projectAdmin'})

  } catch (e) {
    if(e instanceof  Error) {
      error.value = e.message
    }

  }

}

</script>


<template>
  <h1> Add Project</h1>
  <div v-if="error">{{error}}</div>
  <div>
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
    <input v-model="form.icon" placeholder="Icon" />
    <input v-model="form.linkVideo" placeholder="Video" />

    <input
      :value="form.technologies.join(', ')"
      @input="(e) => form.technologies = (e.target as HTMLInputElement).value.split(',').map(t => t.trim()).filter(t => t !== '')"
      placeholder="Tech 1, Tech 2, Tech 3"
    />

    <button @click="createProject">Save</button>
  </div>

</template>
