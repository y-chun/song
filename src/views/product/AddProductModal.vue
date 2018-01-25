<template>
	<div >
		<el-dialog :title="title" :visible.sync="show" @close="dialogFormVisible" width="40%" @open="getProductFormFun">
			<div v-loading="modalLoading" class="modal-ctx" >
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="产品名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="策划人" prop="planner">
						<el-input v-model="ruleForm.planner"></el-input>
				</el-form-item>
				<el-form-item label="归属专辑" prop="album">
					<el-select v-model="ruleForm.album" filterable placeholder="请选择" size="large">
						<el-option v-for="item in albumList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上传音频文件" prop="upload_url">
                  <el-upload class="upload-demo" :action="`${baseAPI}/Song/uploadAudio`" :file-list="fileList" :on-success="uploadSuccess" accept="audio/mp3">
                      <el-input v-model="ruleForm.upload_url" style="display:none;"/>
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">支持扩展名:mp3</div>
                       <!-- <div slot="tip" class="el-upload__tip" style="overflow:hidden"><p style="display:block;float:left;width:60px">上传路径：</p>
                         <a :href="ruleForm.upload_url" target="_Blank" style="display:block;float:left;width:70%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; ">{{ruleForm.upload_url}}</a>
                      </div> -->
                  </el-upload>
              </el-form-item>
				<el-form-item label="引用歌曲" prop="quote">
					<el-select v-model="ruleForm.quote" filterable placeholder="请选择">
						<el-option v-for="item in songList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注" prop="note">
					<el-input v-model="ruleForm.note" type="textarea" :rows="3"></el-input>
				</el-form-item>
			</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible">取 消</el-button>
				<el-button type="primary" :loading="loading" @click="DialogSure">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import {AddProduct,getProductForm,editProduct} from '@/api/song/product';
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
			albumList:{
				type:Array,
				default:[]
			},
			songList:{
				type:Array,
				default:[]
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
				loading:false,
				value9: [],
				fileList: [],
				ruleForm: {
					name: '',
					album:[],
					planner:'',
					quote:'',
					upload_url:'',
					note:''
				},
				title:'',
				baseAPI:'',
				rules: {
					name: [{
						required: true,
						message: '请输入歌曲名称',
						trigger: 'blur'
					}],
					quote: [{
						required: true,
						message: '请选择歌曲',
						trigger: 'blur'
					}],
					album: [{
						required: true,
						message: '请选择专辑',
						trigger: 'blur'
					}],
					planner: [{
						required: true,
						message: '请输入策划人',
						trigger: 'blur'
					}],
					upload_url:[{
						required: true,
						message: '文件未上传',
					}]
				},
			};
		},
		methods: {
			uploadSuccess(res,file){
				this.fileList = [file];
				this.ruleForm.upload_url = res.data.audio_url;		
			},
			/**
			 * 加载编辑时表单默认数据
			 */
			getProductFormFun(){
				this.baseAPI = process.env.BASE_API;
				if(this.type==='edit'){
					this.modalLoading = true;
					this.title='编辑产品';
					getProductForm({id:this.id}).then(res=>{
						this.ruleForm = res.data.form;
						this.modalLoading = false;
						}).catch(res=>{
							this.modalLoading = false;	
						})
				}else if(this.type==='add'){
					this.title='新增产品';
				}
				
			},

			// handleRemove(file, fileList) {
			// 	console.log(file, fileList);
			// },
			// handlePreview(file) {
			// 	console.log(file);
			// },
			// handleExceed(files, fileList) {

			// },
			// beforeRemove(file, fileList) {
			// 	return this.$confirm(`确定移除 ${file.name}？`);
			// },

			/**
			 * 提交表单
			 */
			DialogSure() {
				this.$refs.ruleForm.validate(valid=>{
					if(valid){
						this.loading = true;
						if(this.type==='edit'){
							editProduct({id:this.id,...this.ruleForm}).then(res=>{
								this.loading = false;
								messageInfo.bind(this)('更新成功','success')
								this.dialogFormVisible(true);
							}).catch(res=>{
								this.loading = false;
								messageInfo.bind(this)('更新失败','error')
							})
						}else if (this.type ==='add'){
							AddProduct({id:this.id,...this.ruleForm}).then(res=>{
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
			 * 关闭弹出并清空表单
			 */
			dialogFormVisible(load) {
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

