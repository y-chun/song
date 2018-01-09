<template>
<div class="modal">
    <el-dialog title="专辑管理" :visible.sync="show" @close="dialogFormVisible" width="50%"  @open="getAlbumListFun">
        <div class="modal-ctx" v-loading="modalLoading">
          <div class="over-table">
            <el-button type="primary" size="mini" @click="addAlbum">新增</el-button>
          </div>
          <div class="modal-label-box">
            <el-table :data="tableData" style="width: 100%" v-loading.body="listLoading"  stripe>
              <el-table-column prop="album_name" label="专辑名称" min-width="80">
                <template slot-scope="scope">
                  <p v-show="!scope.row['edit']">
                    {{scope.row.album_name}}
                  </p>
                  <el-input v-show="scope.row['edit']" size="small" v-model="scope.row.album_name" placeholder="请输入标签或专辑名称"/>
                </template>
              </el-table-column>
              <el-table-column prop="product_num" label="产品数" min-width="80">
              </el-table-column>
              <el-table-column prop="operation" label="操作" min-width="200">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" v-show="!scope.row['edit']" @click="editTable(scope.$index)">编辑</el-button>
                  <el-button type="text" size="mini" v-show="!scope.row['edit']"
                  @click="deleteTable(scope.$index)">删除</el-button>
                  <el-button type="text" size="mini" v-show="scope.row['edit']" @click="saveTable(scope.$index)">保存</el-button>
                  <el-button type="text" size="mini" v-show="scope.row['edit']" @click="cancleEditTable(scope.$index)">取消</el-button>
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
import {getAlbumList,uploadProductAlubm,deleteProductAlubm} from '@/api/song/product';
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
    getAlbumListFun(){
      this.modalLoading = true;
      getAlbumList().then(res=>{
				console.log(res.data.tableData)
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
      deleteProductAlubm().then(res=>{
        this.modalLoading = false;
        this.getAlbumListFun();
        messageInfo.bind(this)('删除成功','success')
      }).catch(res=>{
        this.modalLoading = false;
        messageInfo.bind(this)('删除失败','error')
      })
    },

    /**
     * 保存表格数据
     */
    saveTable(index){
      this.modalLoading = true;
      uploadProductAlubm().then(res=>{
        this.modalLoading = false;
        this.getAlbumListFun();
        messageInfo.bind(this)('更新成功','success')
      }).catch(res=>{
        this.modalLoading = false;
         messageInfo.bind(this)('更新失败','error')
      })
      this.cancleEditTable(index);//停止编辑
    },

    addAlbum(){
      let albumOb = {
        "album_name": "",
        "product_num": "",
        "edit":true
      }
      this.tableData.push(albumOb)
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

