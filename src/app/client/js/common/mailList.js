var Component = require('../base/component.js');
var _ = require('../base/util.js');
var pager = require('./pager.js');

var MailListComponent = Component.extend({
    watchedAttr: ['current'],
    service: null,
    config: function() {
        _.extend(this.data, {
            current: 2,
            total: 1,
            limit: 30,
            Maillist: [],
            checkAll: false,
            sortBy: '',
            orderBy: ''
        });
        this.$watch(this.watchedAttr, function(newv, oldv) {
            console.log('1');
            if(this.shouldUpdateMailList()&&this.isInit) this.getMailList();
        });
    },
    init: function() {
        this.isInit = true;
        // 需要自定义复杂的更新策略, $emit('updateMaillist')事件即可
        console.log("mailList.js->updateMailList");
        this.$on('MailList', this.getMailList.bind(this));
    },
    // @子类修改
    shouldUpdateMailList: function(data){
        return true;
    },

    getMailListParam: function(){
        return {
            pageNumber:this.data.current
        }
    }
});
module.exports = MailListComponent;