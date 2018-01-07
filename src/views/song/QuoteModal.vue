<template>
	<div class="modal">
		<el-dialog title="引用曲子" :visible.sync="show" @close="dialogFormVisible" width="40%" v-loading="true">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="产品名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="策划人" prop="planner">
					<el-input v-model="ruleForm.planner"></el-input>
				</el-form-item>
				<el-form-item label="归属专辑" prop="album">
					<el-input v-model="ruleForm.album"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="note">
					<el-input v-model="ruleForm.note" type="textarea" :rows="3"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible">取 消</el-button>
				<el-button type="primary" @click="DialogSure" :loading = "loading">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import {quoteSong} from '@/api/song/song';
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
				loading:false,
				value9: [],
				fileList: [],
				ruleForm: {
					name: ""
				},
				rules: {
					name: [{
						required: true,
						message: "请输入曲子名称",
						trigger: "blur"
					}],
					planner: [{
						required: true,
						message: "请输入策划人",
						trigger: "blur"
					}],
					album: [{
						required: true,
						message: "请输入专辑名",
						trigger: "blur"
					}]
				},
				options: [{
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
			DialogSure() {
				this.loading = true;
				quoteSong().then(res=>{
					this.loading = false;
					this.dialogFormVisible();
				}).catch(res=>{
					this.loading = false;
				})
			},
			dialogFormVisible() {
				this.$emit("changeQuoteModalState", false);
			}
		}
	};
</script>

<style scoped>

</style>

