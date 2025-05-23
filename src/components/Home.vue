<script setup lang="ts">
import Background from './Background.vue';
import { useAnalyst } from '@/composables/useAnalyst';

const {
  birthdate,
  isCalculating,
  showResult,
  isMasterNumber,
  lifePathNumber,
  error,
  isValid,
  compatibleZodiac,
  numberMeaning,
  calculateLifePathNumber,
} = useAnalyst()

</script>
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white font-sans relative overflow-hidden">
    <!-- Animated stars background -->
    <Background />
    <!-- Main content -->
    <div class="container mx-auto px-4 py-12 relative z-10">
      <header class="text-center mb-12">
        <h1
          class="text-4xl md:text-5xl pb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-200">
          Thần Số Học
        </h1>
        <p class="text-lg text-purple-200 max-w-2xl mx-auto">
          Nhập ngày sinh để tìm hiểu về ý nghĩa của số chủ đạo trong thần số học!
        </p>
      </header>

      <!-- Input form section -->
      <div
        class="relative z-90 max-w-md mx-auto bg-purple-900/40 backdrop-blur-md rounded-lg p-6 border border-purple-500/30 shadow-lg mb-10">
        <div class="mb-6">
          <label for="birthdate" class="block text-purple-200 mb-2 text-lg">Ngày Sinh Của Bạn</label>
          <VueDatePicker v-model="birthdate" model-type="yyyy-MM-dd" :state="isValid" :enable-time-picker="false" />
          <p v-if="error" class="mt-2 text-red-300 text-sm">{{ error }}</p>
        </div>

        <button @click="calculateLifePathNumber"
          class="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center"
          :disabled="isCalculating">
          <span v-if="isCalculating" class="mr-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </span>
          <span>{{ isCalculating ? 'Đang Tính Toán...' : 'Kiểm tra' }}</span>
        </button>
      </div>

      <!-- Results section -->
      <transition name="fade">
        <div v-if="showResult"
          class="max-w-2xl mx-auto bg-purple-900/40 backdrop-blur-md rounded-lg p-8 border border-purple-500/30 shadow-lg">
          <div class="flex flex-col items-center mb-6">
            <div class="text-center md:text-left">
              <h2 class="text-2xl font-bold mb-2 text-purple-200">Số Chủ Đạo Của Bạn Là</h2>
              <div class="flex items-center justify-center md:justify-start">
                <span v-if="isMasterNumber"
                  class="ml-2 px-2 py-1 bg-purple-700/50 rounded-md text-xs text-purple-200">Số Chủ</span>
              </div>
            </div>
            <div class="relative mb-6 md:mb-0 md:mr-8">
              <div
                class="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center relative overflow-hidden">
                <div class="absolute inset-0 bg-purple-900/20"></div>
                <transition name="number">
                  <span class="text-6xl font-bold text-white relative z-10">{{ lifePathNumber }}</span>
                </transition>
              </div>
              <div class="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-30">
              </div>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="text-xl font-semibold mb-3 text-purple-200">Ý Nghĩa Của Số {{ lifePathNumber }}</h3>
            <p class="text-purple-100 leading-relaxed">{{ numberMeaning }}</p>
          </div>

          <!-- Optional zodiac section -->
          <div class="mt-8 pt-6 border-t border-purple-600/30">
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
        </div>
      </transition>
    </div>
  </div>
</template>


<style>
/* Base styles */
body {
  font-family: 'Roboto', sans-serif;
}

/* Animations */
.stars-container {
  z-index: 0;
}

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0.7;
  animation: twinkle 5s infinite ease-in-out;
}

@keyframes twinkle {
  0% {
    opacity: 0.2;
    transform: scale(0.8);
  }

  50% {
    opacity: 0.8;
    transform: scale(1.2);
  }

  100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.number-enter-active {
  animation: number-animation 1s;
}

@keyframes number-animation {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  60% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
