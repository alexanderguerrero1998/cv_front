<script setup lang="ts">
defineProps<{
  _id: string
  name: string
  degree: string
  duration: string
  educationType: string
  description: string
  linkDownload: string
}>()
</script>
<template>
  <div class="box box-padding">
    <div class="box-children">
      <div>{{ name }}</div>
      <div>{{ degree }}</div>

      <div v-if="$slots.details">
        <slot name="details"></slot>
      </div>
      <div v-if="$slots.actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-padding {
  --box-padding: var(--s0);
}
</style>
