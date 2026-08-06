<script setup lang="ts">
import '../assets/escalaModular/scale.css'
import '../assets/paletaColores/paleta.css'

defineProps<{
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
}>()


</script>

<template>
  <div>
    <RouterLink v-if="type === 'internal'" :to="route!">
      <p>{{ title }}</p>
    </RouterLink>

    <a v-else-if="type === 'external'" :href="url" target="_blank">
      <p>{{ title }}</p>
    </a>
  </div>
</template>

<style scoped>
 div{
    background: var(--cod-gray);
    color: var(--white);
    padding: var(--s-1);
    text-decoration: none;
   font-size: var(--s1);


 }
 div:hover{
  background: #7d7d7d;
 }
 div > a{
   color: inherit;
   text-decoration: inherit;
 }
</style>
