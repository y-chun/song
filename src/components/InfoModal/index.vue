<template>
  <div>
      <el-dialog :title="title" :visible.sync="show" @close="dialogFormVisible">
          <div class="modal-ctx" v-loading="modalLoading">
            <slot></slot>
          </div>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible">取 消</el-button>
              <!-- <el-button type="primary" @click="songDialogSure">确 定</el-button> -->
          </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
  // name:'InfoModal',
  props: {
      value: {
    	type: Boolean,
    	default: false
    },
    title:{
        type:String,
        default:'信息窗口'
    },
    modalLoading:{
        type:Boolean,
        default:false
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
      listLoading:false,
    };
  },
  methods: {
    songDialogSure(){},
    dialogFormVisible() {
      this.$emit('changeModalState', false);
    }
  }
};
</script>

<style scoped>

</style>

