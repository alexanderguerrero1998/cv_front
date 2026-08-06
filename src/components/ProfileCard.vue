<script setup lang="ts">
defineProps<{
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
}>()


</script>

<template>

    <div>
    {{name}} {{lastName}}
    <div>
      Biography: {{biography}}
    </div>

    <div v-for="technology  in technologies">
      {{technology}}
    </div>
    <div v-for="social in socials">
      <div>
       Icon social: {{social.icon}} Link: {{social.url}}
      </div>

    </div>
    Experience: {{experience}}
    Count portfolios: {{countPortfolio}}
    <div v-if="$slots.actions">
      <slot name="actions" ></slot>
    </div>

  </div>


</template>
