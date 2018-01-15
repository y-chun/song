<template>
<div class="modal">
    <el-dialog :title="title" :visible.sync="show" @close="dialogFormVisible" width="40%" @open="getSongFormFun">
        <div class="modal-ctx" v-loading="modalLoading">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="曲子名称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="标签" prop="label_list">
                  <el-select multiple v-model="ruleForm.label_list" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="selectLoading">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="上传音频文件" prop="upload_url">
                  <el-upload class="upload-demo" :action="`${baseAPI}/Song/uploadAudio`" :file-list="fileList" :on-success="uploadSuccess" accept="audio/mp3">
                      <el-input v-model="ruleForm.upload_url" style="display:none;"/>
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">支持扩展名:mp3</div>
                       <div slot="tip" class="el-upload__tip" style="overflow:hidden"><p style="display:block;float:left;width:60px">上传路径：</p>
                         <a :href="ruleForm.upload_url" target="_Blank" style="display:block;float:left;width:70%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; ">{{ruleForm.upload_url}}</a>
                           
                         </div>
                  </el-upload>
              </el-form-item>
             
              <el-form-item label="备注" prop="note">
                  <el-input v-model="ruleForm.note" type="textarea" :rows="3"></el-input>
              </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible">取 消</el-button>
            <el-button type="primary" @click="songDialogSure" :loading = "loading">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {getSongForm,searchSongSelectList,addSong,editSong} from '@/api/song/song';
import {messageInfo} from "@/utils/common"
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
      loading:false,
      modalLoading:false,
      selectLoading:false,
      fileList: [],
      ruleForm: {
        name:'',
        label_list:[],
        upload_url:'',
        note:''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入曲子名称',
            trigger: 'blur'
          }],
          label_list: [{
						required: true,
						message: '请选择标签',
						trigger: 'blur'
          }],
          upload_url:[{
            required: true,
            message: '文件未上传',
          }]
        
      },
      options: [],
      labelList:[],
      title:'',
      baseAPI:""
    };
  },
  methods: {
    /**
     * 音频文件上传成功处理函数
     */
    uploadSuccess(res,file){
      console.log(res,file)
      this.fileList = [file];
      this.ruleForm.upload_url = res.data.audio_url;
    },
    /**
     * 获取表单默认数据与标签列表
     */
    getSongFormFun(){
      this.baseAPI = process.env.BASE_API;
      if(this.type==='edit'){
        this.title='编辑曲子';
        this.modalLoading = true
        getSongForm({id:this.id}).then(res=>{  
          this.ruleForm = res.data.form;
          this.modalLoading = false;
        }).catch(res=>{
          this.modalLoading = false;
        })
      }else if(this.type==='add'){
        this.title='新增曲子';
      }
      searchSongSelectList().then(res=>{
        this.labelList = [...res.data]
        this.options = [...res.data]
        }).catch(res=>{
        messageInfo.bind(this)('标签列表请求失败','error')
      })
    },
    
    /**
     * 表单列表选择函数
     */
    remoteMethod(query){ 
      // if(this.labelList.length==0)
      if (query !== '') {
          this.selectLoading = true;
          setTimeout(() => {
            this.selectLoading = false;
            this.options = this.labelList.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [...this.labelList];
        }
        // 
    },

    
    handleSuccess(res){
      this.ruleForm.upload_url = res.data.audio_url;
    },

    /**
     * 提交表单数据
     */
    songDialogSure() {
      this.$refs.ruleForm.validate(valid=>{
        if(valid){
          this.loading = true;
          if(this.type==='edit'){
            editSong({id:this.id,...this.ruleForm}).then(res=>{
              this.loading = false;
              messageInfo.bind(this)('更新成功','success');
              this.dialogFormVisible(true);
            }).catch(res=>{
              console.log(111)
                this.loading = false;
                messageInfo.bind(this)('更新失败','error');
              })
          }else if(this.type ==='add'){
            addSong({...this.ruleForm}).then(res=>{
              this.loading = false;
              this.dialogFormVisible(true);
              messageInfo.bind(this)('添加成功','success')
            }).catch(res=>{
              this.loading = false;
              messageInfo.bind(this)('添加失败','error')
              })
          }
        }
      })
      
    },

    /**
     * 关闭弹窗并清除表单数据
     */
    dialogFormVisible(load) {
      console.log(111);
      this.fileList=[]
      this.$refs['ruleForm'].resetFields();
      if(load){
        this.$emit('changeModalState', false,true);
      }else{
        this.$emit('changeModalState', false);
      }
      
    }
  }
};
</script>

<style scoped>

</style>

