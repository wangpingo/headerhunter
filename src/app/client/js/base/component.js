'use strict';

var Regular = require('regularjs');
var filter = require('./filter.js');
var path = require('path');

var dom = Regular.dom; 

var Component = Regular.extend({
	// request
	$request: function(){},

    $login:function () {

    }
})
.filter(filter)
.directive({
    // if expression evaluated to true then addClass z-crt.
    // otherwise, remove it
    // <li z-crt={this.$state.current.name==='app.test.exam.choice'}>
    'z-crt': function(elem, value){
        this.$watch(value, function(val){
            dom[val? 'addClass': 'delClass'](elem, 'z-crt');
        })
    },
    'q-render': function(elem, value){
        this.$watch(value, function(val){
            if(val) elem.innerHTML = qs.render(val)
        })
    },
    'r-autofocus': function(elem, value){
        setTimeout(function() {
            elem.focus();
        }, 0);
    },
    'r-scroll': function(elem, value) {
        this.$watch(value, function(newValue) {
            if(newValue && elem) {
                var grid_db = elem.parentElement.parentElement.parentElement;
                grid_db.scrollTop = elem.offsetTop;
            }
        });
    },
    'r-href': function(elem, value) {
        this.$watch(value, function(newValue) {
            var hash = location.href.split('#');
            hash = hash[1] || '';
            dom.attr(elem, 'href', '#' + path.join(hash, newValue + ''));
        });
    }
})
.event('enter', function(elem, fire){

    function update(ev){
        if(ev.which == 13){ // ENTER key
            ev.preventDefault();
            fire(ev); // if key is enter , we fire the event;
        }
    }
    dom.on(elem, "keypress", update);
    return function destroy(){ // return a destroy function
        dom.off(elem, "keypress", update);
    }
});

module.exports = Component;