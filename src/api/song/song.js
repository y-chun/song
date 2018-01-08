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
  	

export function putQuoteSong(params) {
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

  export function getLabelList(params) {
    return request({
      url: '/song/labelList',
      method: 'POST',
      params
    })
  }
  
  export function getQuoteContent(params) {
    return request({
      url: '/song/quote',
      method: 'POST',
      params
    })
  }

  export function getSongForm(params) {
    return request({
      url: '/song/SongForm',
      method: 'POST',
      params
    })
  }