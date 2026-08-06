<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getPerson } from '@/services/profileServices.ts'
import {getSection, type Section} from "@/services/sectionServices.ts";
interface Person {
  _id: string
  name: string
  lastName: string
  biography: string
  linkImg: string
  nickname: string
  technologies: { name: string; icon: string }[]
  experience: number
  socials: { icon: string; url: string }[]
}
const person = ref<Person[]>([])
onMounted(async () => {
  try {
    const [getP, getS] = await Promise.all([getPerson(), getSection()])
    person.value = getP
  } catch (e) {
    if (e instanceof Error) error.value = e.message
  }
})

const nickname =  computed(()=> person.value[0]?.nickname.toUpperCase()??'')
</script>

<template>
  <div class="box-header">
    <RouterLink to="/"> {{nickname}} </RouterLink>
  </div>
  <RouterView />
</template>

<style scoped>
  .box-header{
    background: var(--cod-gray);
    height: var(--s7);color: var(--white);
    padding-left: var(--s0);
    font-size: var(--s1);
  }
  .box-header > a{text-decoration: none; color: inherit;}
</style>
