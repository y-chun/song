<template>
	<div class="modal">
		<el-dialog title="新增曲子" :visible.sync="show" @close="dialogFormVisible" width="40%">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="产品名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="归属专辑" prop="album">
					<el-select v-model="ruleForm.album" placeholder="请选择" size="large">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="引用曲子" prop="quote">
					<el-select v-model="ruleForm.quote" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注" prop="note">
					<el-input v-model="ruleForm.note" type="textarea" :rows="3"></el-input>
				</el-form-item>
			</el-form>
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
					this.$emit("input", newValue);
				}
			}
		},
		data() {
			return {
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
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
			songDialogSure() {},
			dialogFormVisible() {
				console.log(111);
				this.$emit("changeAddProductModalState", false);
			}
		}
	};
</script>

<style scoped>

</style>

