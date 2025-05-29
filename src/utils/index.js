/**
 * 深拷贝
 * @param {object} obj 要拷贝的对象
 * @returns {object} 返回拷贝后的对象
*/
export function deepClone(obj) {
    if (obj === null) return null;
    if (typeof obj !== 'object') return obj;
    let newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) { //不遍历其原型链上的属性
            let val = obj[key];
            newObj[key] = typeof val === 'object' ? deepClone(val) : val; 
        }
    }
    return newObj;
}



/**
 * 节流函数 （第一次和最后一次都会执行）
 * @param {function} func 回调函数
 * @param {number} delay 延迟时间
 * @returns {function} 返回客户调用函数
 * */ 
export function throttle(func, delay) {
    let start = 0, timer=null;
    return function (...args) {
        let now = Date.now();
        if (now - start < delay) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => { // 保证在当前时间区间结束后，再执行一次func
                start = now;
                func.apply(this, args);
            }, delay);
        } else {
            start = now;
            func.apply(this, args);
        }
    }
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