<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { getSection, deleteSection } from '@/services/servicesSection.ts'
import SectionCardv2 from "@/components/SectionCardv2.vue";
import {useRouter} from 'vue-router'

interface Section {
  _id: string
  title: string
  route?: string
  type: string
  subtitle: string
  icon: string
  color: string
  order: number
  active: boolean
  url?: string
}

const sections = ref<Section[]>([])
const error = ref('')
const loading = ref(true)
const  router = useRouter()
onMounted(async  function (){
  try {
    sections.value = await getSection()
  } catch (e) {
    if(e instanceof Error ) error.value = e.message
  } finally {
    loading.value =  false
  }
})

async function delSection(id:string){
  try{
    await deleteSection(id)
    sections.value = sections.value.filter( s => s._id !== id )
  } catch (e) {
    if(e instanceof  Error) error.value = e.message
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <button @click="router.push({name:'sectionCreate'})"> Add </button>
  <SectionCardv2 v-for="section in sections" :key="section._id" v-bind="section" >
    <template #actions >
      <button :disabled="loading" @click="router.push({name:'sectionEdit', params: {id:section._id} })" >Edit </button>
      <button :disabled="loading" @click="delSection(section._id)">Delete</button>
    </template>
  </SectionCardv2>

</template>
