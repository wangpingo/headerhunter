var ajax = require('./base/request.js');

exports.getToken = function(callback,errback){

    ajax.request({
        url:'/sys/getToken',
        method:'GET',
        success:callback,
        error:errback,
    })
}

//登录
exports.login = function(params,callback,errback){

    ajax.request({
        url: '/sys/getLogin',
        method: 'POST',
        data: params,
        success: callback,
        error:errback
        //contentType:"application/x-www-form-urlencoded",
    });
}
/**
 * 登出
 * @param callback
 * @param errback
 */
exports.logout = function(callback,errback){

    ajax.request({
        url:'/sys/logout',
        method:'GET',
        success:callback,
        error:errback,
    })
}
/**
 * 获取验证码
 * @param 成功回调函数
 * @param 错误回调函数
 */
exports.getVerificationCode = function(callback,errback){

    ajax.request({
        url:'/sys/getValiationCode',
        method:'GET',
        success:callback,
        error:errback,
    })
}

/**
 * 发送重置密码邮件
 */
exports.sendResetPwdEmail = function(params,callback,errback){

    ajax.request({
        url: '/forgotPwd/mail',
        method: 'POST',
        data: params,
        success: callback,
        error:errback,

    });
}

/**
 * 重置密码
 * @param params
 * @param callback
 * @param errback
 */
exports.resetPwd = function(params,callback,errback){

    ajax.request({
        url:'/sys/forgotPwd/reset/resetPwd',
        method:'POST',
        success:callback,
        error:errback,
        data:params
    })
}

/**
 * 修改密码
 * @param params
 * @param callback
 * @param errback
 */
exports.changePwd = function(params,callback,errback){

    ajax.request({
        url: '/sys/resetPwd',
        method: 'POST',
        data: params,
        success: callback,
        error:errback,

    });
}

//-------------------------首页请求------------

exports.selectOptions=function (callback,errback) {

    ajax.request({
        url: '/index/option',
        method: 'GET',
        success: callback,
        error:errback,
    });

}


/**
 * 查询职位列表
 * @param params   查询需要的参数；
 * @param callback
 * @param errback
 */
exports.positionList=function (params,callback,errback) {

    ajax.request({
        url: '/index/positionList',
        method: 'POST',
        data: params,
        success: callback,
        error:errback,
    });
}



//------------------详情页请求--------------

/**
 * 查询职位详情
 * @param params id
 * @param callback
 * @param errback
 */
exports.getPositionDetail=function (params,callback,errback) {
    ajax.request({
        url: '/position/detail?id='+params,
        method: 'GET',
        success: callback,
        error:errback,
    });
}

//----------------我要推荐页-------------------

/**
 * 点击我要推荐
 * @param params
 * @param callback
 * @param errback
 */
exports.recommendUpload=function (params,callback,errback) {

    ajax.request({
        url: '/recommend/upload',
        method: 'POST',
        data: params,
        success: callback,
        error:errback,
    });
}

exports.getDegree=function (callback,errback) {

    ajax.request({
        url: '/options/byCode',
        method: 'GET',
        success: callback,
        error:errback,
    });
}
/**
 * 选择已有简历
 * @param params
 * @param callback
 * @param errback
 */
exports.selectHaveFile=function (params,callback,errback) {

    ajax.request({
        url: '/resume/pick',
        method: 'POST',
        data: params,
        success: callback,
        error:errback,
    });

}

/**
 * 我的推荐
 * @param params
 * @param callback
 * @param errback
 */
exports.myRecommend=function (params,callback,errback) {

    ajax.request({
        url: '/resume/detail.do',
        method: 'POST',
        data: params,
        success: callback,
        error:errback,
    });
}
