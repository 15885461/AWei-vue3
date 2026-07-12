import { useUserStore } from '@/stores/user'

export function hasPermi(value: string | string[]) {
  const userStore = useUserStore()
  const permissions = userStore.permissions
  const allPermissions = '*:*:*'

  const requiredPermissions = Array.isArray(value) ? value : [value]
  return (
    permissions.includes(allPermissions) ||
    requiredPermissions.some((item) => permissions.includes(item))
  )
}
