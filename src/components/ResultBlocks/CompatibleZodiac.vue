<script setup lang="ts">
defineProps<{
  compatibleZodiac: string
}>()
</script>
<template>
  <div id="zodiac" class="mt-8 pt-6 border-t border-purple-600/30">
    <div class="flex items-center">
      <div class="w-10 h-10 rounded-full bg-purple-700/50 flex items-center justify-center mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </div>
      <span class="text-lg font-medium text-purple-200">Cung Hoàng Đạo Tương Thích</span>
    </div>
    <p class="mt-2 text-purple-100">{{ compatibleZodiac }}</p>
  </div>
</template>
