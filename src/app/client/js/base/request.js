'use strict';

var reqwest = require('reqwest');
var ajax = {};

var constant = require('../base/constant.js');
var Mask = require('../common/notify.js');
var Notify = require('../common/notify.js');
var Cookie  = require('../../../../node_modules/js-cookie/src/js.cookie.js');
var cacheServer = require('../service.js');

ajax.request = function(opt) {
    var optError = function(data,result) {

        if(result.code == 'TO'){
            if(constant.NOTIFYNUM++ && constant.NOTIFYNUM>1){
                return;
            }
            var mask = new Mask().$inject(document.body);
            Notify.warning('登录超时，自动跳转至登录页面~');
            clearTimeout(timer)
            var timer = setTimeout(function(){
                Cookie.remove('passport');

                mask.close();
                window.location = '#/login';
                location.reload(true);
            },1000);

        }

        if(result.code == '500'){

            window.location = '/50x.html';
        }
        //opt.progress && progress.end(true);
        //oldError(data.result, data);
    }
    var noop = function(){};
    var oldError = opt.error || optError,
        oldSuccess = opt.success || noop,
        oldComplete = opt.complete || noop;

    opt.data = opt.data || {};

    if(opt.method && opt.method.toLowerCase() !== 'get')
        opt.contentType = opt.contentType || 'application/json';
    else
        opt.data.timestamp = +new Date;

    if(opt.contentType === 'application/json' || opt.headers && opt.headers.contentType === 'application/json' ) {

        opt.data = JSON.stringify(opt.data);
    }

    //ajax.$emit('start', opt);
    //opt.progress && progress.start();

    opt.success = function(data) {

        //ajax.$emit('success', data);
        //opt.progress && progress.end();
        if(data.code != 200) {

           // Notify.success(data.msg);
            oldError(data.result||data.data, data);
            return;
        }
        oldSuccess(data.result||data.data, data);
    }


    opt.complete = function(data) {
        //ajax.$emit(ecomplete', data);
        oldComplete(data.result, data);
    }

    if(opt.method && opt.method.toLowerCase() == 'post'){
        cacheServer.getToken(function(data,result){
            /*opt.data = JSON.parse(opt.data);
            opt.data.token = data;
            opt.data = JSON.stringify(opt.data)*/
            opt.headers = {token:data};
            reqwest(opt);
        })
        return;
    }

    reqwest(opt);
}

module.exports = ajax;