<template>
	<view style="height: 100%;width: 100%;background-color: #FFFFFF;">
		<view class="t-login">
			
			<form @submit.prevent="submit" class="cl">
				<view class="t-a">
					<image src="@/static/login/sj.png" mode="aspectFit"></image>
					<input type="text" placeholder="订单号" v-model="payOrderId" required />
				</view>
				<view class="t-a">
					<image src="@/static/login/sj.png" mode="aspectFit"></image>
					<input type="text" placeholder="email" v-model="email" required />
					<button class="logon" @click="sendEmailCode">获取验证码</button>
				</view>
				<view class="t-a">
					<image src="@/static/login/sj.png" mode="aspectFit"></image>
					<input type="text" placeholder="vercode" v-model="vercode" required />
				</view>
				<button class="logon" @click="submit">提交支付信息</button>
			</form>
		</view>
		
	</view>
</template>
<script>
import attrs, { required } from '@/utils/validate';
import { validatorDefaultCatch } from '@/utils/dialog';
import { useAttrs } from "vue";
import dayjs from 'dayjs';
import { Base64 } from 'js-base64';

export default {
	data() {
		return {
			vercode: '',
			email: 'wuhb@yufu99.com',
			payOrderId: this.$route.params.pa.payOrderId,
			payMode: this.$route.params.pa.payMode,
			merNo: this.$route.params.pa.merNo,
			merOrderNo: this.$route.params.pa.merOrderNo,
			txnTitle: this.$route.params.pa.txnTitle,
			txnDetail: this.$route.params.pa.txnDetail,
			amount: this.$route.params.pa.payTokenAmount,
			custAddr: '0xb15ee264b589177a3630721e81fe01d22c484ada'
		};
	} ,
	methods: {
		async sendEmailCode(){
			const { email,payOrderId} = this;
			try {
				await this.$validator({
					email: [required(required.message('email')), attrs.range([5, 64], attrs.range.message('email'))],
				}).validate({
					email
				});
			} catch (e) {
				return validatorDefaultCatch(e);
			}
			uni.request({
				//发送邮件
				url:'http://192.168.100.59:9005/pay/sendVerCode',
				method:'POST',
				header:{
					"content-type":"application/x-www-form-urlencoded"
				},
				data:{
					email: email,
					payOrderId:payOrderId
				},
				success:(res)=>{
					console.log(res.data);
					
				},
				fail:(res)=>{
					console.log("登录失败");
				}
			});
		},
		async submit() {
			const { custAddr,payMode,merNo,merOrderNo,txnTitle,txnDetail,amount,payOrderId,vercode,email} = this;
			console.log('submit');
			let msg = custAddr+payMode+merNo+merOrderNo+Base64.encode(txnTitle) +Base64.encode(txnDetail) +amount;
			uni.request({
				url:'http://192.168.100.59:9005/pay/centconfirm',
				method:'POST',
				header:{
					"content-type":"application/x-www-form-urlencoded"
				},
				data:{
					email: email,
					payOrderId:payOrderId,
					vercode:vercode,
					signMsg: msg
				},
				success:(res)=>{
					console.log(res.data);
					this.$router.replace({
						path: '/pages/home/index'
					});
				},
				fail:(res)=>{
					console.log("登录失败");
				}
			});
			
		}
	} 
};
</script>
<style lang="less" scoped>
.tip {
	font-size: 24rpx;
	margin: 40rpx auto;
	text-align: center;
}
.desc {
	font-size: 24rpx;
	margin: 20rpx 0;
}
.clickClass {
	color: #2f72ff;
}
.passwordClass {
	width: 100%;
}
.password {
	font-size: 24rpx;
	text-align: right;
	padding: 0rpx 0;
}
.t-login {
	width: 600rpx;
	margin: 0 auto;
	font-size: 28rpx;
	color: #000;
}

.t-login button {
	font-size: 28rpx;
	background: #2f72ff;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
}

.t-login input {
	padding: 0 20rpx 0 120rpx;
	height: 90rpx;
	line-height: 90rpx;
	margin-bottom: 50rpx;
	background: #f4f4f4;
	font-size: 28rpx;
	border-radius: 50rpx;
}

.t-login .t-a {
	position: relative;
}

.t-login .t-a image {
	width: 52rpx;
	height: 32rpx;
	position: absolute;
	left: 40rpx;
	top: 28rpx;
	border-right: 2rpx solid #dedede;
	padding-right: 20rpx;
}

.t-login .t-b {
	text-align: center;
	font-size: 46rpx;
	color: #000;
	padding: 100rpx 0;
}

.t-login .t-c {
	position: absolute;
	right: 22rpx;
	top: 22rpx;
	background: #2f72ff;
	color: #fff;
	font-size: 24rpx;
	border-radius: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 25rpx;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 50rpx 0;
	font-size: 24rpx;
}

.t-login .t-e {
	text-align: center;
	width: 250rpx;
	margin: 80rpx auto 0;
}

.t-login .t-g {
	float: left;
	width: 50%;
}

.t-login .t-e image {
	width: 50rpx;
	height: 50rpx;
}

.t-login .t-f {
	text-align: center;
	margin: 80rpx 0 0 0;
	color: #666;
}

.t-login .t-f text {
	margin-left: 8rpx;
	color: #999;
}

.t-login .uni-input-placeholder {
	color: #000;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}
/*拼团玩法介绍 modal*/
.tui-modal__title {
	
	text-align: center;
	font-weight: bold;
	padding-bottom: 8rpx;
}
.tui-modal__p {
	font-size: 26rpx;
	color: #888;
	padding: 20rpx 10rpx 0 10rpx;
}
.tui-modal__btn {
	width: 100%;
	padding: 60rpx 0 20rpx;
	display: flex;
	justify-content: center;
}

</style>
