<script setup lang="ts">
defineProps<{
  _id: string
  name: string
  category: string
  shortDescription: string
  generalDescription: string
  technologies: string[]
  linkRepository: string
  icon: string
  linkVideo: string
}>()


</script>

<template>
  <div class="card">
    <h3>{{ name }}</h3>
    <p>{{ shortDescription }}</p>

    <!-- slot for see detail each project-->
    <div v-if="$slots.details">
      <slot name="details"/>
    </div>

    <!-- slot for edit or delete a project-->
    <div v-if="$slots.actions">
      <slot name="actions" />
    </div>
  </div>
</template>
