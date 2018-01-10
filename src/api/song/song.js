import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/Song/tableList',
    method: 'POST',
    data
  })
}

export function getNote(data) {
    return request({
      url: '/Song/viewNote',
      method: 'POST',
      data
    })
  }
  	

export function putQuoteSong(data) {
    return request({
      url: '/Song/quoteSong',
      method: 'POST',
      data
    })
  }
  
 export function deleteSong(data) {
    return request({
      url: '/Song/delete',
      method: 'POST',
      data
    })
  }

  export function getLabelList(params) {
    return request({
      url: '/Song/labelList',
      method: 'GET',
      params
    })
  }
  
  export function getQuoteContent(data) {
    return request({
      url: '/Song/quote',
      method: 'POST',
      data
    })
  }

  export function getSongForm(data) {
    return request({
      url: '/Song/SongForm',
      method: 'POST',
      data
    })
  }

  export function addSong(data) {
    return request({
      url: '/Song/addSong',
      method: 'POST',
      data
    })
  }

  export function editSong(data) {
    return request({
      url: '/Song/editSong',
      method: 'POST',
      data
    })
  }

  export function getSongNum(data) {
    return request({
      url: '/Song/songNum',
      method: 'POST',
      data
    })
  }


  export function updateSongLabel(data) {
    return request({
      url: 'Song/updateLabel',
      method: 'POST',
      data
    })
  }
	
  
  export function deleteSongLabel(data) {
    return request({
      url: '/Song/deleteLabel',
      method: 'POST',
      data
    })
  }
  
  export function searchSongSelectList(data) {
    return request({
      url: '/Song/searchSelect',
      method: 'POST',
      data
    })
  }

  export function addSongLabel(data) {
    return request({
      url: '/Song/addLabel',
      method: 'POST',
      data
    })
  }
  