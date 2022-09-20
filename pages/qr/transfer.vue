<template>
	<view class="recharge-wrap">
		<view class="card">
			<u-form :model="model" :rules="rules" ref="uForm" >
				<view class="name">
				QrData
				</view>
				<u-form-item label-width="120" prop="account">
					<u-input :border="false" placeholder="请输入QrData" v-model="model.qrData" type="text"></u-input>
				</u-form-item>
			</u-form>
			<u-button @click="handleSubmit" type="primary"  :loading="buttonLoading" :disabled="buttonLoading">提交</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			model: {
				qrData: ''
			},
			buttonLoading:false,
			rules: {
				qrData: [
					{
						required: true,
						message: '请输入QRData',
						trigger: 'blur'
					}
					// {
					// 	min: 3,
					// 	max: 5,
					// 	message: '姓名长度在3到5个字符',
					// 	trigger: ['change', 'blur']
					// }
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: ['change', 'blur']
					}
					// {
					// 	// 正则不能含有两边的引号
					// 	pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
					// 	message: '需同时含有字母和数字，长度在6-12之间',
					// 	trigger: ['change', 'blur']
					// }
				],
				amount: [
					{
						required: true,
						message: '请输入金额',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					},
					{
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// this.$u.test.mobile()就是返回true或者false的
				
							return this.$u.test.amount(value);
						},
						message: '输入金额不正确',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur']
					}
				]
			}
		};
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		scanCode(){
			uni.scanCode({
			    success: function (res) {
			        console.log('条码类型：' + res.scanType);
			        console.log('条码内容：' + res.result);
			    }
			});
		},
		handleSubmit() {
			this.$refs.uForm.validate(async valid => {
				console.log(valid);
				if (valid) {
					this.$refs.uToast.show({
						title: '登录成功',
						type: 'success',
						isTab: true,
						url: '/pages/index/index',
						position: 'top',
						duration: 500,
						callback: () => {
							this.buttonLoading = false;
						}
					});
				} else {
					console.log('验证失败');
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.recharge-wrap {
	display: flex;
	justify-content: center;
	margin-top: 100rpx;
	.card {
		width: 98%;
		height: 600rpx;
		background-color: $uni-bg-color-white;
		border-radius: 18rpx;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		padding: 30rpx 40rpx;
		.name{
			margin-top: 10rpx;
		}
	}
}
</style>
