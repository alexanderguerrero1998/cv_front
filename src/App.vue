<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getPerson } from '@/services/profileServices.ts'
import { getSection, type Section } from '@/services/sectionServices.ts'
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

const nickname = computed(() => person.value[0]?.nickname.toUpperCase() ?? '')
</script>

<template>
  <div class="box-header">
    <div class="cover">
      <div class="main-content">
        <RouterLink to="/"> {{ nickname }} </RouterLink>
      </div>
    </div>
  </div>

  <RouterView />
</template>

<style scoped>
.box-header {
  display: flex;
  background: var(--cod-gray);
  height: var(--s7);
  padding-left: var(--s0);
}
.main-content {
  color: var(--white);
  font-size: var(--s1);
}
.main-content > a {
  text-decoration: none;
  color: inherit;
}
.cover {
  --cover-min-height: 100%;
}
</style>
