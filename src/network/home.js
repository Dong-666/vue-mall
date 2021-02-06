import {request} from './request.js'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    //接口已修改
    url: '/api/h8/home/data',
    params: {
      type,
      page
    }
  })
}