import request from '@/utils/request'

export function getTemperatureData() {
  return request({
    url: '/api/temperature/data',
    method: 'post'
  })
}

export function getMapData() {
  return request({
    url: '/api/map/data',
    method: 'post'
  })
}