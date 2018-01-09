import request from '@/utils/request'

export function getProductList(data) {
  return request({
    url: '/product/tableList',
    method: 'POST',
    data
  })
}

export function getProductNote(data) {
  return request({
    url: '/product/viewNote',
    method: 'POST',
    data
  })
}

export function AddProduct(data) {
  return request({
    url: '/product/addProduct',
    method: 'POST',
    data
  })
}

export function editProduct(data) {
  return request({
    url: '/product/editProduct',
    method: 'POST',
    data
  })
}

export function deleteProduct(data) {
  return request({
    url: '/product/delete',
    method: 'POST',
    data
  })
}

export function getAlbumList(data) {
  return request({
    url: '/product/AlbumList',
    method: 'POST',
    data
  })
}    


export function getProductForm(data) {
  return request({
    url: '/product/productForm',
    method: 'POST',
    data
  })
}

export function uploadProductAlubm(data) {
  return request({
    url: '/product/uploadAlubm',
    method: 'POST',
    data
  })
}

export function deleteProductAlubm(data) {
  return request({
    url: '/product/deleteAlubm',
    method: 'POST',
    data
  })
}

export function addProductAlubm(data) {
  return request({
    url: '/product/addAlubm',
    method: 'POST',
    data
  })
}
