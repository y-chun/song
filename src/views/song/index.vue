<template>
  <div class="app-container">
    <div class="app-content">
      <div class="over-table">
        <el-button type="primary" icon="el-icon-edit" @click="labelManageState = true" class="over-table-btn" size="mini">标签管理</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="addSongState = true" class="over-table-btn" size="mini">新增</el-button>
        <el-button type="info" icon="el-icon-edit" @click="addSongState = true" class="over-table-btn" size="mini" plain>搜索</el-button>
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
            <template slot-scope="scope">
              <p class="song-citation-num" @click="clickCitation">
                {{scope.row.citation_num}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作"  width="363">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="primary" size="mini">试听</el-button>
              <el-button type="primary" size="mini" @click="openQuoteModal()">引用</el-button>
              <el-button type="primary" size="mini" >编辑</el-button>
              <el-button type="primary" size="mini" @click="viewNote(scope.row.ID)">查看备注</el-button>
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
      <AddSongModal v-model="addSongState" @changeAddSongModalState="changeAddSongModalState"/>
      <LabelManage v-model="labelManageState" @changeLabelManageState="changeLabelManageState"/>
      <InfoModal v-model="infoModalState" @changeInfoState="changeInfoState">
        <p>{{note}}</p>
      </InfoModal>
      <QuoteModal v-model="quoteModalState" @changeQuoteModalState="changeQuoteModalState"/>  
    </div>
    <!-- <audio src="someaudio.wav" style="display:block"> -->
  </div>
</template>

<script>
import AddSongModal  from './AddSongModal';
import LabelManage from './LabelManage';
import QuoteModal from './QuoteModal';
import InfoModal from '@/components/InfoModal';
import {getList,getNote} from '@/api/song/song'
export default {
  components: {
    AddSongModal,
    LabelManage,
    InfoModal,
    QuoteModal
  },
  data() {
    return {
      input: "",
      fileList: [],
      note:"",
      listLoading: true,
      addSongState: false,
      infoModalState:false,
      quoteModalState:false,
      labelManageState:false,
      currentPage2: 5,
      ruleForm:{
        name:""
      },
      rules: {
          name: [
            { required: true, message: '请输入曲子名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        },
      tableData:[],
    };
  },
  mounted(){
    getList().then(res=>{
      this.listLoading = false;
      this.tableData=res.data.tableData;
    })
  },
  computed: {
  },
  methods: {
    /**
     * 打开查看备注
     */
    viewNote(){
      this.changeInfoState(true);
      getNote().then(res=>{
        console.log(res)
        this.note = res.data.info
      })
    },
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

    /**
     * 打开引用窗口
     */
    openQuoteModal(){
      this.changeQuoteModalState(true);
    },

    /**
     * 修改新增歌曲窗口状态
     */
    changeAddSongModalState(state){
      this.addSongState = state;
    },

    /**
     * 修改标签管理窗口状态
     */
    changeLabelManageState(state){
      this.labelManageState = state;
    },

    /**
     * 修改备注窗口状态
     */
    changeInfoState(state){
      this.infoModalState = state;
    },

    /**
     * 修改引用窗口状态
     */
    changeQuoteModalState(state){
      this.quoteModalState = state;
    },
    clickCitation(){
      console.log(11)
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
.song-citation-num{
  cursor:pointer;
}
</style>

