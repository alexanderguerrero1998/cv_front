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
        <div class="stack">
          <div class="name">{{ name }}</div>
          <div class="deegre">{{ degree }}</div>

          <div v-if="$slots.details">
            <slot name="details"></slot>
          </div>
          <div v-if="$slots.actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>

  </div>
</template>

<style scoped>
.box-padding {
  --box-padding: var(--s0);
}
.name {
  font-size: var(--s2);
  text-transform: uppercase;
  font-weight: 600;
}
.deegre {
  font-size: var(--s-1);
  color: var(--gray-6);
}
.a{display: flex;
gap: var(--s-3);
flex-wrap: wrap;

}
img{width: 5rem}
</style>
