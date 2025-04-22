import { toRef } from 'vue'

interface UseAnalyst {
  birthdate: string
}
export const useAnalyst = (): UseAnalyst => {
  const state = {
    birthdate: '',
  }

  return {
    ...toRef(state),
  }
}
