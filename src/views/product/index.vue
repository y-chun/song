<template>
  <div class="app-container">
    <div class="app-content">
      <div class="over-table">
        <el-button type="primary" icon="el-icon-edit" class="over-table-btn" size="mini">专辑管理</el-button>
        <el-button type="primary" icon="el-icon-edit" class="over-table-btn" size="mini">新增</el-button>
        <el-button type="info" icon="el-icon-edit" class="over-table-btn" size="mini" plain>搜索</el-button>
        <el-input v-model="input" placeholder="请输入曲子名称或标签" size="mini" class="over-table-input"></el-input>
      </div>
      <div class="app-table-box">
        <el-table :data="tableData" style="width: 100%" @cell-click="cellClick" v-loading.body="listLoading">
          <el-table-column prop="ID" label="ID">
          </el-table-column>
          <el-table-column prop="name" label="产品名称">
          </el-table-column>
          <el-table-column prop="quote_song" label="引用曲子">
          </el-table-column>
          <el-table-column prop="planner" label="策划人">
          </el-table-column>
          <el-table-column prop="album_name" label="专辑名称">
          </el-table-column>
          <el-table-column prop="operation" label="操作">
          </el-table-column>
        </el-table>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="sizes, prev, pager, next" :total="1000">
      </el-pagination>
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="songDialogSure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input:"",
        dialogFormVisible: false,
        listLoading: false,
        currentPage2: 5,
        tableData: [{
            ID: "1",
            name: "王小虎",
            quote_song: "上海市普陀区金沙江路 1518 弄",
            noplannerte: "note",
            album_name: "专辑名称",
            operation: "操作"
          },
        ]
      };
    },
    methods: {
      songDialogSure() {
      },
      cellClick(e, c, cell, event) {
        console.log(c);
      },
      handle() {
        console.log(111);
      },
      onSubmit() {
        this.$message("submit!");
      },
      onCancel() {
        this.$message({
          message: "cancel!",
          type: "warning"
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  };
</script>

<style scoped>
  .line {
    text-align: center;
  }
  .app-table-box {
    border: 1px solid #eee;
    background-color: #fff;
  }
  .app-content {
    background-color: #fff;
    padding: 15px;
    box-shadow: 0 0 4px #aaa;
  }
  .over-table-btn {
    margin: 10px;
    float: right;
  }
  .over-table {
    overflow: hidden;
  }
  .el-button+.el-button {
    margin-left: 5px;
  }
  .over-table-input {
    margin: 10px;
    width: 180px;
    float: right;
  }
  .table-pagination {
    margin-top: 10px;
    overflow: hidden;
  }
</style>

