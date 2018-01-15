<template>
	<div class="modal">
		<el-dialog title="引用曲子" :visible.sync="show" @close="dialogFormVisible" width="40%" v-loading="true" @open="getQuoteContentFun">
			<div class="modal-ctx" v-loading="modalLoading">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="产品名称" prop="name" >
						<el-input v-model="ruleForm.name"></el-input>
					</el-form-item>
					<el-form-item label="策划人" prop="planner">
						<el-input v-model="ruleForm.planner"></el-input>
					</el-form-item>
					<el-form-item label="归属专辑" prop="album">
						<el-select v-model="ruleForm.album" filterable  placeholder="请选择" size="large">
							<el-option v-for="item in albumList" :key="item.value" :label="item.label" :value="item.value">
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
				<el-button type="primary" @click="DialogSure" :loading = "loading">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import {putQuoteSong,getQuoteContent} from '@/api/song/song';
	export default {
		props: {
			value: {
				type: Boolean,
				default: false
			},
			 albumList:{
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
					planner:'',
					album:'',
					note:''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入曲子名称',
						trigger: 'blur'
					}],
					planner: [{
						required: true,
						message: '请输入策划人',
						trigger: 'blur'
					}],
					album: [{
						required: true,
						message: '请输入专辑名',
						trigger: 'blur'
					}]
				},
			};
		},
		methods: {

			/**
			 * 获取标签管理列表
			 */
			getQuoteContentFun(){
				this.modalLoading = true;
				getQuoteContent({id:this.id}).then(res=>{
					this.modalLoading = false;
					this.ruleForm = res.data.quote_form;
				}).catch(res=>{
					this.modalLoading = false;
				})
			},

			/**
			 * 提交表单
			 */
			DialogSure() {
				this.loading = true;
				this.$refs.ruleForm.validate(valid=>{
					if(valid){
						putQuoteSong({id:this.id,...this.ruleForm}).then(res=>{
							this.loading = false;
							this.dialogFormVisible();
						}).catch(res=>{
							this.loading = false;
						})
					}
				})
				
			},

			/**
			 * 关闭弹窗，并清空表单
			 */
			dialogFormVisible() {
				this.$refs['ruleForm'].resetFields();
				this.$emit('changeModalState', false);
			}
		}
	};
</script>

<style scoped>

</style>

