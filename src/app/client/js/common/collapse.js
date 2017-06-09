/**
 * ------------------------------------------------------------
 * Collapse  折叠面板
 * <collapse accordion>
        <panel title="Panel1">Content1</panel>
        <panel title="Panel2">Content2</panel>
        <panel title="Panel3">Content3</panel>
        <panel title="Panel4">Content4</panel>
    </collapse>
 * ------------------------------------------------------------
 */



'use strict';
var Component = require('../base/component.js');
var template = require('./collapse.html');
var _ = require('../base/util.js');

var Panel = require('./panel.js');

/**
 * @class Collapse
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {boolean=false}           options.data.accordion           => 是否每次只展开一个
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var Collapse = Component.extend({
    name: 'collapse',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            panels: [],
            accordion: false
        });
        this.supr();
    }
});

module.exports = Collapse;