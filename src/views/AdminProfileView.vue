<script setup lang="ts">
import {getPerson, deletePerson} from "@/services/profileServices.ts";
import {ref, onMounted} from "vue";
import {useRouter} from 'vue-router'
import ProfileCard from "@/components/ProfileCard.vue";

interface Person {
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
const person = ref<Person[]>([])
const error = ref('')
const router =  useRouter()

onMounted(async function Promise () {
  try{
     person.value  = await getPerson()
  } catch (e) {
    if(e instanceof  Error) { error.value = e.message}
  }
})

function editProfile(id: string){
  router.push({name:'profileEdit', params:{id}} )
}


async function deleteProfile(id:string){
  try{
    await deletePerson(id)
    person.value = person.value.filter(p => p._id !== id)
  } catch (e) {
    if(e instanceof Error){
      error.value= e.message
    }
  }

}
</script>

<template>
  <button @click="router.push({name:'profileCreate'})">Add</button>

  <ProfileCard v-for="p in person" :_id="p._id"
               :name="p.name" :last-name="p.lastName" :biography="p.biography" :link-img="p.linkImg"
               :nickname="p.nickname" :technologies="p.technologies" :experience="p.experience"
               :socials="p.socials" :count-portfolio="p.countPortfolio ?? 0">


   <template #actions>
      <button @click="editProfile(p._id)">Edit</button>
      <button @click="deleteProfile(p._id)" >Delete</button>
   </template>

  </ProfileCard>
</template>
