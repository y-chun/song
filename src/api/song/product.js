import request from '@/utils/request'

export function getProductList(data) {
  return request({
    url: '/Product/tableList',
    method: 'POST',
    data
  })
}

export function getProductNote(data) {
  return request({
    url: '/Product/viewNote',
    method: 'POST',
    data
  })
}

export function AddProduct(data) {
  return request({
    url: '/Product/addProduct',
    method: 'POST',
    data
  })
}

export function editProduct(data) {
  return request({
    url: '/Product/editProduct',
    method: 'POST',
    data
  })
}

export function deleteProduct(data) {
  return request({
    url: '/Product/delete',
    method: 'POST',
    data
  })
}

export function getAlbumList(params) {
  return request({
    url: '/Product/AlbumList',
    method: 'GET',
    params
  })
}    


export function getProductForm(data) {
  return request({
    url: '/Product/productForm',
    method: 'POST',
    data
  })
}

export function updateProductAlubm(data) {
  return request({
    url: '/Product/updateAlubm',
    method: 'POST',
    data
  })
}

export function deleteProductAlubm(data) {
  return request({
    url: '/Product/deleteAlubm',
    method: 'POST',
    data
  })
}

export function addProductAlubm(data) {
  return request({
    url: '/Product/addAlubm',
    method: 'POST',
    data
  })
}
