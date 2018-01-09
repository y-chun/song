import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/song/tableList',
    method: 'POST',
    data
  })
}

export function getNote(data) {
    return request({
      url: '/song/viewNote',
      method: 'POST',
      data
    })
  }
  	

export function putQuoteSong(data) {
    return request({
      url: '/song/quoteSong',
      method: 'POST',
      data
    })
  }
  
 export function deleteSong(data) {
    return request({
      url: '/song/delete',
      method: 'POST',
      data
    })
  }

  export function getLabelList(data) {
    return request({
      url: '/song/labelList',
      method: 'POST',
      data
    })
  }
  
  export function getQuoteContent(data) {
    return request({
      url: '/song/quote',
      method: 'POST',
      data
    })
  }

  export function getSongForm(data) {
    return request({
      url: '/song/SongForm',
      method: 'POST',
      data
    })
  }

  export function addSong(data) {
    return request({
      url: '/song/addSong',
      method: 'POST',
      data
    })
  }

  export function editSong(data) {
    return request({
      url: '/song/editSong',
      method: 'POST',
      data
    })
  }

  export function getSongNum(data) {
    return request({
      url: '/song/songNum',
      method: 'POST',
      data
    })
  }


  export function uploadSongLabel(data) {
    return request({
      url: '/song/uploadLabel',
      method: 'POST',
      data
    })
  }
	
  
  export function deleteSongLabel(data) {
    return request({
      url: '/song/deleteLabel',
      method: 'POST',
      data
    })
  }
  
  export function searchSongSelectList(data) {
    return request({
      url: '/song/searchSelect',
      method: 'POST',
      data
    })
  }

  export function addSongLabel(data) {
    return request({
      url: '/song/addLabel',
      method: 'POST',
      data
    })
  }
  