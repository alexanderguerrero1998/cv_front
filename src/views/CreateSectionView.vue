<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from "vue-router"
import {postSection} from '@/services/sectionServices.ts'


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
const sectionsForm = ref<Omit<Section, '_id'>>({
  title: '',
  type: '',
  subtitle: '',
  icon: '',
  color: '',
  order: 0,
  active: false,
  })
const router = useRouter()
const error = ref('')
const loading = ref()

async function uploadData(){
  try{
    await postSection(sectionsForm.value)
    router.push({name:'sectionAdmin'})
  } catch (e) {
   if( e instanceof Error) error.value = e.message
  } finally {loading.value = false }
}

</script>

<template>
  <div v-if="error">{{error}}</div>
  <div v-else-if="loading">Loading..</div>
  <div v-else>
    <input v-model="sectionsForm.title" placeholder="Enter name">
    <input v-model="sectionsForm.subtitle" placeholder="Enter subtitle">
    <input v-model="sectionsForm.route" placeholder="Enter route: /education/..">
    <input v-model="sectionsForm.icon" placeholder="Enter icon">
    <input type="number" v-model="sectionsForm.order" placeholder="Enter order">
    <input v-model="sectionsForm.color" placeholder="Enter color">
    <label for="active">Active</label><input name="active" type="checkbox" v-model="sectionsForm.active" placeholder="Enter active">
    <input v-model="sectionsForm.url" placeholder="Enter url">
    <select v-model="sectionsForm.type">
      <option value=""> Select Type</option>
      <option value="internal">Internal</option>
      <option value="external">External</option>
    </select>
    <button :disabled = "loading" @click="uploadData">Save</button>
  </div>
</template>
