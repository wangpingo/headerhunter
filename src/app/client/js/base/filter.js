'use strict';

var filter = {};

/**
 * <p>{time| format: 'yyyy-MM-dd HH:mm'}</p>
 * @return {[type]} [description]
 */
filter.format = function() {
    function fix(str) {
        str = '' + (String(str) || '');
        return str.length <= 1? '0' + str : str;
    }
    var maps = {
        'yyyy': function(date){return date.getFullYear()},
        'MM': function(date){return fix(date.getMonth() + 1); },
        'dd': function(date){ return fix(date.getDate()) },
        'HH': function(date){return fix(date.getHours()) },
        'mm': function(date){ return fix(date.getMinutes())},
        'ss': function(date){ return fix(date.getSeconds())}
    };

    var trunk = new RegExp(Object.keys(maps).join('|'),'g');

    return function(value, format) {
        if(!value){return '';}

        format = format || 'yyyy-MM-dd HH:mm';
        value = new Date(value);

        return format.replace(trunk, function(capture){
            return maps[capture]? maps[capture](value): '';
        });
    }
}();

filter.total = function(array, key) {
    var total = 0;
    if(!array) return;
    array.forEach(function( item ){
        total += key? item[key] : item;
    });
    return total;
};

filter.filter = function(array, filterFn) {
    if(!array || !array.length) return;
    return array.filter(function(item, index){
        return filterFn(item, index);
    })
};

filter.permission = function(value, permission) {
    if(permission === 'modify')
        return (value>>2)%2;
    else if(permission === 'remove')
        return (value>>3)%2;
    else if(permission === 'recheck')
        return (value>>4)%2;

};

filter.render = function(value, answer){
    return ques.render(value, answer);
};

/**
 * 过滤input 输入 防止脚本注入
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
filter.escape = function(val){

  return (val || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')
};

filter.average = function(array, key){
    array = array || [];
    return array.length? filter.total(array, key)/ array.length : 0;
};

filter.bitand  = function(value, bit){
    return (value||0) & bit;
};

filter.join = function(value,splitor){
    return value.join(splitor || ',');
};
filter.json = function(value){
    return JSON.stringify(value);
};
module.exports = filter;
