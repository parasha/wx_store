const store = {
    createPage(params) {
        const _this = this;
        // 小程序页面的原始参数
        const globalData = params.globalData || {};
        const onLoad = params.onLoad || function () {};
        for(let key in globalData){
            _this[key] = globalData[key]
        }
        params.onLoad = function (options) {
            this.setData({...globalData})
            this.setGlobalData = function (data) {
                for(let key in data){
                    globalData[key] = data[key]
                }
                this.setData({...data})
            }
            this.store = _this;

            onLoad.call(this, options)
        }
        //页面初始化
        Page(params)
    }

}

export default store