<template>
<div class="modal">
    <el-dialog title="新增曲子" :visible.sync="show" @close="dialogFormVisible" width="40%" @open="getSongFormFun">
        <div class="modal-ctx" v-loading="modalLoading">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="活动名称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="标签" prop="label_list">
                  <el-select multiple v-model="ruleForm.label_list" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="selectLoading">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="上传音频文件" prop="upload">
                  <el-upload class="upload-demo" action=" https://easy-mock.com/mock/5a4f3088d344f80dfbed7c01/song/song/uploadAudio" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3" :on-exceed="handleExceed" :file-list="fileList" >
                      <el-input v-model="ruleForm.upload" style="display:none;"/>
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">支持扩展名:mp3</div>
                  </el-upload>
              </el-form-item>
              <el-form-item label="备注" prop="note">
                  <el-input v-model="ruleForm.note" type="textarea" :rows="3"></el-input>
              </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible">取 消</el-button>
            <el-button type="primary" @click="songDialogSure">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {getSongForm,searchSongSelectList} from '@/api/song/song';
export default {
  props: {
      value: {
    	type: Boolean,
    	default: false
    },
    type:{
      type:String,
      default:'add'
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
      selectLoading:false,
      value9:[],
      fileList: [],
      ruleForm: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入曲子名称",
            trigger: "blur"
          }],
          label_list: [{
						required: true,
						message: "请选择标签",
						trigger: "blur"
          }],
          upload:[{
            required: true,
          }]
        
      },
      options: []
    };
  },
  methods: {
    getSongFormFun(){
      // console.log(11)
      console.log(this.type)
      
      if(this.type==="edit"){
        this.modalLoading = true
        getSongForm().then(res=>{  
          this.ruleForm = res.data.form;
          this.modalLoading = false;
        }).catch(res=>{
          this.modalLoading = false;
        })
      }
    },

    remoteMethod(query){
      console.log(1)
      searchSongSelectList().then(res=>{
        console.log(res)
        this.options = [...res.data]
      }).catch(res=>{
        console.log(res)
      })
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    cancelDialog(){
      // this.ruleForm = {};
      
      // this.dialogFormVisible();
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
          fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    songDialogSure() {},
    dialogFormVisible() {
      console.log(111);
      this.$refs['ruleForm'].resetFields();
      this.$emit("changeModalState", false);
    }
  }
};
</script>

<style scoped>

</style>

