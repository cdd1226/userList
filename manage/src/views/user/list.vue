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
      <!-- 角色增加 -->
      <el-table-column label="角色" width="110">
        <template slot-scope="scope">
          <el-tag
            v-for="tag in scope.row.rolers"
            :key="tag"
            :disable-transitions="false"
            closable
            @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column>
      <!--权限增加 -->

      <el-table-column label="角色" width="120">
        <template slot-scope="scope">
          <el-tag
            v-for="tag in scope.row.access"
            :key="tag"
            :disable-transitions="false"
            closable
            @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="mini"
            @click="handleRoler(scope.$index, scope.row)">修改角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :current-page="current"
      :total="100"
      layout="prev, pager, next"
      @current-change="hanlechanges"/>

    <el-dialog
      :visible.sync="dialogs"
      :before-close="handleClose"
      :title="type=='edit'?'编辑用户信息':'修改用户角色'"
      center
      width="50%">
      <el-form ref="form" :model="currents" :rules="editRules" label-position="right" label-width="80px">
        <el-form-item v-if="type=='edit'" label="用户名" prop="username">
          <el-input v-model="currents.username"/>
        </el-form-item>
        <el-form-item v-if="type=='edit'" label="手机号" prop="phone" >
          <el-input v-model="currents.phone"/>
        </el-form-item>
        <el-form-item v-if="type=='edit'" label="头像">
          <el-upload
            :show-file-list="false"
            action="123"
            class="avatar-uploader">
            <img v-if="currents.avatar" :src="currents.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="type=='edit'" label="邮箱" prop="email">
          <el-input v-model="currents.email"/>
        </el-form-item>

        <!-- //角色的遮罩层 -->
        <el-form-item v-if="type=='roler'" label="全部角色" prop="email">
          <el-tag
            v-for="tag in myRolers"
            :key="tag"
            :disable-transitions="false"
            closable
            @close="deleteRoules(tag)">
            {{ tag }}
          </el-tag>
        </el-form-item>
        <el-form-item v-if="type=='roler'" label="我的角色" prop="email">
          <el-tag
            v-for="tag in rolers"
            :key="tag">
            <span @click="addRolers(tag)">
              {{ tag }}
            </span>
          </el-tag>
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
      if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value)) {
        callback(new Error('输入正确的手机号'))
      } else {
        callback()
      }
    }
    const emailValidator = (val, value, callback) => {
      if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
        callback(new Error('输入正确的邮箱'))
      } else {
        callback()
      }
    }
    return {
      current: 1,
      currents: {},
      dialogs: false,
      rolers: ['boss', 'developer', 'producter', 'operator', 'designer'],
      myRolers: [],
      editRules: {
        username: [{ trigger: 'blur', required: true, message: '用户必填' }],
        phone: [{ trigger: 'blur', required: true, message: phoneValidator }],
        email: [{ trigger: 'blur', required: true, message: emailValidator }]
      },
      type: '' // 弹框类型,edit表示修改信息, roler表示修改角色
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
  // 使用store的数据
  methods: {
    ...mapActions({
      gitList: 'list/gitList',
      updateUserList: 'list/updateUserList',
      deleteUserList: 'list/deleteUserList',
      modifyRoler: 'list/modifyRoler'
    }),
    handleEdit(index, row) {
      // console.log(scope, index);
      this.type = 'edit'
      this.currents = { ...row }
      this.dialogs = true
    },

    // 删除功能
    handleDelete(index, scope) {
      const { id } = scope
      this.deleteUserList({ uid: id })
        .then(res => {
          this.$message({
            message: res,
            center: true,
            type: 'sucess'
          })
          this.gitList({ page: this.current })
        })
        .catch(err => {
          this.$message({
            message: err,
            center: true,
            type: 'error'
          })
        })
    },
    handleClose() {
      this.dialogs = false
    },
    hanlechanges(page) {
      this.current = page
      this.gitList({ page })
    },
    // 点击确定，刷新页面
    submit() {
      if (this.type === 'edit') {
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log(this.currents)
            const { id, username, email, phone } = this.currents
            this.updateUserList({ id, username, email, phone })
              .then(res => {
                this.$message({
                  message: res,
                  center: true,
                  type: 'sucess'
                })
                this.gitList({ page: this.current })
              })
              .catch(err => {
                this.$message({
                  message: err,
                  center: true,
                  type: 'error'
                })
              })
            this.dialogs = false

          // 添加权限555555
          }
        })
      } else if (this.type === 'roler') {
        const { id } = this.currents
        // 后台接口必须是rolersId  不然报错；
        const rolersId = this.myRolers.map(item => {
          return this.rolers.findIndex(value => value === item) + 1
        })
        console.log(rolersId)
        this.modifyRoler({ uid: id, rolersId }).then(res => {
          this.$message({
            message: res,
            center: true,
            type: 'sucess'
          })
          this.gitList({ page: this.current })
        })
          .catch(err => {
            this.$message({
              message: err,
              center: true,
              type: 'error'
            })
          })
        this.dialogs = false
      }
    },
    // 修改权限
    handleRoler(index, row) {
      this.type = 'roler'
      this.currents = { ...row }
      this.myRolers = [...row.rolers]
      this.dialogs = true
    },
    // 删除角色标签
    deleteRoules(roler) {
      const index = this.myRolers.findIndex(item => item === roler)
      this.myRolers.splice(index, 1)
    },
    // 添加标签
    addRolers(roler) {
      this.myRolers.push(roler)
      this.myRolers = [...new Set(this.myRolers)]
    }
  }
}
</script>
<style>
.avatar {
  width: 20%;
}
</style>

