import request from '@/utils/request'
// 获取用户列表页数
export function gitLists(param) {
  return request({
    url: '/users/list', // 假地址 自行替换
    method: 'get',
    params: param

  })
}

// 更新用户信息
export function updateUserList(data) {
  return request({
    url: '/users/update', // 假地址 自行替换
    method: 'post',
    data

  })
}

