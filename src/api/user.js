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

export function getUserInfo(data) {
  return request({
    url: '/api/user/info',
    method: 'post',
    data: data
  })
}

export function editUser(data) {
  return request({
    url: '/api/user/edit',
    method: 'post',
    data: data
  })
}

export function addUser(data) {
  return request({
    url: '/api/user/add',
    method: 'post',
    data: data
  })
}