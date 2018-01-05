import request from '@/utils/request'

export function getProductList(params) {
  return request({
    url: '/product/table/list',
    method: 'POST',
    params
  })
}

  