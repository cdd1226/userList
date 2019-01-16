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

    <el-dialog
      :visible.sync="dialogs"
      :before-close="handleClose"
      title="用户信息"
      center
      width="50%">
      <el-form ref="form" :model="currents" :rules="editRules" label-position="right" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="currents.username"/>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" >
          <el-input v-model="currents.phone"/>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            :show-file-list="false"
            action="123"
            class="avatar-uploader">
            <img v-if="currents.avatar" :src="currents.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="currents.email"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogs = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    const phoneValidator = (val, value, callback) => {
      if (
        !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
          value
        )
      ) {
        callback(new Error('输入正确的手机号'))
      } else {
        callback()
      }
    }
    const emailValidator = (val, value, callback) => {
      if (
        !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
          value
        )
      ) {
        callback(new Error('输入正确的邮箱'))
      } else {
        callback()
      }
    }
    return {
      current: 1,
      currents: {},
      dialogs: false,
      editRules: {
        username: [{ trigger: 'blur', required: true, message: '用户必填' }],
        phone: [{ trigger: 'blur', required: true, message: phoneValidator }],
        email: [{ trigger: 'blur', required: true, message: emailValidator }]
      }
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
      gitList: 'list/gitList',
      updateUserList: 'list/updateUserList'
    }),
    handleEdit(index, row) {
      // console.log(scope, index);
      this.currents = { ...row }

      this.dialogs = true
    },
    handleDelete(index, scope) {
      console.log(scope)
    },
    handleClose() {
      this.dialogs = false
    },
    hanlechanges(page) {
      this.current = page
      this.gitList({ page })
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.currents)
          const { id, username, email, phone } = this.currents
          this.updateUserList({ id, username, email, phone }).then(res => {
            this.$message({
              message: res,
              center: true,
              type: 'sucess'
            })
            this.gitList({ page: this.current })
          }).catch((err) => {
            this.$message({
              message: err,
              center: true,
              type: 'error'
            })
          })
          this.dialogs = false
        }
      })
    }
  }
}
</script>
<style>
.avatar {
  width: 20%;
}
</style>

