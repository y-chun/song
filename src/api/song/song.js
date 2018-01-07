import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/song/tableList',
    method: 'POST',
    params
  })
}

export function getNote(params) {
    return request({
      url: '/song/viewNote',
      method: 'POST',
      params
    })
  }
  	

export function quoteSong(params) {
    return request({
      url: '/song/quoteSong',
      method: 'POST',
      params
    })
  }
  
 export function deleteSong(params) {
    return request({
      url: '/song/delete',
      method: 'POST',
      params
    })
  }
   