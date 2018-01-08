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

export function AddProduct(params) {
  return request({
    url: '/product/addProduct',
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

export function getAlbumList(params) {
  return request({
    url: '/product/AlbumList',
    method: 'POST',
    params
  })
}    


export function getProductForm(params) {
  return request({
    url: '/product/productForm',
    method: 'POST',
    params
  })
}