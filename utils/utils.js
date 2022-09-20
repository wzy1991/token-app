
import {getUserInfo} from "@/api/user";
import store from "@/store/index.js";
export const imgUploadUrl = 'https://up-z2.qiniup.com'

export function getCurrentDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return year + "-" + formatZero(month) + "-" + formatZero(day);
}
//格式化日期时间
 function formatZero(n){
     if(n>=0&&n<=9){
         return "0"+n;
     }else{
         return n;
     }
 }
export function parseTime(time, cFormat) {
	if (arguments.length === 0) {
		return null
	}
	if (time === undefined || time === '' || time === null) {
		return null
	}
	if (time === '无') {
		return '无'
	}
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
		const value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		return value.toString().padStart(2, '0')
	})
	return time_str
}

export function chooseImage(callback) {
	uni.chooseImage({
		count: 1,
		sourceType: ["album"],
		success: res => {
			uni.getImageInfo({
				src: res.tempFilePaths[0],
				success: image => {
					console.log(image);
					uni.showLoading({
						title: "图片上传中",
						mask: true
					});
					uni.uploadFile({
						url: `${VUE_APP_API_URL}/api/upload`,
						file: image,
						filePath: image.path,
						header: {
							Authorization: "Bearer " + store.getters.token
						},
						name: "file",
						success: res => {
							if (callback) {
								callback(JSON.parse(res.data).link)
							}
						},
						fail: err => {
							uni.showToast({
								title: "上传图片失败",
								icon: "none",
								duration: 2000
							});
						},
						complete: res => {
							uni.hideLoading()
						}
					});
				},
				fail: err => {
					uni.showToast({
						title: "获取图片信息失败",
						icon: "none",
						duration: 2000
					});
				}
			});
		}
	});
}

// 交易记录状态
const statusOptions = [{
	label: '已取消',
	key: '-1',
	status: 'danger'
}]

export const statusColor = statusOptions.reduce((acc, cur) => {
	acc[cur.key] = cur.status
	return acc
}, {})

export const handleGetUserInfo = () => {
	getUserInfo().then(res => {
		console.log('获取用户信息')
		store.dispatch('setUserInfo', res.data)
		
		uni.switchTab({
			url: '/pages/index/index',
		});

	})
}

export function trim(str) {
	return String.prototype.trim.call(str);
}
export function isType(arg, type) {
	return Object.prototype.toString.call(arg) === "[object " + type + "]";
}
