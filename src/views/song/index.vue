<template>
  <div class="app-container">
    <div class="app-content">
      <div class="over-table">
        <el-button type="primary" icon="el-icon-edit" @click="labelManageVisible = true" class="over-table-btn" size="mini">标签管理</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="newSongVisible = true" class="over-table-btn" size="mini">新增</el-button>
        <el-button type="info" icon="el-icon-edit" @click="newSongVisible = true" class="over-table-btn" size="mini" plain>搜索</el-button>
        <el-input v-model="input" placeholder="请输入曲子名称或标签" size="mini" class="over-table-input"></el-input>
      </div>
      <!--曲子列表-->
        <el-table :data="tableData" style="width: 100%" @cell-click="cellClick" v-loading.body="listLoading" border stripe>
          <el-table-column prop="ID" label="ID" min-width="80">
          </el-table-column>
          <el-table-column prop="name" label="名称" min-width="200">
            <template slot-scope="scope">
              <el-tag type="success" size="small">标签二</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="label" label="标签" min-width="200">
            <template slot-scope="scope">
              <el-tag type="success" size="small">标签二</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="citation_num" label="被使用次数" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="operation" label="操作"  min-width="363">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="primary" size="mini">试听</el-button>
              <el-button type="primary" size="mini" >引用</el-button>
              <el-button type="primary" size="mini" >编辑</el-button>
              <el-button type="primary" size="mini" >查看备注</el-button>
              <el-button type="primary" size="mini" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

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
      <!--新增曲子弹窗-->
      <NewSongModal v-model="newSongVisible" @changeNewSongModalState="changeNewSongModalState"/>
      <LabelManage v-model="labelManageVisible" @changeLabelManageState="changeLabelManageState"/>
    </div>
    <!-- <audio src="someaudio.wav" style="display:block"> -->
  </div>
</template>

<script>
import NewSongModal  from './NewSongModal';
import LabelManage from './LabelManage';
export default {
  components: {
    NewSongModal,
    LabelManage
  },
  data() {
    return {
      newSongVisible: false,
      labelManageVisible:false,
      listLoading: false,
      currentPage2: 5,
      input: "",
      fileList: [],
      ruleForm:{
        name:""
      },
      rules: {
          name: [
            { required: true, message: '请输入曲子名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        },
      tableData: [
        {
          ID: "1",
          name: "王小虎",
          label: "上海市普陀区金沙江路 1518 弄",
          citation_num: "1",
          operation: "note"
        },
        {
          ID: "2",
          name: "王小虎",
          label: "上海市普陀区金沙江路 1517 弄",
          citation_num: "1",
          operation: "note"
        },
        {
          ID: "3",
          name: "王小虎",
          label: "上海市普陀区金沙江路 1519 弄",
          citation_num: "1",
          operation: "note"
        },
        {
          ID: "4",
          name: "王小虎",
          label: "上海市普陀区金沙江路 1516 弄",
          citation_num: "1",
          operation: "note"
        }
      ]
    };
  },
  methods: {

    handleClick() {},
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
    changeNewSongModalState(state){
      this.newSongVisible = state
    },
    changeLabelManageState(state){
      this.labelManageVisible = state
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
.el-button + .el-button {
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

