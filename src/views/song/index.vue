<template>
  <div class="app-container">
    <div class="app-content">
      <div class="over-table">
        <el-button type="primary" icon="el-icon-edit" @click="labelManageState = true" class="over-table-btn" size="mini">标签管理</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="addSong('add')" class="over-table-btn" size="mini">新增</el-button>
        <el-button type="info"@click="addSongState=true" class="over-table-btn" size="mini" plain>搜索</el-button>
        <el-input v-model="input" placeholder="请输入曲子名称或标签" size="mini" class="over-table-input"></el-input>
      </div>
      <!--曲子列表-->
        <el-table :data="currentTableData" style="width: 100%" @cell-click="cellClick" v-loading.body="listLoading" border stripe>
          <el-table-column prop="ID" label="ID" min-width="80">
          </el-table-column>
          <el-table-column prop="name" label="名称" min-width="200">
            <template slot-scope="scope">
              <el-tag type="success" size="small">标签二</el-tag>
              <!-- <svg height="90px" width="69px">
               <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="require('../../assets/svg/u448.svg')" height="90px" width="69px"></use>
              </svg> -->
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
              <el-button type="primary" size="mini" @click="addSong('edit',scope.row.ID)">编辑</el-button>
              <el-button type="primary" size="mini" @click="checkNote(scope.row.ID)">查看备注</el-button>
              <el-button type="primary" size="mini" @click="deleteSongFun(scope.row.ID)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      <div class="table-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="pageSizes"
          :page-size="limit"
          layout="sizes, prev, pager, next"
          :total="total"
          style="float:right">
        </el-pagination>
      </div>
      <!--新增曲子弹窗-->
      <AddSongModal v-model="addSongState" @changeModalState="changeAddSongModalState" :type="addModalType"/>
      <LabelManage v-model="labelManageState" @changeModalState="changeLabelManageState"/>
      <InfoModal v-model="infoModalState" @changeModalState="changeInfoState" :modalLoading="infoLoading">
        <p>{{note}}</p>
      </InfoModal>
      <QuoteModal v-model="quoteModalState" @changeModalState="changeQuoteModalState"/>
      <CheckSongModal v-model="checkSongModalState" @changeModalState="changeCheckSongModalState"/>  
    </div>
    <!-- <audio src="someaudio.wav" style="display:block"> -->
  </div>
</template>

<script>
import AddSongModal  from './AddSongModal';
import LabelManage from './LabelManage';
import QuoteModal from './QuoteModal';
import CheckSongModal from './CheckSongModal';
import InfoModal from '@/components/InfoModal';
import {getList,getNote,deleteSong} from '@/api/song/song';

export default {
  components: {
    AddSongModal,
    LabelManage,
    InfoModal,
    QuoteModal,
    CheckSongModal
  },
  data() {
    return {
      input: "",
      fileList: [],
      note:"",
      infoLoading:false,
      listLoading: true,
      addSongState: false,
      infoModalState:false,
      quoteModalState:false,
      labelManageState:false,
      checkSongModalState:false,
      addModalType:"add",
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
      currentPage: 1,
      pageSizes:[5, 10, 20],
      sortMethod: data => data,
      limit:5
    };
  },
  mounted(){
    getList().then(res=>{
      this.listLoading = false;
      this.tableData=res.data.tableData;
    })
  },
  computed: {
      total() {
        return this.tableData.length;
      },
      offset() {
        return this.limit * (this.currentPage - 1);
      },
      currentTableData() {
        const end = this.offset + this.limit;
        return this.sortMethod(this.tableData).slice(this.offset, end);
      }
    },
  watch: {
      tableData() {
        // 切换数据来源，分页重置
        this.currentPage = 1;
      }
    },
  methods: {
    /**
     * 打开查看备注
     */
    checkNote(){
      this.changeInfoState(true);
      this.infoLoading = true;
      getNote().then(res=>{
        console.log(res)
        this.note = res.data.info;
        this.infoLoading = false;
      })
    },

    addSong(type,ID){
      this.addModalType=type;
      this.changeAddSongModalState(true);
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
      this.limit = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    /**
     * 删除列表数据
     */
    deleteSongFun(){
      deleteSong().then(res=>{

      })
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

    /**
     * 修改查看曲子状态
     */
    changeCheckSongModalState(state){
      this.checkSongModalState = state;
    },

    clickCitation(){
      this.changeCheckSongModalState(true)
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

