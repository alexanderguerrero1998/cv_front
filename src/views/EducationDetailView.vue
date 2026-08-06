<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {useRoute} from "vue-router";

interface Education  {
  _id:string
  name:string
  degree:string
  duration:string
  educationType:string
  description:string
  linkDownload:string
}

const API_URL= 'http://localhost:3000/api/education'
const loading = ref(true)
const error =  ref('')
const educations = ref<Education[]>([])
const education =  ref<Education | null>(null)
const route = useRoute()

async function getEducations (){
  try{
    const response = await fetch(API_URL)
    const data = await response.json()
    if(!response.ok){
      // noinspection ExceptionCaughtLocallyJS
      throw new Error(data.message)
    }
    educations.value = data
    education.value = educations.value.find(e=>e._id === route.params.id) ?? null

  }catch (e){
    if(e instanceof Error){
      error.value = e.message
    }
  } finally {
    loading.value = false
  }
}
onMounted(()=>{
  getEducations()
})

</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{error}}</div>
  <div v-else>
    <div v-if="education">
      <div>{{education.name}}</div>
      <div>{{education.degree}}</div>
      <div>{{education.duration}}</div>
      <div>{{education.educationType}}</div>
      <div>{{education.description}}</div>
      <div>{{education.linkDownload}}</div>


    </div>
  </div>
</template>
