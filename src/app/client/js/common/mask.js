var Component = require('../base/component.js');
var template = require('./mask.html');

var Mask = Component.extend({
	template: template,
	config: function(data){
        
	},
	init: function(){
		
	},
	close: function(result) {
        this.destroy();
    }
});
module.exports = Mask;
