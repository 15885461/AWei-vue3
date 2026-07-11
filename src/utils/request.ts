import { getToken } from './auth'
export interface ApiResponse<T> {
  code: number
  msg: string
  data: T
}
export interface RequestConfig<T> {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  mockResponse: ApiResponse<T>
}

export function request<T>(config: RequestConfig<T>) {
  const token = getToken()
  const finalConfig = {
    ...config,
    headers: {
      ...config.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }
  console.log('request config:', finalConfig)
  return new Promise<ApiResponse<T>>((resolve, reject) => {
    setTimeout(() => {
      const response = config.mockResponse
      if (response.code === 200) {
        resolve(response)
      } else {
        reject(new Error(response.msg))
      }
    }, 300)
  })
}
