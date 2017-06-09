var Promise = require('bluebird');
var Component = require('../base/component.js');
var cacheService  = require('./../service.js');

var Login = Component.extend({
	config:function () {
		this.supr()
	},
	init:function () {
		Promise.then(function () {
	    	return [this.login(),this.login()]
	    })
	},
	login:function () {
		cacheService.login(null,function (data,result) {
			console.log(data);
		})
	},
	get:function () {
		cacheService.getPaymentList(null,function (data,result) {
			console.log(data);
		})
	}
});

module.exports = Login;