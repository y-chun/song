import request from '@/utils/request'

export function getProductList(params) {
  return request({
    url: '/product/tableList',
    method: 'POST',
    params
  })
}

export function getProductNote(params) {
  return request({
    url: '/product/viewNote',
    method: 'POST',
    params
  })
}

export function AddProductSong(params) {
  return request({
    url: '/product/addSong',
    method: 'POST',
    params
  })
}

export function deleteProduct(params) {
  return request({
    url: '/product/delete',
    method: 'POST',
    params
  })
}    