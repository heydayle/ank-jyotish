import { ref, toRefs, computed, type Ref, type ComputedRef, type ToRefs } from 'vue'
import { lifePathDescriptions, zodiacCompatibility } from '@/constants/meanings'

type State = {
}
type UseAnalyst = ToRefs<State> & {
  birthdate: Ref<string>
  error: Ref<string>
  isValid: ComputedRef<boolean>
  isCalculating: Ref<boolean>
  showResult: Ref<boolean>
  lifePathNumber: Ref<number>
  isMasterNumber: Ref<boolean>
  numberMeaning: ComputedRef<string>
  compatibleZodiac: ComputedRef<string>
  calculateLifePathNumber: () => void
}

export const useAnalyst = (): UseAnalyst => {
  const birthdate = ref('1999-01-01')
  const error = ref('')
  const isCalculating = ref(false)
  const showResult = ref(false)
  const lifePathNumber = ref(0)
  const isMasterNumber = ref(false)
  const isValid = computed<boolean>(() => {
    return !error.value
  })
  // Calculate Life Path Number
  const calculateLifePathNumber = () => {
    console.log(birthdate.value);

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
      console.log(dateParts);

      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];

      // Calculate Life Path Number
      let sum = 0 as number;

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
  const numberMeaning = computed<string>(() => {
    if (!lifePathNumber.value) return 'Không thể xác định ý nghĩa cho số này.'
    return lifePathDescriptions[lifePathNumber.value] ?? 'Không thể xác định ý nghĩa cho số này.'
  });
  // Compatible zodiac signs based on Life Path Number
  const compatibleZodiac = computed<string>(() => {
    if (!lifePathNumber.value) return 'Không thể xác định cung hoàng đạo tương thích.'
    return zodiacCompatibility[lifePathNumber.value] ?? 'Không thể xác định cung hoàng đạo tương thích.'

  });
  return {
    birthdate,
    error,
    isValid,
    isCalculating,
    isMasterNumber,
    lifePathNumber,
    showResult,
    numberMeaning,
    compatibleZodiac,
    calculateLifePathNumber,
  }
}
