<script setup lang="ts">
import {ref,onMounted} from 'vue'
import EducationCard from "@/components/EducationCard.vue";

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
const login = ref(true)
const error =  ref('')
const educations = ref<Education[]>([])

async function getEducations (){
  try{
    const response = await fetch(API_URL)
    const data = await response.json()
    if(!response.ok){
      // noinspection ExceptionCaughtLocallyJS
      throw new Error(data.message)
    }
    educations.value = data

  }catch (e){
    if(e instanceof Error){
      error.value = e.message
    }
  } finally {
    login.value = false
  }
}
onMounted(()=>{
  getEducations()
})

</script>

<template>
<h1>Education</h1>
  <EducationCard v-for="education in educations" :key="education._id" v-bind="education">
    <template #details >
      <RouterLink :to="{name:'educationDetail', params:{id:education._id}}">
        View Detail
      </RouterLink>

    </template>
  </EducationCard>
</template>
