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

// 删除用户信息
export function deleteUserList(data) {
  return request({
    url: '/users/action', // 假地址 自行替换
    method: 'delete',
    data

  })
}

// 给用户分配角色
export function modifyRoler(data) {
  return request({
    url: '/users/action',
    method: 'put',
    data
  })
}
