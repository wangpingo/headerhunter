var Component = require('../base/component.js');
var _ = require('../base/util.js');

var pager = require('./pager.js');

var ListComponent = Component.extend({
    watchedAttr: ['current'],
    service: null,
    config: function() {
        _.extend(this.data, {
            current: 1,
            total: 1,
            limit: 30,
            list: [],
            checkAll: false,
            sortBy: '',
            orderBy: ''
        });

        this.$watch(this.watchedAttr, function(newv, oldv) {
            if(this.shouldUpdateList()&&this.isInit) this.getList();
        });
    },
    init: function() {
        this.isInit = true;

        // 需要自定义复杂的更新策略, $emit('updatelist')事件即可
        this.$on('updatelist', this.getList.bind(this));
    },
    // @子类修改
    shouldUpdateList: function(data){
        return true;
    },
    // @子类修改
    getExtraParam: function(data){
        return {}
    },
    getListParam: function(){
        var data = this.data;
        return _.extend({
            limit: data.limit,
            offset: data.limit*(data.current - 1) ,
            hasTotal: true,
            order: data.sortBy ? data.sortBy + ' ' + data.orderBy : ''
        }, this.getExtraParam(data), true);
    },
    // update loading
    getList: function(){
        this.service.getList(this.getListParam(), this.cbGetList.bind(this));
        this.$update('loading', true);
    },
    cbGetList: function(result) {
        var result = result.rows ? result : {
            count: result.length,
            rows: result
        };
        var data = this.data,
                list = result.rows,
                totalPage = result.rows && result.rows.length ? Math.ceil(result.count / this.data.limit) : 1;
        //todo 更新数据，而不是简单的替换
        this.$emit('afterlist', {
            list: list,
            total: totalPage
        });
        this.data.total = result.count;
        this.data.list = list;
        if(data.current > totalPage) {
            data.current = totalPage;
        }
        this.data.checkAll = false;
        this.$update('loading', false);
    },
    checkAll:function(){
        var checkAll = this.data.checkAll;
        this.data.list.forEach(function(item) {
            item.checked = checkAll;
        });
        this.$update();
    },
    refresh: function(reset){
        if(reset) this.data.current = 1;
        this.getList();
    },
    sort:function(field){
        if(this.data.sortBy == field){
            //cur.asc = !cur.asc;
            if(this.data.orderBy == 'asc'){
                this.data.orderBy = 'desc';
            } else {
                this.data.orderBy = 'asc';
            }
        } else {
            this.data.orderBy = 'asc';
            this.data.sortBy = field;
        }
        this.getList();
    }
});
module.exports = ListComponent;