<script setup lang="ts">
import MainNumber from './MainNumber.vue'
import MeaningOfNumber from './MeaningOfNumber.vue'
import CompatibleZodiac from './CompatibleZodiac.vue'

defineProps<{
  isMasterNumber: boolean
  lifePathNumber: number
  numberMeaning: string
  compatibleZodiac: string
}>()

</script>
<template>
  <section class="result-section">
    <MainNumber :isMasterNumber :lifePathNumber />
    <MeaningOfNumber :lifePathNumber :numberMeaning />
    <CompatibleZodiac :compatibleZodiac />
  </section>
</template>
