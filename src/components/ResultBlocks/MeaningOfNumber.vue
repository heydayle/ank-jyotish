<script setup lang="ts">
defineProps<{
  lifePathNumber: number
  numberMeaning: string
}>()

</script>
<template>
  <div class="mt-6 pt-6 border-t border-purple-600/30">
    <h3 class="text-xl font-semibold mb-3 text-purple-200">
      Ý Nghĩa Của Số {{ lifePathNumber }}
    </h3>
    <p class="text-purple-100 leading-relaxed">{{ numberMeaning }}</p>
  </div>
</template>
