
var Component = require('../../base/component');
var template = require('./index.html');
var cacheService = require('../../service.js');
var Notify = require('../../common/notify');
var Mask = require('../../common/mask.js');
var Cookies = require('../../../../../node_modules/js-cookie/src/js.cookie.js')
var Emit =  require('../../base/emit.js');

var Login = Component.extend({
    template:template,
    init:function(){
        this.data.remPassword=true;  //记住密码框
        this.data.formData = {};
        this.data.errInfo = '';
        this.data.btnFlag = false;
        this.data.allFlag = {
            emailFlag:false,
            // idFlag:false,
            pwdFlag:false,
            codeFlag:false
        };
        this.__watchAll();
        this.$update();
    },

    /**
     * 监听输入框的变化
     */
    __watchAll:function(){
        //当重新输入登录名时 取消错误信息
        this.$watch('formData.email|escape',function(newV,oldV){
            if(newV != '' && newV.trim() !=''){
                this.data.errInfo = '';
                this.data.allFlag.emailFlag = true;

            } else {
                this.data.allFlag.emailFlag = false;
            }
            this.__setBtn();
            this.$update();

        }.bind(this));
        this.$watch('formData.password|escape',function(newV,oldV){
            if(newV != ''&& newV.trim() !=''){
                this.data.errInfo = '';
                this.data.allFlag.pwdFlag = true;

            }else{
                this.data.allFlag.pwdFlag = false;
            }
            this.__setBtn();
            this.$update();
        }.bind(this));
        this.$watch('formData.validateCode|escape',function(newV,oldV){
            if(newV != ''&& newV.trim() !=''){
                this.data.errInfo = '';
                this.data.allFlag.codeFlag = true;
            }else{
                this.data.allFlag.codeFlag = false;
            }
            this.__setBtn();
            this.$update();
        }.bind(this))

    },


    /**
     * 更新验证码
     */
    updateValiationCode:function(){
        var timestamp = new Date().getTime();
        this.$refs.valiationImg.src = ' /sys/getVerifyCode.do?timestamp=' + timestamp;
        this.$update();
    },

    //控制按钮的显示与隐藏
    __setBtn:function(){

        for(var item in this.data.allFlag ){

            if(this.data.allFlag[item] == false){
                this.data.btnFlag = false;

                return;
            }
        }

        this.data.btnFlag = true
    },

    /**
     * 忘记密码
     */
    changeToReset:function(){
        this.$state.nav('/resetpwd');

    },

    /**
     * 提交表单
     */
    submit:function() {
        var self = this;
        for(var item in self.data.allFlag){
            if(self.data.allFlag[item] == false){
                return;
            }
        }

        var mask = new Mask().$inject(document.body);
        cacheService.login(this.data.formData, function (data) {
            Notify.success('登录成功 正在跳转~~');
            clearTimeout(timer)
            var timer = setTimeout(function(){
                mask.close();
                data.userType==1?self.$state.nav('/admin'):self.$state.nav('/home');
            }, 1000);
            Cookies.set('passport', data.companyName);
            Cookies.set('userType',data.userType);
            if(self.data.remPassword){
                Cookies.set('passport',data.companyName, {expires: 5});
                Cookies.set('userType',data.userType,{expires: 5});
            }
            Emit.observer.fire('navAdd');
            Emit.observer.fire('navShow',data.companyName);
        }, function (errData, errResult) {
            mask.close();
            if (errResult&&errResult.code == 302) {
                self.data.errInfo = '尝试次数过多，请稍后再试'
            }
            self.data.errInfo = errResult.msg;
            if(self.data.errInfo == '验证码错误！'){
                self.data.formData.validateCode = ''
                self.data.allFlag.codeFlag = false;
            } else {
                self.data.formData.email = '';
                self.data.formData.password = '';
                self.data.formData.validateCode = '';
                for (var item in self.data.allFlag) {
                    self.data.allFlag[item] = false;
                }
            }
            self.updateValiationCode();
            self.$update();
        });
    }

});


module.exports = Login;