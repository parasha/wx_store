const store = {
    callback:{},
    createPage(params) {
        //保存 store 
        const _this = this;
        // 小程序页面的原始参数
        const globalData = params.globalData || [];
        const onLoad = params.onLoad || function () {};
        const onShow = params.onShow || function () {};


        params.onLoad = function (options) {
            // 向页面中添加一个 setGlobalData 方法
            this.setGlobalData = setGlobalData;
            //把 store 加入到页面中
            this.store = _this;

            onLoad.call(this, options)
        }
        params.onShow = function () {
            this.setData(globalDataRefresh(globalData,_this))            
            onShow.call(this)
        }
        //页面初始化
        Page(params)
    },
    /**
     * 组件这部分有问题，组件没有onShow
     */
    createComponent: function (params) {
        //保存 store 
        const _this = this;

        const attached = params.attached || function(){};
        const onReady = params.ready || function () {};

        params.attached = function(){
            // 获取父页面
            const allPages = getCurrentPages()
            this.page = allPages[allPages.length-1]
            // 向页面中添加一个 setGlobalData 方法
            this.setGlobalData = function (data){
                this.page.setGlobalData(data)
            }
            this.setPageData = function(data){
                this.page.setData(data)
            }
            //把 store 加入到页面中
            this.store = _this;
            attached.call(this)
        }
        Component(params)
    }
}

function setGlobalData (data){
    for (let key in data) {
        this.store[key] = data[key]
    }
    this.setData({ ...data})
}
//每次调用 onShow 的时候更新需要的 globalData
function globalDataRefresh(globalData,store){
    let obj = {}
    globalData.forEach(element => {
        if (store[element]) {
            obj[element] = store[element]
        }
    });
    return {...obj};
}

export default store