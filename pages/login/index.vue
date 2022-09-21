<template>
	<view style="height: 100%;width: 100%;background-color: #FFFFFF;">
		<view class="t-login">
			<view v-if="formItem === 1">
				<view class="t-b" :class="current === index ? 'on' : ''" v-for="(item, index) in navList" @click="navTap(index)" :key="index">{{ item }}</view>

				<view :hidden="current !== 0">
					<form @submit.prevent="submit" class="cl">
						<view class="t-a">
							<image src="@/static/login/sj.png" mode="aspectFit"></image>
							<input type="text" placeholder="输入邮箱" v-model="account" required />
						</view>
						<view class="t-a">
							<image src="@/static/login/mima.png" mode="aspectFit"></image>
							<input type="password" placeholder="填写登录密码" v-model="password" required />
						</view>
						<view class="t-d">
							<!-- 登录即同意
							<text class="clickClass" @click="handleGoUser">《注册协议》</text>
							和
							<text class="clickClass" @click="handleGoPrivacy">《隐私政策》</text> -->
						</view>
						<button class="logon" @click="submit" :hidden="current === 1">登录</button>
					</form>
				</view>
			
			</view>
		</view>
		
	</view>
</template>
<script>
import { login, loginMobile} from '@/api/user';
import attrs, { required, alpha_num, email } from '@/utils/validate';
import { validatorDefaultCatch } from '@/utils/dialog';
import dayjs from 'dayjs';
import cookie from '@/utils/store/cookie';
import { useAttrs } from "vue";

// import { handleGetUserInfo } from '@/utils';

const BACK_URL = 'login_back_url';

export default {
	name: 'Login',
	data: function() {
		return {
			navList: ['账号登录'],
			current: 0,
			account: '',
			password: '',
			inviteCode: '',
			formItem: 1,
			type: 'login',
			check: '1',
			isChecked: false,
			modal:false
		};
	},
	onShow() {
	console.log(Boolean(uni.getStorageSync('number')));
		if(!uni.getStorageSync('number')){
			this.modal=true
		}
	},
	methods: {
		navTap: function(index) {
			this.current = index;
		},
		changeChecked(c) {
			console.log(c.detail.value);
			if (c.detail.value.length === 0) {
				this.isChecked = false;
			} else {
				this.isChecked = true;
			}
		},
		handleGoUser() {
			
		},
		async submit() {
			console.log('submit');
			const { account, password } = this;
			try {
				await this.$validator({
					account: [required(required.message('账号')), attrs.range([5, 32], attrs.range.message('账号')), email(email.message('账号'))],
					password: [required(required.message('密码')), attrs.range([1, 16], attrs.range.message('密码'))]
				}).validate({
					account,
					password
				});
			} catch (e) {
				return validatorDefaultCatch(e);
			}
			uni.request({
				// url:'http://192.168.100.45:9000/openplat/webapi/cent/login',
				// url:'http://127.0.0.1:8099/loan-test/app/login',
				 url:'http://127.0.0.1:8088/test/login',
				method:'POST',
				data:{
					email: account,
					password: password
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
