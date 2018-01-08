<template>
<div class="modal">
    <el-dialog title="查看曲子" :visible.sync="show" @close="dialogFormVisible" width="50%">
        <div class="modal-ctx" v-loading="modalLoading">
          <div class="over-table">
            <el-button type="primary" size="mini" >新增</el-button>
          </div>
          <el-table :data="tableData" style="width: 100%" v-loading.body="listLoading"  stripe>
            <el-table-column prop="labelName" label="产品名称" min-width="80">
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible">取 消</el-button>
            <el-button type="primary" @click="songDialogSure">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
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
        this.$emit("input", newValue);
      }
    }
  },
  data() {
    return {
      modalLoading:false,
      listLoading:false,
      tableData: [
        {
          productName: "1",
        },
         {
          productName: "1",
        },
      ]
    };
  },
  methods: {
    songDialogSure(){},
    dialogFormVisible() {
      this.$emit("changeModalState", false);
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
.over-table-btn {
  margin: 10px;
  float: right;
}
.over-table {
  overflow: hidden;
}
</style>

