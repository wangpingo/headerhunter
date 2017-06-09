/**
 * Created by hzchengshuli on 2016/10/28.
 */
var Component = require('../../base/component');
var template = require('./index.html');
var Cookie = require('../../../../../node_modules/js-cookie/src/js.cookie.js');
var _ = require('../../base/util.js');
var cacheService = require('../../service.js');
var Pager = require('../../common/pager.js');
var Search = require('../../common/search.js');


var Home = Component.extend({
    template:template,

    config() {
        this.data.queryObj={};             //初始查询条件
        this.data.arrowStatus=[];          //控制箭头显示上下
        this.data.flags={
            workPlaceListFlag:[true],      //默认选中不限
            workYearsListFlag:[true],      //默认选中无工作经验
            positionTypeListFlag:[true]    //默认选中职位类别
        };
        this.selectPage();                 //监听 子组件page切换的事件

    },

    init() {
        if(!Cookie.get('passport')){
            location.href='#/login';
            return;
        }
        this.__selectOptions();

        this.__queryPosition();
        this.$update();
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
        const page=option.param.page;
        this.data.queryObj.currentPage=page || 1;
    },

    /**
     * 监听pager组件的页数变化
     */
    selectPage() {
        this.$on('selectPage',(obj)=>{
            let page=obj.current;
            return this.$state.go('app.home',{param:{page:page}});
        });
     },


    /**
     * 获取职位列表
     * @private
     */
    __queryPosition() {

        /**
         *监听：queryObj:输入查询条件对象
         */
        let data=this.data;
        this.$watch('queryObj',(newV,oldV) =>{

            /**
             * 获得职位列表
             * @param 查询条件对象
             */
            cacheService.positionList(newV, (result) =>{
                data.positionList=result.positionList;
                data.page=result.page;
                data.hrList=result.hrList;
                data.departmentList=result.departmentList;
                this.$update();
            })
        },true)
    },

    /**
     * 获取查询的选项 地点 工作经验 职位类别
     * @private
     */
    __selectOptions() {
        let data=this.data;
        cacheService.selectOptions(result=>{
            data.workPlaceList=result.workPlaceList;
            data.workYearsList=result.workYearsList;
            data.positionTypeList=result.positionTypeList;
            this.$update();
        });
    },

    /**
     * 点击箭头控制箭头的显示状态
     * @param index  第几个箭头
     */
    setArrow(index) {
        let arrowStatus=this.data.arrowStatus;
        arrowStatus[index]=!arrowStatus[index];
        this.$update();
    },

    /**
     * 点击我要推荐按钮
     */
    recommend(id) {
        this.$state.go('app.upload',{param:{id:id}});
    },

    /**============================================
     * 选项按钮  点击出现红色背景
     * @param option 类别
     * @param index  点击的哪一个选项
     * ============================================
     */
    clickOption(option,index) {

        let flags=this.data.flags,
            queryObj=this.data.queryObj,
            list=option.replace('Flag','');

        /**
         * o（n） 时间复杂度
         * 在首页点击 工作地点 工作年限 职位类别 中的选项切换时选项状态以及状态改变发出请求
         */
        for (let key in flags){
            if(option==key){
                for (let i=0;i<this.data[list].length;i++){
                    flags[option][i]=false;
                }
                flags[option][index]=true;
                queryObj[list]=index;
            }
            this.$update();
        }
    },

    /**
     * 点击搜索按钮
     */
    searchButton() {
        let data=this.data;
        data.queryObj.positionName=data.searchValue;
    }

})
Home.component('Pager',Pager);
Home.component('Search',Search);
module.exports = Home;
