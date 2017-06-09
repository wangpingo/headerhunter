
var Component = require('../../base/component');
var template = require('./resetPwd.html');
var cacheService = require('../../service.js');
var _ = require('../../base/util.js');
var Mask = require('../../common/mask.js');
var Notify = require('../../common/notify.js');

var ResetPwd = Component.extend({
    template:template,

    init:function(){
        this.data.formData = {};
        this.data.errInfo = '';


        this.data.firstAllFlag = {
            emailFlag:false
        };

        this.data.secondAllFlag = {
            newPwdFlag:false,
            newPwdAgainFlag:false,
        };
        this.data.pwdStatus = {
            length:false,
            space:false,
            number:false
        }
        this.__getCurrentStatus();

        this.__watchAll();
    },

    /**
     * 获取当前页面状态
     * @private
     */
    __getCurrentStatus:function(){

        var self = this;
        var params = _.getParams(window.location.href);
        if(!_.isEmptyObject(params)){
            this.data.currentStatus = params.status;
            if(this.data.currentStatus == 3){
                self.data.secondBtnFlag = false;
                self.$update();
            }
            this.$update();
        } else {
            this.data.currentStatus = 1;
            this.data.firstBtnFlag = false;
            this.$update();
        }
    },

    /**
     * 监听输入框的变化
     */
    __watchAll:function(){
        //当重新输入登录名时 取消错误信息
        var self = this;
        this.$watch('formData.email',function(newV,oldV){
            if(newV != '' && newV.trim()!=''){
                self.data.errInfo = '';
                self.data.firstAllFlag.emailFlag = true;

            }else{
                self.data.firstAllFlag.emailFlag = false;
            }
            self.__setBtn('firstAllFlag','firstBtnFlag');
            self.$update();
        });

        this.$watch('formData.newPwd',function(newV,oldV){
            if(newV != '' && newV.trim()!='') {
                self.data.errInfo = '';
                self.data.secondAllFlag.newPwdFlag = true;
                self.checkPwdStrength(newV);
            }else{
                self.data.secondAllFlag.newPwdFlag = false;

            }
            self.__setBtn('secondAllFlag','secondBtnFlag');
            self.$update();
        });

        this.$watch('formData.newPwdAgain',function(newV,oldV){
            if(newV===undefined){
                return;
            }
            if(newV != '' && newV.trim()!=''){
                self.data.errInfo = '';
                self.data.secondAllFlag.newPwdAgainFlag = true;

            }else{
                self.data.secondAllFlag.newPwdAgainFlag = false;
            }
            self.__setBtn('secondAllFlag','secondBtnFlag');
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
    __setBtn:function(flag,btn){


        for(var item in this.data[flag] ){

            if(this.data[flag][item] == false){
                this.data[btn] = false;
                return;
            }
        }
        if(flag == 'secondAllFlag'){
            if(this.data.pwdTotalStatus == true){
                return;
            }
        }

        this.data[btn] = true
    },

    /**
     * 发送重置密码邮件时提交表单
     */
    submit1:function(){
        var  self = this;
        for(var item in self.data.firstAllFlag ){
            if(self.data.firstAllFlag[item] == false){
                return;
            }
        }
        var mask = new Mask().$inject(document.body);
        cacheService.sendResetPwdEmail(this.data.formData,function(data,result){
            mask.close();
            self.data.email = data;
            self.data.currentStatus = 2;
            self.$update();

        },function(err,errResult){

            mask.close();
            self.data.errInfo = errResult.msg;
            self.data.formData.email ='';
            self.data.firstAllFlag['emailFlag'] = false;

            self.__setBtn('firstAllFlag','firstBtnFlag');

            self.$update();
        });
    },


    /**
     * 重置密码发送请求
     */
    submit2:function(){
        var  self = this;
        for(var item in self.data.secondAllFlag ){
            if(self.data.secondAllFlag[item] == false){
                return;
            }
        }
        for(var item in self.data.pwdStatus){
            if(self.data.pwdStatus[item] == false){
                return;
            }
        }
        if(self.data.formData.newPwd !== self.data.formData.newPwdAgain){
            self.data.errInfo = '新密码输入不一致';
            return;
        }
        delete self.data.formData.newPwdAgain;
        var mask = new Mask().$inject(document.body);

        cacheService.resetPwd(this.data.formData,function(){

            Notify.success('重置密码成功，正在跳转~');
            clearTimeout(timer)
            var timer = setTimeout(function(){
                mask.close();
                self.$state.nav('/login');
            },1000);


        },function(err,errResult){

            mask.close();

            self.data.errInfo = errResult.msg;
            self.data.formData.newPwd = '';
            self.data.formData.newPwdAgain = '';


            for(var item in self.data.secondAllFlag ){
                self.data.secondAllFlag[item] = false;
            }
            self.__setBtn('secondAllFlag','secondBtnFlag');
            self.$update();
        });
    }
});

module.exports = ResetPwd;