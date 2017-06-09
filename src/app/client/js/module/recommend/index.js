var Component = require('../../base/component');
var template = require('./index.html');
var Cookie = require('../../../../../node_modules/js-cookie/src/js.cookie.js');
var _ = require('../../base/util.js');
var cacheService = require('../../service.js');
var Pager = require('../../common/pager.js');

var Recommend = Component.extend({
    template:template,

    config() {
        this.data.show=false;
        this.data.arrowStatus=[];          //控制div显示
        this.data.page=1;                  //默认显示第一页

    },

    init() {
        this.selectPage();
    },


    /**
     * 路由进入时候钩子函数
     * @param option
     */
    enter(option) {
        this.update(option)
    },
    /**
     *可以监听到url变化
     * @param option
     */
    update(option) {
        let data=this.data;
         data.page=option.param.page || 1;
         this.myRecommend(data.page);
    },

    /**
     * 监听pager组件的页数变化
     */
    selectPage() {
        this.$on('selectPage',(obj)=>{
            let page=obj.current;
            return this.$state.go('app.recommend',{param:{page:page}});
        });
    },


    /**
     * hover时 展示提示字体
     */
    showIcon(index,bool) {
        let arrowStatus=this.data.arrowStatus;
        arrowStatus[index]=bool;
        this.$update();
    },

    /**
     * 得到我的推荐
     */
    myRecommend(currentPage){
        let data=this.data;

        /**
         * 获得我推荐的简历
         */
        cacheService.myRecommend({currentPage},(result)=> {
            data.pages=result.page;
            data.recommendList=result.list;
            this.$update();
        })
    }
});

Recommend.component('Pager',Pager);

module.exports=Recommend;