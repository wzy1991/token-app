<template>
	<view style="height: 100%;width: 100%;background-color: #FFFFFF;">
	<view class="t-login">
		<view class="t-b">找回密码</view>
		<view class="cl">
			<view class="t-a">
				<image src="@/static/login/sj.png"></image>
				<input name="account" type="text" placeholder="输入手机号码" v-model="account" />
			</view>
			<view class="t-a">
				<image src="@/static/login/yz.png" ></image>
				<input name="verifyCode" type="text" placeholder="填写验证码" class="codeIput" v-model="captcha" />
				<button class="t-c"  :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="code">{{ text }}</button>
			</view>
			<view class="t-a">
				<image src="@/static/login/mima.png" ></image>
				<input name="password" type="password" placeholder="填写新密码" v-model="password" /></view>
			<view class="t-a">
				<image src="@/static/login/mima.png" ></image>
				<input name="rpassword" type="password" placeholder="确认新密码" v-model="rpassword" /></view>
		</view>
		<button class="logon" @click="update">确定</button>
	</view>
	</view>
</template>
<script>
import sendVerifyCode from '@/mixins/SendVerifyCode';
import { login, loginMobile, registerVerify, update } from '@/api/user';
import attrs, { required, alpha_num, chs_phone } from '@/utils/validate';
import { validatorDefaultCatch } from '@/utils/dialog';
import dayjs from 'dayjs';
import cookie from '@/utils/store/cookie';

const BACK_URL = 'login_back_url';

export default {
	name: 'Login',
	mixins: [sendVerifyCode],
	data: function() {
		return {
			navList: ['账号登录'],
			current: 0,
			account: '',
			password: '',
			rpassword: '',
			captcha: '',
			inviteCode: '',
			formItem: 1,
			timestamp: 60,
			check: '1'
		};
	},
	methods: {
		async loginMobile() {
			console.log(loginMobile);
			var that = this;
			const { account, captcha } = that;
			try {
				await that
					.$validator({
						account: [required(required.message('手机号码')), chs_phone(chs_phone.message())],
						captcha: [required(required.message('验证码')), alpha_num(alpha_num.message('验证码'))]
					})
					.validate({
						account,
						captcha
					});
			} catch (e) {
				return validatorDefaultCatch(e);
			}
			loginMobile({
				phone: that.account,
				captcha: that.captcha,
				spread: cookie.get('spread')
			})
				.then(res => {
					var data = res.data;
					that.$store.commit('login', data.token, dayjs(data.expires_time));
					
				})
				.catch(err => {
					uni.showToast({
						title: err.msg || err.response.data.msg || err.response.data.message,
						icon: 'none',
						duration: 2000
					});
				});
		},
		async update() {
			if (this.password !== this.rpassword) {
				uni.showToast({
					title: '两次密码输入不一致！',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			var that = this;
			const { account, captcha, password } = that;
			try {
				await that
					.$validator({
						account: [required(required.message('手机号码')), chs_phone(chs_phone.message())],
						captcha: [required(required.message('验证码')), alpha_num(alpha_num.message('验证码'))],
						password: [required(required.message('密码')), attrs.range([6, 16], attrs.range.message('密码')), alpha_num(alpha_num.message('密码'))]
					})
					.validate({
						account,
						captcha,
						password
					});
			} catch (e) {
				return validatorDefaultCatch(e);
			}
			update({
				account: that.account,
				captcha: that.captcha,
				password: that.password,
				inviteCode: that.inviteCode,
				spread: cookie.get('spread')
			})
				.then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'success',
						duration: 2000
					});
					uni.navigateBack({
						delta: 1
					});
				})
				.catch(err => {
					uni.showToast({
						title: err.msg || err.response.data.msg || err.response.data.message,
						icon: 'none',
						duration: 2000
					});
				});
		},
		async code() {
			var that = this;
			const { account } = that;
			try {
				await that
					.$validator({
						account: [required(required.message('手机号码')), chs_phone(chs_phone.message())]
					})
					.validate({
						account
					});
			} catch (e) {
				return validatorDefaultCatch(e);
			}

			await registerVerify({
				phone: that.account,
				type: 'update'
			})
				.then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'success',
						duration: 2000
					});
					that.sendCode();
				})
				.catch(err => {
					uni.showToast({
						title: err.msg || err.response.data.msg || err.response.data.message,
						icon: 'none',
						duration: 2000
					});
				});
		}
	}
};
</script>
<style lang="less" scoped>

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
	margin: 80rpx 0;
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
</style>
