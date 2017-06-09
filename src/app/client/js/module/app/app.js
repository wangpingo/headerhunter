var Component = require('../../base/component');
var template = require('./app.html');
var _ = require('../../base/util.js'); 
var Cookie  = require('../../../../../node_modules/js-cookie/src/js.cookie.js');
var cacheServer = require('../../service.js');
var Emit =  require('../../base/emit.js');
var constant = require('../../base/constant.js');

var App = Component.extend({
	template:template,
	config:function(){

		let data=this.data;
        data.user =  Cookie.get('passport') || null;    //用户名
        data.userType=Cookie.get('userType') || null;  //用户类型
        data.newYear  = new Date().getFullYear();
		this.$update();
	},
	init:function () {

        //注册navShow
        Emit.observer.regist('navShow',()=>{this.navShow()})
		//注册navAdd
        Emit.observer.regist('navAdd', ()=> {this.navAdd()})
		if (this.data.userType){
            this.navAdd();
        }
		this.$update();
	},

    /**
	 * 用于显示导航栏
     */
	navAdd:function () {

		let data=this.data;
		data.userType=Cookie.get('userType');
		data.navs= (data.userType==constant.ADMIN?constant.ADMINNAVS:constant.USERNAVS);
        this.$update();
    },

	/**
	 * 登录成功后显示导航
	 * @param res
	 */
	navShow:function(){
		this.data.user = Cookie.get('passport');
		this.$update();
	},

    /**
	 * 用于显示被选中的状态
     * @param match         导航栏的match值
     * @returns {boolean}   返回当前路由的match值
     */
	isSelected:function(match){

		var isMatch = new RegExp(match);
		return isMatch.test(this.$state.current.name)
	},

    /**
	 *
     * @param index 目前被选中的索引
     */
	onSelected: function(index){

		this.data.currentIndex = index;

	},

	/**
	 * 忘记密码跳转
	 */
	changePwd:function(){

		this.$state.nav('/changepwd');
	},

    /**
	 * 登出操作
     */
	logout:function(){
		cacheServer.logout(function(data,result){
			Cookie.remove('passport');
            Cookie.remove('userType');
			this.$state.nav('/login');
			location.reload(true);
		}.bind(this),function () {
            this.$state.nav('/login');
        }.bind(this))
	}

});
module.exports = App;