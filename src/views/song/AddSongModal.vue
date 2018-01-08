<template>
<div class="modal">
    <el-dialog title="新增曲子" :visible.sync="show" @close="dialogFormVisible" width="40%" @open="getSongFormFun">
        <div class="modal-ctx" v-loading="modalLoading">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="活动名称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="标签" prop="label">
                  <el-select multiple v-model="ruleForm.label_list">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="上传音频文件" prop="upload">
                  <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3" :on-exceed="handleExceed" :file-list="fileList">
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
            <el-button type="primary" @click="songDialogSure" :loading="loading">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {getSongForm,addSong,editSong} from '@/api/song/song';
export default {
  props: {
      value: {
    	type: Boolean,
    	default: false
    },
    type:{
      type:String,
      default:'add'
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
      modalLoading:false,
      loading:false,
      value9:[],
      fileList: [],
      ruleForm: {
        // name: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入曲子名称",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ]
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ]
    };
  },
  methods: {
    getSongFormFun(){
      if(this.type!=="add"){
        getSongForm().then(res=>{
          this.ruleForm = res.data.form;
          console.log(this.ruleForm)
        })
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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
    songDialogSure() {
      this.loading = true;
      if(this.type==='add'){
        addSong().then(res=>{
          this.loading = false;
          this.dialogFormVisible();
        }).catch(res=>{
          this.loading = false;
        })
      }else if(this.type==='edit'){
        editSong().then(res=>{
          this.loading = false;
          this.dialogFormVisible();
        }).catch(res=>{
          this.loading = false;
        })
      }
    },
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

