var restate = require('regular-state');
var Component = require('./base/component.js');
var Cookie  = require('js-cookie/src/js.cookie.js');

/* App */
var App = require('./module/app/app.js');

var Login = require('./module/login/index.js');
var ResetPwd = require('./module/login/resetPwd.js');
var ChangePwd = require('./module/login/changePwd.js');

//首页
var Home = require('./module/home/index.js');

//详情页
var Detail= require('./module/detail/index.js');

//管理员页面
var Admin = require('./module/admin/index');

//管理员添加猎头帐号
var hunterDetail = require('./module/hunterDetail/index');

//猎头推荐页
var Recommend=require('./module/recommend');

//关于猎头
var HeadHunter=require('./module/headhunter');

//上传简历
var Upload=require('./module/upload');


/* App */
var router = restate({view: document.getElementById('view'), Component: Component, rebuild: true})
    .on('begin',function(evt){

    })
    .state('app', App , '')
    .on("notfound",function() {
        /*
        * 登陆后的找不到的路径定向到home，
        * 未登录的找不到的路径定向到login
        * */
        if (Cookie.get('passport')){
            router.nav('/home');
        }else {
            router.nav('/login');
        }
    })

/* 登录页面*/
router
    .state('app.login',Login,'login')
    .state('app.resetPwd',ResetPwd,'resetpwd')
    .state('app.changePwd',ChangePwd,'changepwd')

//首页  mount:function ()
router.state('app.home',Home,'home');

//详情页
router.state('app.detail',Detail,'detail');

//我的推荐
router.state('app.recommend',Recommend,'recommend');

//上传简历页
router.state('app.upload',Upload,'upload');

//关于猎头
router.state('app.headhunter',HeadHunter,'headhunter');

//管理员首页
router.state('app.admin',Admin,'admin');

//管理员添加猎头账号页
router.state('app.hunterDetail',hunterDetail,'hunterDetail');


module.exports = router;
