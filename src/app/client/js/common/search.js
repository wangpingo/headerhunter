/**
 * Created by hzgaoquankang on 2017/5/6.
 */

// 使用方式
// 在父组件中使用  <search >
//this.Search.$on('search', this.__searchByBar.bind(this));
//
//    __searchByBar = function(obj){
//        this.__table.data.currentPage = 1;
//        this.__search(obj);
//   };
//    __search = function(obj){
//        var self = this,
//            _searchItems = self.Search.data.searchItems,
//            _searchBarData = self.Search.data;
//            _searchItems.currentPage = self.__table.data.currentPage;
//       AJAX(params,function(data){},function(){})
//       }
//
//
//
//
//  "GET /ptype/getList.do": function(req, res, next) {
/*        res.send({
 "code": "200",
 "data": [{
 id: "3",
 name: "前端"
 }, {
 id: "4",
 name: "开发"
 }],
 "msg": null
 });
 },

 "GET /common/options/resumefrom.do": function(req, res, next) {
 res.send({
 "code": "200",
 "data": [{
 "code": "resumefrom",
 "id": "30",
 "name": "猎聘网",
 "active": null,
 "parentId": "3"
 }, {
 "code": "resumefrom",
 "id": "31",
 "name": "前程无忧",
 "active": null,
 "parentId": "3"
 }],
 "msg": "3"
 });
 },*/

//test
/*exports.__loadPosTypes = function(params,callback,errback){

 ajax.request({
 url:'/ptype/getList.do',
 method:'GET',
 data:params,
 success:callback,
 error:errback

 })
 }

 //test
 exports.__loadResumeFrom = function(params,callback,errback){

 ajax.request({
 url:'/common/options/resumefrom.do',
 method:'GET',
 data:params,
 success:callback,
 error:errback

 })
 }

 */



'use strict';
var Component = require('../base/component.js');
var template = require('./search.html');
var _ = require('../base/util.js');
var Service = require('../service.js');

var Search = Component.extend({
    template: template,
    name:'search',
    config: function(data){
        _.extend(data,{
            searchQuery:{
                "postStatus": "",
                "appName":"",
                "postType":"",
                "currentPage":1,
                "resumeFrom":""
            },
            appName:"",
            resumeFrom:"",
            postType1:"",
            subPostType:"",
            subsubPostType:"",
            resourceList:[],
            searchItems:{
                interested:this.data.interested
            }
        });
    },
    init: function(){
        this.__loadResumeFrom();
        this.__loadPosTypes(-1, 0);
    },

    __searchByAppName: function(event){

        if((event && event.type == "keydown" && event.which == 13) || !event){
            var _data = this.data,
                _searchItems = _data.searchItems;
            _searchItems.appName = _data.appName.trim();
            this.__search(null);
        }
    },

    __clickSearch: function($event, _attr, _index){
        var _data = this.data,
            _searchItems = _data.searchItems,
            _target = $event.target,
            _id = _target.getAttribute("data-id"),
            _dataAttr = _target.parentNode.getAttribute("attr");

        _data[_dataAttr] = _id;

        _searchItems[_attr] = _data[_attr];
        this.__search(null);
    },
    /**
     * 搜索
     * obj:传递为了区分职位类别是否需要更换
     */
    __search: function(obj){
        this.$emit('search',obj);
    },

    // 获取简历来源列表
    __loadResumeFrom: function (id) {
        var self = this,
            resourceList = self.data.resourceList || [],
            hasSub = true;

        // Service.__loadResumeFrom({
        //     id: -1
        // },function(data,json){
        //     self.data.resourceList = json.data;
        // },function(){});
    },

    // 获取职位列表
    __loadPosTypes: function () {
        var self = this,
            sdata = self.data;

        // Service.__loadPosTypes({
        //     id: 0
        // },function(data,json){
        //     sdata.postType = '';
        //     sdata.postTypes = json.data;
        //     self.$update();
        // },function(){});

    }
});

module.exports = Search;