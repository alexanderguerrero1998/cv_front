<script setup lang="ts">
defineProps<{
  _id: string
  title: string,
  route?: string,
  type: string,
  subtitle: string,
  icon: string,
  color: string,
  order: number,
  active: boolean,
  url?: string
}>()
</script>

<template>
<div>
  <div>{{title}}  {{subtitle}}</div>
  <div>State: {{active}}</div>

  <div v-if="$slots.actions">
    <slot name="actions"></slot>
  </div>

  <div v-if="$slots.details">
    <slot name="details"></slot>
  </div>
</div>
</template>
