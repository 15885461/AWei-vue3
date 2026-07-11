import { request } from '@/utils/request'

interface LoginData {
  token: string
}

interface UserInfo {
  name: string
  avatar: string
  roles: string[]
  permissions: string[]
}

export function login() {
  return request<LoginData>({
    url: '/login',
    method: 'POST',
    mockResponse: {
      code: 200,
      msg: '登录成功',
      data: {
        token: 'mock-token',
      },
    },
  })
}

export function getInfo() {
  return request<UserInfo>({
    url: '/user/info',
    method: 'GET',
    mockResponse: {
      code: 200,
      msg: '获取用户信息成功',
      data: {
        name: 'mock-name',
        avatar: '',
        roles: ['admin'],
        permissions: ['*:*:*'],
      },
    },
  })
}
