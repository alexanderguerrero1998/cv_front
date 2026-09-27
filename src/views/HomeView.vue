<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getPerson } from '@/services/profileServices.ts'
import { getSection, type Section } from '@/services/sectionServices.ts'
import SectionCard from '@/components/SectionCard.vue'

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
const contactLinks = computed(
  () =>
    person.value[0]?.socials?.filter(
      (s) => s.url.includes('github') || s.url.includes('linkedin'),
    ) ?? [],
)
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div class="box" v-else>
    <div class="cover">
      <div class="center">
        <div class="stack">
          <div class="box-info center">
            <div class="stack">
              <div class="center">
                <img alt="" src="../../src/assets/img/G.png" />
              </div>

              <div class="names center">
                {{ firstName }}
                {{ lastName }}
              </div>

              <div class="box-desciption center">
                <p>{{ person[0]?.biography }}</p>
              </div>

              <div class="box-links center">
                <div class="switcher">
                  <div v-for="s in section" :key="s._id">
                    <SectionCard v-bind="s" />
                  </div>
                </div>
              </div>

              <div class="box-why"></div>

              <div class="box-footer">
                <div class="stack margin-stack-footer">
                  <p>CONTACTO</p>
                  <p>C. Juan Pio Montufar & Manuel Quiroga</p>
                  <p>alexanderxn3@gmail.com</p>
                  <p>099 466 4469 | 099 488 7284</p>
                  <div class="box-download ">
                    <a :href="person[0]?.linkImg" download>
                      <span dir="rtl" class="with-icon">
                        <svg class="icon">
                          <use href="#icon-download"></use>
                        </svg>
                        <p>Download CV (PDF)</p>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--Fin del stack-->
      </div>
      <!--Fin del center-->
    </div>
    <!--Fi del cover-->
  </div>
  <!--Fin del box-->
</template>

<style scoped>
img {
  width: clamp(200px, 30vw, 500px);
}

.box-info {
  display: flex;
  color: inherit;
}
.box-links {
  /*display: flex;*/ /*Ese display: flex no aporta nada y, en este caso, está interfiriendo con el comportamiento del Switcher.*/
  color: inherit;
}

.box-download > a {
  color: var(--gray-10);
  background: var(--gray-1);
  border-radius: var(--s-6);
  padding:var(--s-5);
  font-weight: 500;
}
.box-desciption {
  text-align: center;
  font-size: clamp(var(--s-1), 1vw, var(--s1));
  color: var(--gray-6);
}
.box {
  background: var(--gray-10);
  color: var(--white);
}
.names {
  text-align: center;
  font-size: clamp(var(--s3), 4vw, var(--s6));
  font-weight: 700;
}

.box-footer {
  font-size: var(--s-3);
  color: var(--gray-6);
}

.margin-stack-footer {
  --margin-stack: var(--s-7);
}
</style>
