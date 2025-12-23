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
    isLoading: toRef(state.isLoading),
    isShowResult: toRef(state.isShowResult),
  }
}

export const provideIndicator = () => {
  return useAnalyst()
}
