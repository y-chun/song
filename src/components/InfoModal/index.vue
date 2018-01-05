<template>
<div class="modal">
    <el-dialog :title="title" :visible.sync="show" @close="dialogFormVisible">
        <slot></slot>
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
    title:{
        type:String,
        default:"信息窗口"
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
      ]
    };
  },
  methods: {
    songDialogSure(){},
    dialogFormVisible() {
      this.$emit("changeInfoState", false);
    }
  }
};
</script>

<style scoped>

</style>

