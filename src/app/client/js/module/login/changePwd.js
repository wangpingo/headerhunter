/*
* Create gaochuankang
* */
var Component = require('../../base/component');
var template = require('./changePwd.html');
var cacheService = require('../../service.js');
var Cookie = require('../../../../../node_modules/js-cookie/src/js.cookie.js')
var Mask = require('../../common/mask.js');
var Notify = require('../../common/notify.js');

var ChangePwd = Component.extend({
    template:template,

    init:function(){
        this.data.formData = {};
        this.data.errInfo = '';
        this.data.btnFlag = false;
        this.data.allFlag = {
            oldPwdFlag:false,
            newPwdFlag:false,
            newPwdAgainFlag:false
        };
        this.data.pwdStatus = {
            length:false,
            space:false,
            number:false
        }
        if(!Cookie.get('passport')){
            location.href='#/login';
            return;
        }
        this.__watchAll();
    },

    /**
     * 监听输入框的变化
     */
    __watchAll:function(){
        //当重新输入登录名时 取消错误信息
        var self = this;
        this.$watch('formData.password',function(newV,oldV){
            if(newV && newV != '' && newV.toString().trim()!=''){
                self.data.errInfo = '';
                self.data.allFlag.oldPwdFlag = true;
            }else{
                self.data.allFlag.oldPwdFlag = false;
            }
            self.__setBtn();
            self.$update();
        });

        this.$watch('formData.newPwd',function(newV,oldV){
            if(newV && newV != '' && newV.toString().trim()!=''){
                self.data.errInfo = '';
                self.data.allFlag.newPwdFlag = true;
                self.checkPwdStrength(newV);
            }else{
                self.data.allFlag.newPwdFlag = false;
            }
            self.__setBtn();
            self.$update();
        });

        this.$watch('formData.newPwdAgain',function(newV,oldV){

            if(newV && newV != '' && newV.toString().trim()!=''){
                self.data.errInfo = '';
                self.data.allFlag.newPwdAgainFlag = true;
            }else{
                self.data.allFlag.newPwdAgainFlag = false;
            }
            self.__setBtn();
            self.$update();
        })
    },
    /**
     * 密码强度判定
     * @private
     */
    checkPwdStrength:function(val){
        if(val.length<6 || val.length>16){
            this.data.pwdStatus.length = false;
        } else {
            this.data.pwdStatus.length = true;
        }

        if(val.indexOf(' ') >= 0){
            this.data.pwdStatus.space = false;
        } else {
            this.data.pwdStatus.space = true;
        }

        if(/^[0-9]{1,9}$/.test(val)){
            this.data.pwdStatus.number = false;

        }else {
            this.data.pwdStatus.number = true;
        }
    },
    /**
     * 获得焦点时触发的事件
     */
    pwdFocus:function(){
        this.data.pwdTotalStatus = true;
        this.$update();
    },
    pwdBlur:function(){
        for(var item in this.data.pwdStatus){
            if(this.data.pwdStatus[item] == false){

                return;
            }
        }
        this.data.pwdTotalStatus = false;
    },
    //控制按钮的显示与隐藏
    __setBtn:function(){

        for(var item in this.data.allFlag ){

            if(this.data.allFlag[item] == false){
                this.data.btnFlag = false;
                return;
            }
        }

        if(this.data.pwdTotalStatus == true){
            return;
        }

        this.data.btnFlag = true

    },


    /**
     * 提交表单
     */
    submit:function(){

        var  self = this;

        for(var item in self.data.allFlag){
            if(self.data.allFlag[item] == false){
                return;
            }
        }
        if(self.data.formData.newPwd !== self.data.formData.newPwdAgain){
            self.data.errInfo = '新密码输入不一致';
            return;
        }
        var uploadData = self.data.formData;

        delete uploadData.newPwdAgain;
        var mask = new Mask().$inject(document.body);
        cacheService.changePwd(uploadData,function(){
            Notify.success('修改密码成功，正在跳转~');
            clearTimeout(timer)
            var timer = setTimeout(function(){
                mask.close();
                self.$state.nav('/home');
            },1000);

        },function(err,errResult){
            mask.close();

            self.data.errInfo = errResult.msg;
            self.data.formData.password ='';
            self.data.formData.newPwd = '';
            self.data.formData.newPwdAgain = '';


            for(var item in self.data.allFlag ){
                self.data.allFlag[item] = false;
            }

            self.$update();
        });
    }
})

module.exports = ChangePwd;