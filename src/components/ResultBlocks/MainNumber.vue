<script setup lang="ts">
defineProps<{
  isMasterNumber: boolean
  lifePathNumber: number
}>()
</script>
<template>
  <div class="flex flex-col items-center mb-6">
    <div class="text-center md:text-left">
      <h2 class="text-2xl font-bold mb-2 text-purple-200">Số Chủ Đạo Của Bạn Là</h2>
      <div class="flex items-center justify-center md:justify-start">
        <span v-if="isMasterNumber" class="ml-2 px-2 py-1 bg-purple-700/50 rounded-md text-xs text-purple-200">Số
          Chủ</span>
      </div>
    </div>
    <div class="relative mb-6 md:mb-0 md:mr-8">
      <div
        class="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center relative overflow-hidden">
        <div class="absolute inset-0 bg-purple-900/20"></div>
        <transition name="number">
          <span v-if="lifePathNumber" class="text-6xl font-bold text-white relative z-10">{{ lifePathNumber
            }}</span>
        </transition>
      </div>
      <div class="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-30">
      </div>
    </div>
  </div>
</template>
