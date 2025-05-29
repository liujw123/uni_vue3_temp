class Loading {
    times = 0
    timer = null
    // https://developers.weixin.qq.com/community/develop/doc/0008e440e6cb58d4050a4b7e451c00?_at=1619083932616
    // showLoading 与 hideLoading 尽量成对出现，不然会报错
    // => (in promise) MiniProgramError{"errMsg":"hideLoading:fail toast can't be found"}Object
    isLoading = false 
    show(loading) {
        if (loading === false) return // 如果传入的 loading 属性为 false，则不处理
        clearTimeout(this.timer) // 如果有多个请求同时进行，则用最后请求的 loading
    
        this.times++
        this.timer = setTimeout(() => {
            this.isLoading = true;
            uni.showLoading({
                title: loading ?? '加载中',
                mask: true
            })
        }, 200) // 设定延迟，如果请求超过 200ms 才显示 loading
    }
  
    hide(loading) {
        if (loading === false) return
    
        this.times--
        if (this.times <= 0) {
            clearTimeout(this.timer)
            if(this.isLoading){
                uni.hideLoading();
                this.isLoading = false;
            }
            this.times = 0
        }
    }
  }
  
  export default Loading