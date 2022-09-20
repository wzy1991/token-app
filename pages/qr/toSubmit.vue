<template>
	<view class="cxt">
		<u-form :model="addForm" ref="uForm"  label-width="200rpx">
			<u-card :border="false" :foot-border-top="false" sub-title="基本信息">
				<view class="" slot="body">
					
					<u-form-item label="银行名称" prop="bank_name_display" :required="true">
						<u-input v-model="addForm.bank_name_display" type="select" @click="bank_name_Show = !bank_name_Show" />
						<u-select value-name='val' label-name="name" v-model="bank_name_Show" :list="bank_name_List" @confirm="bank_name_SheetCallback"></u-select>
					</u-form-item>
					<u-form-item label="支行信息" prop="bank_branch"><u-input v-model="addForm.bank_branch" maxlength="20" /></u-form-item>
					<u-form-item label="持有人姓名" prop="acc_name" :required="true"><u-input v-model="addForm.acc_name" maxlength="20" /></u-form-item>
					<u-form-item label="银行账号" prop="acc_no" :required="true"><u-input v-model="addForm.acc_no" maxlength="20" /></u-form-item>
				</view>
				<view slot="foot">
					<view></view>
					<view><u-button type="primary" @click="submit">添加</u-button></view>
				</view>
			</u-card>
		</u-form>
	</view>
</template>

<script>
	// import { bankSave } from '@/api/bankcard.js';
import { mapState, mapActions } from 'vuex';
// import { getDictName } from '@/api/common.js';
export default {
	data() {
		return {
			list: [],
			addForm: {
				cus_id: '',
			
				bank_name: '',
				bank_branch: '',
				bank_name_display: '',
				acc_name:'',
				acc_no:''
			},
			bank_name_Show: false,
			bank_name_List: [],

			rules: {
				
				bank_name_display: [
					{
						required: true,
						message: '请选择银行名称',
						trigger: ['blur', 'change']
					}
				],
				acc_name: [
					{
						required: true,
						message: '请填写持有人姓名',
						trigger: 'blur'
					}
				],
				acc_no: [
					{
						required: true,
						message: '请填写银行账号',
						trigger: 'blur'
					}
				]
			}
		};
	},
	

	
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		bank_name_SheetCallback(e) {
			this.addForm.bank_name = e[0].value;
			this.addForm.bank_name_display = e[0].label;
		},
	

		 submit() {
			this.$refs.uForm.validate(async valid => {
				if (valid) {
					console.log(this.addForm);
					var res = await bankSave({bankInfo:JSON.stringify(this.addForm)});					
					let url = '/pages/prompt/prompt';
					let param = {
						buttonInfo: '返回银行卡列表',
						buttonUrl: '/pages/bankcard/list',
						info: '添加成功'
					};
					this.$api.navTo.togo(url, param);
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.cxt {
	width: 100%;
	// height: 100%;
	position: absolute;

}

.foot-def {
	// padding: 24rpx;
	display: flex;
	justify-content: space-between;
}
.Fourth {
	display: flex;
	align-items: center;
	flex-direction: row;
}
</style>
