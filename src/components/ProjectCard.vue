<script setup lang="ts">
import '../assets/paletaColores/paleta.css'

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
  <div class="box box-padding">
    <div class="stack margin-stack box-info">
      <div>
        <h3>{{ name }}</h3>
        <p>{{ shortDescription }}</p>
      </div>

      <!-- slot for see detail each project-->
      <div v-if="$slots.details">
        <slot name="details" />
      </div>
      <!-- slot for edit or delete a project-->
      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.margin-stack {
  --margin-stack: var(--s-10);
}
.box-padding {
  --box-padding: var(--s1);
}
.box-info {
  color: var(--gray-1);
}

.box-info h3 {
  text-transform: uppercase;
}
.box-info  p {
  font-size: var(--s-1);
}
</style>
