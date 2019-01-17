<template>
  <div>
    <h1>{{ this.$route.path }}</h1>
    <div class="block">
      <p>我的权限</p>
      <el-tree
        v-permission="[&quot;admin&quot;]"
        :data="mewData"
        :expand-on-click-node="false"
        show-checkbox
        node-key="id"
        default-expand-all>
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ node.data.name }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => append(node,data)">
              Append
            </el-button>
            <!-- <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)">
              Delete
            </el-button> -->
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mewData: [],
      organize: [{
        id: 1, name: '***事业部', parentid: ''
      }, {
        id: 2, name: '***事业部', parentid: ''
      }, {
        id: 3, name: '总经办', parentid: ''
      }, {
        id: 4, name: '技术研发', parentid: 1
      }, {
        id: 5, name: '产品研发', parentid: 1
      }, {
        id: 6, name: '市场渠道', parentid: 1
      }, {
        id: 7, name: '商业合作', parentid: 1
      }, {
        id: 8, name: '前端开发', parentid: 4
      }, {
        id: 9, name: '后端开发', parentid: 4
      }, {
        id: 10, name: 'ios开发', parentid: 4
      }, {
        id: 11, name: 'android开发', parentid: 4
      }, {
        id: 12, name: '测试', parentid: 4
      }, {
        id: 13, name: '运维', parentid: 4
      }, {
        id: 14, name: '设计', parentid: 4
      }, {
        id: 15, name: '产品', parentid: 5
      }, {
        id: 16, name: '运营', parentid: 5
      }, {
        id: 17, name: '产品总监', parentid: 15
      }, {
        id: 18, name: '产品经理', parentid: 15
      }, {
        id: 19, name: '资深前端开发', parentid: 8
      }, {
        id: 20, name: '高级前端开发', parentid: 8
      }, {
        id: 21, name: '初级前端开发', parentid: 8
      }, {
        id: 22, name: '孙月', parentid: 20
      }]
    }
  },
  computed: {
    data() {
      return this.formatData(this.organize)
    }
  },
  created() {
    this.formatData(this.organize)
  },
  methods: {
    formatData(arr) {
      const newArr = []
      arr.forEach(item => {
        if (!item.parentid) {
          newArr.push(item)
        } else {
          this.findItem(newArr, item)
        }
      })
      //  return this.formatData(this.organize)
      console.log(newArr)
      // return newArr;
      this.mewData = newArr
    },
    // 封装寻找子元素方法 递归渲染
    findItem(arr, item) {
      arr.forEach(val => {
        // 如果当前数组找到了
        if (val.id === item.parentid) {
          if (val.children) {
            val.children.push(item)
          } else {
            val.children = [item]
          }
        } else if (val.children) {
          // 找不到  一层层找
          this.findItem(val.children, item)
        }
      })
    },
    append(node, data) {

    }
  }
}
</script>
