<script setup lang="ts">
import { createPerson } from '@/services/profileServices.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface Person{
  _id: string
  name: string
  lastName: string
  biography: string
  linkImg: string
  nickname: string
  technologies: string[]
  experience: number
  socials: { icon: string; url: string }[]
  countPortfolio: number
  bioOnly?: boolean
}

const personForm = ref<Omit<Person,'_id'>>({
  name: '',
  lastName: '',
  biography: '',
  linkImg: '',
  nickname: '',
  technologies: [],
  experience: 0,
  socials: [],
  countPortfolio: 0,
})

const router = useRouter()
const error = ref('')

function addSocial() {
  personForm.value.socials.push({ icon: '', url: '' })
}

function removeSocial(index: number) {
  personForm.value.socials.splice(index, 1)
}

async function createP(){
  try{
    await createPerson(personForm.value)
    router.push({ name: 'profileAdmin' })
  } catch (e) {
    if(e instanceof Error){
      error.value = e.message
    }
  }
}
</script>

<template>
  <div v-if="error">{{ error }}</div>
  <div>
    <input v-model="personForm.name" placeholder="Enter name">
    <input v-model="personForm.lastName" placeholder="Enter lastname">
    <textarea v-model="personForm.biography" placeholder="Enter biography"/>
    <input v-model="personForm.linkImg" placeholder="Enter link img">
    <input v-model="personForm.nickname" placeholder="Enter nickname">
    <input type="number" v-model="personForm.experience" placeholder="Years experience">
    <input type="number" v-model="personForm.countPortfolio" placeholder="Enter count portfolio">
    <input
      :value="personForm.technologies.join(', ')"
      @input="(e) => personForm.technologies = (e.target as HTMLInputElement).value.split(',').map(t => t.trim()).filter(t => t !== '')"
      placeholder="Tech 1, Tech 2, Tech 3"
    />

    <!-- Socials -->
    <div v-for="(social, index) in personForm.socials" :key="index">
      <input v-model="social.icon" placeholder="Icon (ej: pi pi-github)">
      <input v-model="social.url" placeholder="URL">
      <button type="button" @click="removeSocial(index)">Delete</button>
    </div>
    <button type="button" @click="addSocial">+ Add social</button>

    <button type="button" @click="createP">Save</button>
  </div>
</template>
