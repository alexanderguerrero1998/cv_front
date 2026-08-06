<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getPerson } from '@/services/profileServices.ts'
import { getSection, type Section } from '@/services/sectionServices.ts'
import SectionCard from '@/components/SectionCard.vue'
import '../assets/escalaModular/scale.css'
import '../assets/paletaColores/paleta.css'

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
const section = ref<Section[]>([])
const loading = ref(true)
const error = ref('')
const currentYear = new Date().getFullYear()

onMounted(async () => {
  try {
    const [getP, getS] = await Promise.all([getPerson(), getSection()])
    person.value = getP
    section.value = getS
      .filter((s: Section) => s.active)
      .sort((a: Section, b: Section) => a.order - b.order)
  } catch (e) {
    if (e instanceof Error) error.value = e.message
  } finally {
    loading.value = false
  }
})

const firstName = computed(() => person.value[0]?.name?.toUpperCase() ?? '')
const lastName = computed(() => person.value[0]?.lastName?.toUpperCase() ?? '')
const contactLinks = computed(() => person.value[0]?.socials?.filter(s => s.url.includes('github') || s.url.includes('linkedin')) ?? [])

</script>

<template>

  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div class="box"  v-else>

    <div class="center">
      <div class="stack" >

        <div class="box-info">
          <div class="side-bar">
           <!--<div><img alt="" src="../../src/assets/img/AAA.JPG"></div>-->
            <div >
              <h1>{{ firstName }} {{ lastName }}</h1>
            </div>
          </div>

        </div>


        <div class="box-desciption">
          <p>{{ person[0]?.biography }}</p>
        </div>

        <div class="box-download">
          <p>Download Curriculum PDF </p> <a>[icon]</a>
        </div>

        <div class="box-links">
          <div class="switcher">
            <div v-for="s in section" :key="s._id">
              <SectionCard v-bind="s" />
            </div>
          </div>
        </div>

      </div><!--Fin del stack-->
    </div> <!--Fin del center-->
  </div> <!--Fin del box-->


</template>

<style >
*{
  margin: 0;
  box-sizing: border-box;
  font-family: "Oswald", sans-serif;
  font-optical-sizing: auto;
}

.stack > * + * { margin-top: var(--s2); }
.center {
  margin-inline: auto;
  box-sizing: content-box;
  max-width: 90ch;
  padding-inline: var(--s0);
}
.cluster{
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2); /*Espacio entre elementos*/
}
.box{ color: var(--cod-gray) }
.side-bar{
  display: flex;
  flex-wrap: wrap;
  gap: var(--s0); /* Espacio entre los elementos*/
}
.side-bar > :first-child{
  flex-grow: 1;
}

.side-bar > :last-child{
  flex-basis: 0;
  flex-grow: 999;
  /*min-width:50% ;*/ /*Envolver cuando los elementos tiene le mismo ancho*/
}

.switcher  {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-9);
}
.switcher > *  {
 flex-grow: 1;
  flex-basis: calc((30rem - 100%) *999);
}
/* Si hay mas de 5 elementos cambia a columna */
.switcher > :nth-last-child(n+5),
.switcher > :nth-last-child(n+5) ~ * {
  flex-basis: 100%;
}

img{ width: 5em;}
.box-info{ font-size: var(--s4); display: flex; color: inherit;}
.box-links{
  /*display: flex;*/ /*Ese display: flex no aporta nada y, en este caso, está interfiriendo con el comportamiento del Switcher.*/
  color: inherit}
.box-download{ display: flex; color: inherit}

</style>
