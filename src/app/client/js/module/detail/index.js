/**
 * Created by hzgaoquankang on 2017/5/1.
 */
var Component = require('../../base/component');
var template = require('./index.html');
var cacheService = require('../../service.js');

var Detail = Component.extend({
    template:template,



    config() {
        this.data.show=false;  //图标默认不显示
    },

    init() {

    },

    //获取id
    enter(option){
       let id=this.data.id=option.param.id;
       this.__getPositionDetail(id);
    },

    /**
     * 点击我要推荐按钮
     */
    submit() {
        let id=this.data.id;
        this.$state.go('app.upload',{param:{id:id}});
    },

    /**
     * hover时 展示
     */
    showIcon(bool){
        this.data.show=bool;
        this.$update();
    },

    /**
     * 获取详情页
     * @param id 职位编号
     * @private
     */
    __getPositionDetail(id){

        /**
         * 获取职位详细信息;
         * @param 职位编号
         */
        cacheService.getPositionDetail(id,result=>{
            this.data.detail=result;
            this.$update();
        })
    }

});

module.exports = Detail;