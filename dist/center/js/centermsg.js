/**
 * auther : ouyang
 * date : 2016-4-1
 * content : 消息中心
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
    var msgModel = avalon.define("msgCtrl",function(vm){
        if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id;
        }else{
            window.history.back();
        };
    	vm.doSwitch = function(dom,type){
    		$(dom).addClass("active").siblings().removeClass("active");
            vm.isread = type;
            vm.getList();
    	};
        vm.isread = 0;
        vm.page_no = 1;
        vm.getList = function(){
            $.get(apiconfig.baseapiurl+"message/message!quaryForPage.action",{
                user_id : vm.user_id,
                module : 1,
                isread : vm.isread,
                page_no : vm.page_no,
                page_size : 5
            },function(data){
                //console.log(data);
            },"json");
        };
    });
    $(function(){
        msgModel.getList();
    })
});