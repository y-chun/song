<template>
<div class="modal">
    <el-dialog title="查看歌曲" :visible.sync="show" @close="dialogFormVisible" width="40%" @open="getSongNumFun">
        <div class="modal-ctx" v-loading="modalLoading">
          <!-- <div class="over-table">
            <el-button type="primary" size="mini" >新增</el-button>
          </div> -->
          <div class="modal-label-box">
            <el-table :data="tableData" style="width: 100%" v-loading.body="listLoading"  border stripe>
              <el-table-column prop="product_name" label="产品名称" min-width="80">
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
import {getSongNum} from '@/api/song/song';
export default {
  props: {
      value: {
    	type: Boolean,
    	default: false
    },
    id:{
      type:String,
      default:''
    }
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
     * 获取列表
     */
    getSongNumFun(){
      this.modalLoading = true;
      getSongNum({id:this.id}).then(res=>{
        this.tableData = res.data.tableData
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
.over-table {
  overflow: hidden;
}
.modal-label-box{
  max-height:300px;
  overflow-y:auto;
}
</style>

