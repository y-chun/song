<template>
	<div >
		<el-dialog :title="title" :visible.sync="show" @close="dialogFormVisible" width="40%" @open="getProductFormFun">
			<div v-loading="modalLoading" class="modal-ctx" >
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="产品名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="归属专辑" prop="album">
					<el-select v-model="ruleForm.album" placeholder="请选择" size="large">
						<el-option v-for="item in albumList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="引用曲子" prop="quote">
					<el-select v-model="ruleForm.quote" placeholder="请选择">
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
					this.$emit("input", newValue);
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
					name: "",
					album:[],
					quote:"",
					note:""
				},
				rules: {
					name: [{
						required: true,
						message: "请输入曲子名称",
						trigger: "blur"
					}],
					quote: [{
						required: true,
						message: "请选择曲子",
						trigger: "blur"
					}],
					album: [{
						required: true,
						message: "请选择专辑",
						trigger: "blur"
					}]
				},
				title:""
			};
		},
		methods: {
			/**
			 * 获取表单默认值
			 */
			getProductFormFun(){
				if(this.type==='edit'){
					this.title = "编辑产品";
					this.modalLoading = true;
					getProductForm({id:this.id}).then(res=>{
						this.ruleForm = res.data.form;
						this.modalLoading = false;
						}).catch(res=>{
							this.modalLoading = false;	
						})
				}else if(this.type==='add'){
					this.title = "新增产品";
				}
				
			},

			/**
			 * 保存表单数据
			 */
			DialogSure() {
				this.$refs['ruleForm'].validate(valid=>{
					if(valid){
						this.loading = true;
						if(this.type==='edit'){
							editProduct({id:this.id,...this.ruleForm}).then(res=>{
								this.loading = false;
								messageInfo.bind(this)('更新成功','success')
								this.dialogFormVisible();
							}).catch(res=>{
								this.loading = false;
								messageInfo.bind(this)('更新失败','error')
							})
						}else if (this.type ==='add'){
							AddProduct({...this.ruleForm}).then(res=>{
								this.loading = false;
								this.dialogFormVisible();
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
			dialogFormVisible() {
				this.$refs['ruleForm'].resetFields();
				this.$emit("changeModalState", false);
			}
		}
	};
</script>

<style scoped>

</style>

