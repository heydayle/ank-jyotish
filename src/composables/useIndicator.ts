import { reactive, toRef, type Ref } from 'vue'

interface UseIndicator {
  isLoading: Ref<boolean>
  isShowResult: Ref<boolean>
}

const useAnalyst = (): UseIndicator => {
  const state = reactive({
    isLoading: false,
    isShowResult: false,
  })

  return {
    ...toRef(state),
  }
}

export const provideIndicator = () => {
  return useAnalyst()
}
