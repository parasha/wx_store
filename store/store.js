const store = {
    createPage(params) {
        //保存 store 
        const _this = this;
        // 小程序页面的原始参数
        const globalData = params.globalData || [];
        const onLoad = params.onLoad || function () {};
        const onShow = params.onShow || function () {};


        params.onLoad = function (options) {
            // 向页面中添加一个 setGlobalData 方法
            this.setGlobalData = function (data) {
                for (let key in data) {
                    this.store[key] = data[key]
                }
                this.setData({ ...data
                })
            }
            //把 store 加入到页面中
            this.store = _this;

            onLoad.call(this, options)
        }
        params.onShow = function () {
            let obj = {}
            globalData.forEach(element => {
                if (_this[element]) {
                    obj[element] = _this[element]
                }
            });
            this.setData({ ...obj
            })
            onShow.call(this)
        }
        //页面初始化
        Page(params)
    },
    createComponent: function (params) {
        //保存 store 
        const _this = this;

        const globalData = params.globalData || [];
        const onReady = params.ready || function () {};

        params.ready = function () {
            let obj = {}
            globalData.forEach(element => {
                if (_this[element]) {
                    obj[element] = _this[element]
                }
            });
            this.setData({ ...obj
            })
            onReady.call(this)
        }
        Component(params)

    }
}

export default store