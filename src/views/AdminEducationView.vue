<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'

import EducationCard from "@/components/EducationCard.vue";


interface Education  {
  _id: string
  name: string
  degree: string
  duration: string
  educationType: string
  description: string
  linkDownload: string
}

const API_URL = 'http://localhost:3000/api/education'
const educations = ref<Education[]>([])
const loading = ref(true)
const error =  ref('')
const router = useRouter()


async  function getEducation (){
  try{
    const  response =  await fetch(API_URL)
    const data = await response.json()

    if(!response.ok){
      // noinspection ExceptionCaughtLocallyJS
      throw new Error(data.message)
    }
    educations.value = data
  } catch (e) {
    if(e instanceof  Error) {
      error.value = e.message
    }
  } finally {
    loading.value = false
  }
}

onMounted(()=>{
  getEducation()
})

function editEducation(id:string){
  router.push({name:'educationEdit',params:{ id }})
}

async function  deleteEducation(id:string){
  try {
    const response = await fetch(`${API_URL}/${id}`,{
      method: 'DELETE',
      credentials:'include'
    })

    if(!response.ok){
      // noinspection ExceptionCaughtLocallyJS
      throw  new Error('Delete Error')
    }
    educations.value = educations.value.filter(edu => edu._id !== id )

  } catch (e) {
    if(e instanceof  Error) {
      error.value = e.message
    }
  }


}
</script>

<template>
  <!--Here you can add a education-->
  <button @click="router.push({ name: 'educationCreate' })">New Project</button>

  <EducationCard v-for="education in educations" :key="education._id" v-bind="education">

    <!--Here you can see detail each education-->
    <template #details>
    <RouterLink :to="{name:'educationDetail', params:{id:education._id }}">
      View Details
    </RouterLink>
    </template>

    <!--Here you can edit or delete a education-->
    <template #actions>
      <button @click="editEducation(education._id)">Edit</button>
      <button @click="deleteEducation(education._id)">Delete</button>
    </template>
  </EducationCard>
</template>
