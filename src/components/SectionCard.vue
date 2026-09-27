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
div {
  background: inherit;
  color: var(--gray-6);
  padding-inline: var(--s-1);
  padding-block: var(--s-10);
  text-decoration: none;
  font-size: var(--s-1);
  text-transform: uppercase;
  text-decoration: underline;
}

div > a {
  color: inherit;
  text-decoration: inherit;
}
div:hover {
  color: var(--gray-6);
  background-color: hsl(from var(--gray-7) h s l / 5%);
}
</style>
