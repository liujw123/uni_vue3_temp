/**
 * @param { Object } options
 * @param { String } options.url 请求地址
 * @param { String } options.api 请求接口
 * @param { String } options.filePath 文件路径
 * @param { Function } options.onProgressCallBack 上传进度回调
 * @param { Object } options.formData 请求参数
 * @returns { Promise }
 * 
 * */ 
export const uploadFile =  ({ url = __API__, api = '/Admino/AdminUser/uploadImgs', filePath, onProgress, formData = {} }) => {
    return new Promise((rs,rj)=>{
        let uploadTask = wx.uploadFile({
            url: url + api, 
            filePath, 
            formData, 
            name:'file', 
            success: res=>{
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    let _json = res?.data || ''
                    let _data = JSON.parse(_json);
                    if(_data?.scode){
                        rs(_data?.data);
                    }else{
                        rj(_data)
                    }
                    
                } else {
                    rj(res)
                }
            }, 
            fail: rj
        })

        uploadTask.onProgressUpdate(onProgress)
    })
}
