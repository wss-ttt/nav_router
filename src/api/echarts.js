import request from '@/utils/request'

export function getTemperatureData() {
  return request({
    url: '/api/temperature/data',
    method: 'post'
  })
}