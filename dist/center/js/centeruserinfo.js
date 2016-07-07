/**
 * auther : ouyang
 * date : 2016-4-1
 * content : 个人信息
 */
seajs.config({
    // 别名配置
    alias: {
    	'headback' : 'dist/module/head/head-back.js'
    }
});
define(function(require, exports, module) {
    var header = require("headback");
    require("footer");
    avalon.filters.formatString = function(str, args, args2){
        var strArr = str.split("");
        for (var i = 0; i < strArr.length; i++) {
        	if (i<8&&i>3) {
        		strArr[i] = "*";
        	};
        };
        str = strArr.join("");
        return str;
    }
    var userModel = avalon.define("userCtrl",function(vm){
    	if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id;
            vm.user = header.user;
        }else{
            window.history.back();
        };
    });

});