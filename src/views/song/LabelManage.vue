<template>
<div class="modal">
    <el-dialog title="标签管理" :visible.sync="show" @close="dialogFormVisible" width="50%"  @open="getLabelListFun">
        <div class="modal-ctx" v-loading="modalLoading">
          <div class="over-table">
            <el-button type="primary" size="mini" @click="addLabel">新增</el-button>
          </div>
          <div class="modal-label-box">
            <el-table :data="tableData" style="width: 100%" v-loading.body="listLoading"  stripe>
              <el-table-column prop="label_name" label="标签名称" min-width="100">
                <template slot-scope="scope">
                  <p v-show="!scope.row['edit']">
                    {{scope.row.label_name}}
                  </p>
                  <el-input v-show="scope.row['edit']" size="small" v-model="scope.row.label_name" placeholder="请输入标签名"/>
                </template>
              </el-table-column>
              <el-table-column prop="operation" label="操作" min-width="200">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" v-show="!scope.row['edit']" @click="editTable(scope.$index)">编辑</el-button>
                  <el-button type="text" size="mini" v-show="!scope.row['edit']"
                  @click="deleteTable(scope.$index)">删除</el-button>
                  <el-button type="text" size="mini" v-show="scope.row['edit']&&!scope.row['save']" @click="saveTable(scope)">保存</el-button>
                  <el-button type="text" size="mini" v-show="scope.row['edit']&&!scope.row['save']" @click="cancleEditTable(scope.$index)">取消</el-button>
                  <el-button type="text" size="mini" v-show="scope.row['save']" @click="addLabelTable(scope)">保存</el-button>
                  <el-button type="text" size="mini" v-show="scope.row['save']" @click="cancleAddLabelTable(scope.$index)">取消</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible">取 消</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {getLabelList,uploadSongLabel,deleteSongLabel,addSongLabel} from '@/api/song/song';
import {messageInfo} from "@/utils/common"
export default {
  props: {
      value: {
    	type: Boolean,
    	default: false
    },
  },
  computed: {
    show: {
      // getter
      get() {
        return this.value;
      },
      // setter
      set(newValue) {
          console.log(newValue)
        this.$emit("input", newValue);
      }
    }
  },
  data() {
    return {
      modalLoading:false,
      listLoading:false,
      tableData: []
    };
  },
  methods: {
    /**
     * 加载标签管理弹窗列表
     */
    getLabelListFun(){
      this.modalLoading = true;
      getLabelList().then(res=>{
        this.tableData = res.data.tableData;
        this.modalLoading = false;
      }).catch(res=>{
        this.modalLoading = false;
      })
    },

    songDialogSure(){},
    dialogFormVisible() {
      this.$emit("changeModalState", false);
    },

    /**
     * 编辑表格
     */
    editTable(index){
      this.tableData[index].edit = true;
      this.tableData = [...this.tableData]
    },

    /**
     * 取消编辑表格
     */
    cancleEditTable(index){
      this.tableData[index].edit = false;
      this.tableData = [...this.tableData]
    },

    /**
     * 删除表格数据
     */
    deleteTable(index){
      this.modalLoading = true;
      deleteSongLabel().then(res=>{
        this.modalLoading = false;
        messageInfo.bind(this)('删除成功','success')
      }).catch(res=>{
        this.modalLoading =false;
      })
    },

    /**
     * 保存表格数据
     */
    saveTable(scope){
      console.log(scope.row.label_name)
      this.modalLoading = true;
      uploadSongLabel({id:scope.row.id,label_name:scope.row.label_name}).then(res=>{
        this.modalLoading = false;
        messageInfo.bind(this)('更新成功','success');
        this.getLabelListFun()
      }).catch(res=>{
        this.modalLoading =false;
        messageInfo.bind(this)('更新失败','error');
      })
      this.cancleEditTable(scope.$index);//停止编辑
    },
    addLabelTable(scope){
      if(scope.row.label_name.length==0){
         messageInfo.bind(this)('标签内容不能为空','warn')
      }else{
        this.modalLoading = true;
        addSongLabel().then(res=>{
        this.modalLoading = false;
        messageInfo.bind(this)('添加成功','success');
        this.getLabelListFun();
        }).catch(res=>{
          this.modalLoading =false;
          messageInfo.bind(this)('添加失败','error');
        })
      }
    },
    cancleAddLabelTable(){
      this.tableData.pop();
    },
    addLabel(){
      let labelOb = {
        "label_name":"",
        "edit":true,
        "save":true
      }
      this.tableData.push(labelOb)
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
.app-table-box {
  border: 1px solid #ddd;
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
.modal-label-box{
  max-height: 300px;
  overflow-y:auto 
}
</style>

