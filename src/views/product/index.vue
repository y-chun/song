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
              <el-button type="primary" size="mini" @click="addProductModalState=true">编辑</el-button>
              <el-button type="primary" size="mini" @click="viewNote(scope.row.ID)">查看备注</el-button>
              <el-button type="primary" size="mini" @click="deleteProductFun(scope.row.ID)">删除</el-button>
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
    <InfoModal v-model="infoModalState" @changeInfoState="changeInfoState">
      <p>{{note}}</p>
    </InfoModal>
    <AddProductModal v-model="addProductModalState" @changeAddProductModalState="changeAddProductModalState" />
  </div>
</template>

<script>
import InfoModal from '@/components/InfoModal';
import AddProductModal from './AddProductModal';
import {getProductList,getProductNote,deleteProduct} from '@/api/song/product'
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
        listLoading: true,
        note:"",
        currentPage2: 5,
        tableData: []
      };
    },
    mounted(){
      getProductList().then(res=>{
        console.log(res)
        this.listLoading = false;
        this.tableData = res.data.tableData;
      })
    },
    methods: {
      /**
       * 打开查看备注
       */
      viewNote(){
        this.changeInfoState(true);
        getProductNote().then(res=>{
          this.note = res.data.info
        })
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
       * 删除数据
       */
      deleteProductFun(ID){
        deleteProduct().then(res=>{
          this.$message({
          message: '删除成功',
          type: 'success'
        });
        })
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

