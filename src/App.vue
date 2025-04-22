<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white font-sans relative overflow-hidden">
    <!-- Animated stars background -->
    <div class="stars-container absolute inset-0 overflow-hidden">
      <div v-for="i in 50" :key="i" class="star" :style="{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`
      }">
      </div>
    </div>

    <!-- Main content -->
    <div class="container mx-auto px-4 py-12 relative z-10">
      <header class="text-center mb-12">
        <h1
          class="text-4xl md:text-5xl pb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-200">
          Thần Số Học
        </h1>
        <p class="text-lg text-purple-200 max-w-2xl mx-auto">
          Nhập ngày sinh để tìm hiểu về đường đời và ý nghĩa trong thần số học
        </p>
      </header>

      <!-- Input form section -->
      <div
        class="max-w-md mx-auto bg-purple-900/40 backdrop-blur-md rounded-lg p-6 border border-purple-500/30 shadow-lg mb-10">
        <div class="mb-6">
          <label for="birthdate" class="block text-purple-200 mb-2 text-lg">Ngày Sinh Của Bạn</label>
          <input type="date" id="birthdate" v-model="birthdate"
            class="w-full bg-purple-800/50 border border-purple-500/50 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            :class="{ 'border-red-500': error }" />
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
          <div class="flex flex-col md:flex-row items-center mb-6">
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

            <div class="text-center md:text-left">
              <h2 class="text-2xl font-bold mb-2 text-purple-200">Số Đường Đời Của Bạn Là</h2>
              <div class="flex items-center justify-center md:justify-start">
                <span
                  class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-200">{{
                    lifePathNumber }}</span>
                <span v-if="isMasterNumber"
                  class="ml-2 px-2 py-1 bg-purple-700/50 rounded-md text-xs text-purple-200">Số Chủ</span>
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

<script setup lang="ts">
import { ref, computed } from 'vue';

// Reactive state
const birthdate = ref('');
const error = ref('');
const isCalculating = ref(false);
const showResult = ref(false);
const lifePathNumber = ref(null);
const isMasterNumber = ref(false);

// Calculate Life Path Number
const calculateLifePathNumber = () => {
  // Validate input
  if (!birthdate.value) {
    error.value = 'Vui lòng nhập ngày sinh của bạn';
    return;
  }

  error.value = '';
  isCalculating.value = true;

  // Simulate calculation time for better UX
  setTimeout(() => {
    const dateString = birthdate.value;
    const dateParts = dateString.split('-');

    if (dateParts.length !== 3) {
      error.value = 'Định dạng ngày không hợp lệ';
      isCalculating.value = false;
      return;
    }

    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    // Calculate Life Path Number
    let sum = 0;

    // Add day
    for (let i = 0; i < day.length; i++) {
      sum += parseInt(day[i]);
    }

    // Add month
    for (let i = 0; i < month.length; i++) {
      sum += parseInt(month[i]);
    }

    // Add year
    for (let i = 0; i < year.length; i++) {
      sum += parseInt(year[i]);
    }

    // Reduce to a single digit, except for master numbers 11 and 22
    while (sum > 9 && sum !== 11 && sum !== 22) {
      let tempSum = 0;
      while (sum > 0) {
        tempSum += sum % 10;
        sum = Math.floor(sum / 10);
      }
      sum = tempSum;
    }

    lifePathNumber.value = sum;
    isMasterNumber.value = sum === 11 || sum === 22;
    isCalculating.value = false;
    showResult.value = true;
  }, 1500);
};

// Number meanings in Vietnamese
const numberMeaning = computed(() => {
  switch (lifePathNumber.value) {
    case 1:
      return 'Số 1 tượng trưng cho sự lãnh đạo và độc lập. Bạn là người có tính cách mạnh mẽ, quyết đoán và thường đi tiên phong trong nhiều lĩnh vực. Bạn có khả năng sáng tạo và đổi mới, luôn muốn tạo ra con đường riêng cho mình thay vì đi theo người khác.';
    case 2:
      return 'Số 2 tượng trưng cho sự hợp tác và cân bằng. Bạn là người nhạy cảm, trực giác và có khả năng làm việc hiệu quả trong nhóm. Bạn thường là người hòa giải trong các mối quan hệ và có khả năng nhìn nhận vấn đề từ nhiều góc độ khác nhau.';
    case 3:
      return 'Số 3 tượng trưng cho sự sáng tạo và giao tiếp. Bạn là người có óc tưởng tượng phong phú, khả năng diễn đạt tốt và thường mang lại niềm vui cho người khác. Bạn có tài năng nghệ thuật và khả năng truyền cảm hứng cho mọi người xung quanh.';
    case 4:
      return 'Số 4 tượng trưng cho sự ổn định và thực tế. Bạn là người đáng tin cậy, chăm chỉ và có tổ chức. Bạn thích xây dựng nền tảng vững chắc và làm việc một cách có phương pháp. Sự kiên nhẫn và tính kỷ luật giúp bạn đạt được mục tiêu dài hạn.';
    case 5:
      return 'Số 5 tượng trưng cho sự tự do và thay đổi. Bạn là người năng động, thích khám phá và luôn tìm kiếm những trải nghiệm mới. Bạn dễ dàng thích nghi với hoàn cảnh và không thích bị giới hạn. Sự linh hoạt và óc phiêu lưu là những đặc điểm nổi bật của bạn.';
    case 6:
      return 'Số 6 tượng trưng cho sự hài hòa và trách nhiệm. Bạn là người có tính nuôi dưỡng, quan tâm đến gia đình và cộng đồng. Bạn có khả năng tạo ra không gian an toàn và thoải mái cho người khác. Sự cân bằng và công bằng là những giá trị quan trọng đối với bạn.';
    case 7:
      return 'Số 7 tượng trưng cho sự phân tích và tâm linh. Bạn là người thông minh, có óc phân tích sâu sắc và thường tìm kiếm ý nghĩa sâu xa của cuộc sống. Bạn thích sự yên tĩnh và thời gian riêng tư để suy ngẫm. Trực giác và khả năng nhìn thấu bản chất vấn đề là điểm mạnh của bạn.';
    case 8:
      return 'Số 8 tượng trưng cho sức mạnh và thành công vật chất. Bạn là người có tham vọng, quyết tâm và khả năng tổ chức tốt. Bạn có năng lực quản lý tài chính và thường đạt được thành công trong kinh doanh. Sự tự tin và khả năng lãnh đạo giúp bạn vượt qua thử thách.';
    case 9:
      return 'Số 9 tượng trưng cho sự nhân ái và trí tuệ. Bạn là người có tầm nhìn rộng, lòng vị tha và mong muốn đóng góp cho xã hội. Bạn có khả năng nhìn nhận vấn đề từ góc độ toàn cầu và thường truyền cảm hứng cho người khác bằng sự thấu hiểu sâu sắc của mình.';
    case 11:
      return 'Số 11 là số chủ đầu tiên, tượng trưng cho sự trực giác cao độ và sự giác ngộ tâm linh. Bạn là người nhạy cảm, có khả năng kết nối với thế giới tâm linh và thường nhận được những thông điệp sâu sắc. Bạn có tiềm năng trở thành người truyền cảm hứng và dẫn dắt người khác trên con đường tâm linh.';
    case 22:
      return 'Số 22 là số chủ thứ hai, được gọi là "Người Xây Dựng Vĩ Đại". Bạn có tầm nhìn lớn và khả năng biến những ý tưởng trừu tượng thành hiện thực. Bạn có tiềm năng tạo ra những thay đổi lớn trong xã hội và để lại di sản lâu dài. Sự thực tế kết hợp với trí tưởng tượng giúp bạn đạt được những thành tựu phi thường.';
    default:
      return 'Không thể xác định ý nghĩa cho số này.';
  }
});

// Compatible zodiac signs based on Life Path Number
const compatibleZodiac = computed(() => {
  switch (lifePathNumber.value) {
    case 1:
      return 'Bạch Dương, Sư Tử, Nhân Mã';
    case 2:
      return 'Cự Giải, Song Ngư, Thiên Bình';
    case 3:
      return 'Song Tử, Thiên Bình, Bảo Bình';
    case 4:
      return 'Kim Ngưu, Ma Kết, Xử Nữ';
    case 5:
      return 'Song Tử, Bảo Bình, Nhân Mã';
    case 6:
      return 'Kim Ngưu, Xử Nữ, Ma Kết';
    case 7:
      return 'Bọ Cạp, Song Ngư, Cự Giải';
    case 8:
      return 'Ma Kết, Xử Nữ, Kim Ngưu';
    case 9:
      return 'Nhân Mã, Bạch Dương, Sư Tử';
    case 11:
      return 'Bọ Cạp, Song Ngư, Cự Giải';
    case 22:
      return 'Ma Kết, Xử Nữ, Kim Ngưu';
    default:
      return 'Không thể xác định cung hoàng đạo tương thích.';
  }
});
</script>

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
