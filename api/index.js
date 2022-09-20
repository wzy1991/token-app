import request from "@/utils/request";


/**
 * withdrawAddress
 * totalAmount
 * @param data object提现
 */
export function applyWalletWithdraw(data) {
	return request.post("/app/withdraw/applyWalletWithdraw", data, {
		login: true
	});
}

/**
 * 用户手机号登录
 * @param data object 用户手机号 也只能
 */
export function loginMobile(data) {
	return request.post("/login/mobile", data, {
		login: false
	});
}
