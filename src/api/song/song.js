import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/song/table/list',
    method: 'POST',
    params
  })
}

export function getNote(params) {
    return request({
      url: '/song/view/note',
      method: 'POST',
      params
    })
  }
  
  