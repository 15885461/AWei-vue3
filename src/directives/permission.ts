import type { Directive } from 'vue'
import { hasPermi } from '@/utils/permission'

export const hasPermiDirective: Directive<HTMLElement, string | string[]> = {
  mounted(el, binding) {
    const value = binding.value

    if (!value) {
      return
    }

    if (!hasPermi(value)) {
      el.parentNode?.removeChild(el)
    }
  },
}
