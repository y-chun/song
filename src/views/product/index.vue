<template>
  <div class="app-container">
    <div class="app-content">
      <div class="over-table">
        <el-button type="primary" icon="el-icon-edit" class="over-table-btn" size="mini">专辑管理</el-button>
        <el-button type="primary" icon="el-icon-edit" class="over-table-btn" size="mini" @click="addProductModalState=true">新增</el-button>
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
          <el-table-column prop="operation" label="操作" width="237">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" >编辑</el-button>
              <el-button type="primary" size="mini" @click="checkNote(scope.row)">查看备注</el-button>
              <el-button type="primary" size="mini" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"
          :page-sizes="[20, 40, 60]"
          :page-size="100"
          layout="sizes, prev, pager, next"
          :total="1000"
          style="float:right">
        </el-pagination>
      </div>
    </div>
    <InfoModal v-model="infoModalState" @changeInfoState="changeInfoState"/>
    <AddProductModal v-model="addProductModalState" @changeAddProductModalState="changeAddProductModalState" />
  </div>
</template>

<script>
import InfoModal from '@/components/InfoModal';
import AddProductModal from './AddProductModal';
  export default {
     components: {
      InfoModal,
      AddProductModal
    },
    data() {
      return {
        infoModalState:false,
        addProductModalState:false,
        input:"",
        dialogFormVisible: false,
        listLoading: false,
        currentPage2: 5,
        tableData: [{
            ID: "1",
            name: "王小虎",
            quote_song: "上海市普陀区金沙江路 1518 弄",
            planner: "note",
            album_name: "专辑名称",
            operation: "操作"
          },
        ]
      };
    },
    methods: {
      /**
       * 打开查看备注
       */
      checkNote(){
        this.changeInfoState(true);
      },
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
      },

      /**
       * 修改备注窗口状态
       */
      changeInfoState(state){
        this.infoModalState = state;
      },

      /**
       * 修改新增窗口状态
       */
      changeAddProductModalState(state){
        this.addProductModalState = state;
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

