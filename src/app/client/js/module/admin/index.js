/**
 * Created by hzchengshuli on 2016/10/28.
 */
var Component = require('../../base/component');
var template = require('./index.html');
var Modal = require('../../common/modal.js');
var Mask = require('../../common/mask.js');

var Cookie = require('../../../../../node_modules/js-cookie/src/js.cookie.js');
var _ = require('../../base/util.js');
var Pager = require('../../common/pager.js');

var Admin = Component.extend({
    template:template,
    config() {

    },

    init() {

    },

    /**
     * 增加猎头
     */
    addHunter() {

    },

    /**
     * 启用猎头
     */
    useHunter() {

    },

    /**
     * 停止使用猎头
     */
    stopHunter(){
    },

    goHunterDetail() {
        this.$state.go('app.hunterDetail');
    }
})

Admin.component('Pager',Pager);

module.exports = Admin;
