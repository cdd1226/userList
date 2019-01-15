<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="100"/>
      <el-table-column
        label="头像"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" style="width:100%">
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180"/>
      <el-table-column
        prop="phone"
        label="手机号"
        width="130"/>
      <el-table-column
        prop="email"
        label="邮箱"
        width="160"/>
      <el-table-column
        prop="address"
        label="地址"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- //分页器 -->
    <el-pagination
      :current-page="current"
      :total="100"
      layout="prev, pager, next"
      @current-change="hanlechanges"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      current: 1
    }
  },
  computed: {
    ...mapState({
      tableData: state => state.list.list
    })
  },
  created() {
    this.gitList()
  },
  methods: {
    ...mapActions({
      gitList: 'list/gitList'
    }),
    handleEdit(scope, index) {
      console.log(scope, index)
    },
    handleDelete(scope, index) {

    },
    hanlechanges(page) {
      this.gitList({ page })
    }
  }

}
</script>
