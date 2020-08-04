import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data: data
  })
}

export function getUserList() {
  return request({
    url: '/api/user/list',
    method: 'post'
  })
}

export function removeUser(data) {
  return request({
    url: '/api/user/remove',
    method: 'post',
    data: data
  })
}