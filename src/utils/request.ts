export interface ApiResponse<T> {
  code: number
  msg: string
  data: T
}

export function request<T>(response: ApiResponse<T>) {
  return new Promise<ApiResponse<T>>((resolve) => {
    setTimeout(() => {
      resolve(response)
    }, 300)
  })
}
