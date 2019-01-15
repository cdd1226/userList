import { gitLists } from '@/api/user'

const state = {
  list: []
}
// 同步
const mutations = {
  updateList(state, list) {
    // console.log(state,list)
    state.list = list
  }
}
// 异步
const actions = {
  // query指的是点击的页数
  gitList({ commit }, query) {
    return new Promise((resolve, reject) => {
      // console.log(gitLists)
      gitLists(query).then(res => {
        // console.log(res);
        if (res.data.code == 1) {
          commit('updateList', res.data.data.list)
          resolve()
        } else {
          reject(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    })
  }
}

export default{
  namespaced: true,
  state,
  actions,
  mutations

}
