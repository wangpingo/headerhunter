/**
 * Created by hzgaoquankang on 2017/5/12.
 */

var Component = require('../../base/component');
var template = require('./index.html');
var cacheService = require('../../service.js');
var Pager = require('../../common/pager.js');

var hunterDetail = Component.extend({
    template:template,
    config() {

    },
    init() {

    },
    goBack() {
        this.$state.go('app.admin');
    }

})

hunterDetail.component('Pager',Pager);
module.exports=hunterDetail;