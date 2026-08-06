<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getProfileId, updatePerson } from '@/services/profileServices.ts'

interface  Social {
  icon: string
  url: string
}
interface Person {
  _id: string
  name: string
  lastName: string
  biography: string
  linkImg: string
  nickname: string
  technologies: string[]
  experience: number
  socials: Social[]
  countPortfolio: number
  bioOnly?: boolean
}

const personForm = ref<Omit<Person, '_id'>>({
  name: "",
  lastName: "",
  biography: "",
  linkImg: "",
  nickname: "",
  technologies: [],
  experience: 0,
  socials: [],
  countPortfolio: 0,
})

const error =  ref('')
const route = useRoute()
const router = useRouter()
const loading  =  ref(true)

// First we must check if ID is a string.
// route.params.id, can be anything example: string, string[] or undefine
// So is necessary verify that id went is a string
function getRouteId(id: unknown): string {
  if (typeof id !== 'string') {
    throw new Error('Invalid ID')
  }
  return id
}
const id = getRouteId(route.params.id)

onMounted(async function (){
  try{
    personForm.value = await getProfileId(id)
  } catch (e) {
    if(e instanceof  Error){
      error.value = e.message
    }
  } finally {
    loading.value = false
  }

})

function addSocial() {
  personForm.value.socials.push({
    icon: '',
    url: ''
  })
}
function removeSocial(index: number) {
  personForm.value.socials.splice(index, 1)
}

async function updateP(){
  try{
    await  updatePerson(personForm.value, id)
    router.push({name:'profileAdmin'})
  } catch (e) {
    if(e instanceof  Error){
      error.value= e.message
    }
  }
}

</script>

<template>
  <div v-if="error">{{error}}</div>
  <div v-else-if="loading">Loading...</div>
  <div v-else>
      <input v-model="personForm.name" placeholder="Enter name">
      <input v-model="personForm.lastName" placeholder="Enter lastname">
      <textarea v-model="personForm.biography" placeholder="Enter biography"/>
      <input v-model="personForm.linkImg" placeholder="Enter link img">
      <input v-model="personForm.nickname" placeholder="Enter nickname">
      <input  type="number" v-model="personForm.experience" placeholder="Years experience">
      <input  type="number" v-model="personForm.countPortfolio" placeholder="Enter count portfolio">
      <input
        :value="personForm.technologies.join(', ')"
        @input="(e) => personForm.technologies = (e.target as HTMLInputElement).value.split(',').map(t => t.trim()).filter(t => t !== '')"
        placeholder="Tech 1, Tech 2, Tech 3"
      />
  <div>
    <div v-for="(social, index) in personForm.socials" :key="index">
      <input v-model="social.icon" placeholder="Icon (ej: github)"/>
      <input v-model="social.url" placeholder="URL"/>
      <button @click="removeSocial(index)"> Delete</button>
    </div>
      <button @click="addSocial"> + Add red social </button>
    </div>
    <button @click="updateP" >Save</button>
  </div>


</template>
