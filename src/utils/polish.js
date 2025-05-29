// 路由跳转
export const routeTo = (url = '', type = 'nT', delta = 1) => {
	if(!url)return uni.navigateBack({ delta });
	switch(type){
		case 'nT': uni.navigateTo({ url, fail: _=> uni.switchTab({ url }) });
		break 
		case 'rT': uni.redirectTo({ url, fail: _=> uni.switchTab({ url }) });
		break 
		case 'rL': uni.reLaunch({ url, fail: _=> uni.switchTab({ url }) });
		break 
		case 'sT': uni.switchTab({ url, fail: _=> uni.navigateTo({ url }) });
        break 
        case 'nB': uni.navigateBack({ delta });
        break
		default: uni.navigateBack({ delta: 1 });
		break
	}
}

export const showModal = ({
	title = '提示',
	content = '',
	showCancel = false,
	cancelText = '取消',
	confirmText = '确定',
	confirmColor = '#10367A',
	success,
	fail,
	complete
}) => {
	uni.showModal({
		title,
		content,
		showCancel,
		cancelText,
		confirmColor,
		confirmText,
		success,
		fail,
		complete
	})
}

export function showNone(txt, duration=1500){
	uni.showToast({
		mask: true,
		title: txt,
		icon: 'none',
		duration,
	})
}

export function debounce(func, wait, immediate) {
	let timeout, args, context, timestamp, result;
	const later = function() {
		// 据上一次触发时间间隔
		const last = +new Date() - timestamp;
		// 上次被包装函数被调用时间间隔last小于设定时间间隔wait
		if (last < wait && last > 0) {
			timeout = setTimeout(later, wait - last);
		} else {
			timeout = null;
			// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
			if (!immediate) {
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			}
		}
	}
	return function(...args) {
		context = this;
		timestamp = +new Date();
		const callNow = immediate && !timeout;
		// 如果延时不存在，重新设定延时
		if (!timeout) timeout = setTimeout(later, wait);
		if (callNow) {
			result = func.apply(context, args);
			context = args = null;
		}
		return result;
	}
}

export function jsonStr(data){
	return encodeURIComponent(JSON.stringify(data))
}

export function jsonPar(json){
	return JSON.parse(decodeURIComponent(decodeURIComponent(json)))
}


export default {
    routeTo,
	showModal,
	showNone,
	debounce,
	jsonStr,
	jsonPar
}