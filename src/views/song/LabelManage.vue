<template>
<div class="modal">
    <el-dialog title="新增曲子" :visible.sync="show" @close="dialogFormVisible" width="50%">
        <div class="over-table">
          <el-button type="primary" size="mini" >新增</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" v-loading.body="listLoading"  stripe>
          <el-table-column prop="labelName" label="标签名称" min-width="80">
            <template slot-scope="scope">
              <p v-show="!scope.row['edit']">
                {{scope.row.labelName}}
              </p>
              <el-input v-show="scope.row['edit']" size="small" v-model="scope.row.labelName"/>
            </template>
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
          console.log(newValue)
        this.$emit("input", newValue);
      }
    }
  },
  data() {
    return {
      listLoading:false,
      tableData: [
        {
          labelName: "1",
          operation: "王小虎",
        },
         {
          labelName: "1",
          operation: "王小虎",
        },
      ]
    };
  },
  methods: {
    songDialogSure(){},
    dialogFormVisible() {
      this.$emit("changeLabelManageState", false);
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
      
    },

    /**
     * 保存表格数据
     */
    saveTable(index){

      this.cancleEditTable(index);//停止编辑
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
</style>

