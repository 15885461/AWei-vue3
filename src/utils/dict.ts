interface DictOption {
  label: string
  value: string
  type?: string
}
const dictData: Record<string, DictOption[]> = {
  sys_normal_disable: [
    { label: '正常', value: '0', type: 'success' },
    { label: '停用', value: '1', type: 'danger' },
  ],
}
export function getDictOptions(dictType: string) {
  return dictData[dictType] || []
}

export function getDictLabel(dictType: string, value: string | number) {
  const options = getDictOptions(dictType)
  const current = options.find((item) => item.value === String(value))
  return current?.label || String(value)
}
