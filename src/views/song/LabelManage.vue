<template>
<div class="modal">
    <el-dialog title="标签管理" :visible.sync="show" @close="dialogFormVisible" width="50%"  @open="getLabelListFun">
        <div class="modal-ctx" v-loading="modalLoading">
          <div class="over-table">
            <el-button type="primary" size="mini" class="over-table-btn" @click="addLabel">新增</el-button>
          </div>
          <div class="modal-label-box" ref="tableBox">
            <el-table :data="tableData" style="width: 100%" v-loading.body="listLoading"  border stripe>
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
                  <el-button type="text" size="mini" v-show="!scope.row['edit']" @click="editTable(scope)">编辑</el-button>
                  <el-button type="text" size="mini" v-show="!scope.row['edit']"
                  @click="deleteTable(scope.row)">删除</el-button>
                  <el-button type="text" size="mini" v-show="scope.row['edit']&&!scope.row['save']" @click="saveTable(scope)" class="button-clear-left">保存</el-button>
                  <el-button type="text" size="mini" v-show="scope.row['edit']&&!scope.row['save']" @click="cancleEditTable(scope.$index)">取消</el-button>
                  <el-button type="text" size="mini" v-show="scope.row['save']" @click="addLabelTable(scope)" style="margin-left:0" class="button-clear-left">保存</el-button>
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
import {getLabelList,updateSongLabel,deleteSongLabel,addSongLabel} from '@/api/song/song';
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
        this.$emit('input', newValue);
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

    /**
     * 关闭弹窗
     */
    dialogFormVisible() {
      this.$emit('changeModalState', false);
    },

    /**
     * 编辑表格
     */
    editTable(scope){
      this.tableData[scope.$index]['editText'] = scope.row.label_name;
      this.tableData[scope.$index].edit = true;
      this.tableData = [...this.tableData]
    },

    /**
     * 取消编辑表格
     */
    cancleEditTable(index){
      this.tableData[index].edit = false;
      this.tableData[index].label_name = this.tableData[index].editText;
      this.tableData = [...this.tableData]
    },

    /**
     * 删除表格数据
     */
    deleteTable(row){
      this.$confirm(`当前标签已被其他曲目引用，确定要删除？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          this.modalLoading = true;
          deleteSongLabel({id:row.id}).then(res=>{
            this.modalLoading = false;
            messageInfo.bind(this)('删除成功','success');
            this.getLabelListFun();
          }).catch(res=>{
            this.modalLoading =false;
          })
        })
      
    },

    /**
     * 保存表格数据
     */
    saveTable(scope){
      console.log(scope.row.label_name)
      if(scope.row.label_name.trim().length==0){
        messageInfo.bind(this)('标签内容不能为空','warn')
      }else{
        this.modalLoading = true;
        updateSongLabel({id:scope.row.id,label_name:scope.row.label_name}).then(res=>{
          this.modalLoading = false;
          messageInfo.bind(this)('更新成功','success');
          this.getLabelListFun()
        }).catch(res=>{
          this.modalLoading =false;
          messageInfo.bind(this)('更新失败','error');
        })
        this.cancleEditTable(scope.$index);//停止编辑
      }
    },

    /**
     * 提交新增标签
     */
    addLabelTable(scope){
      if(scope.row.label_name.trim().length==0){
         messageInfo.bind(this)('标签内容不能为空','warn')
      }else{
        this.modalLoading = true;
        addSongLabel({id:scope.row.id,label_name:scope.row.label_name}).then(res=>{
        this.modalLoading = false;
        messageInfo.bind(this)('添加成功','success');
        this.getLabelListFun();
        }).catch(res=>{
          this.modalLoading =false;
          messageInfo.bind(this)('添加失败','error');
        })
      }
    },
  
    /**
     * 取消新增标签
     */
    cancleAddLabelTable(index){
      this.tableData.splice(index,1);
      this.tableData = [...this.tableData];
    },

    /**
     * 新增标签
     */
    addLabel(){
      let tableBox = this.$refs.tableBox;
      tableBox.scrollTop = tableBox.scrollHeight;
      let labelOb = {
        label_name:'',
        edit:true,
        save:true
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
  margin: 10px 10px 10px 0px;;
}
.pull-right{
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

