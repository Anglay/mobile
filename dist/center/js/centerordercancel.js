/**
 * auther : ouyang
 * date : 2016-4-1
 * content : 取消订单
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
    var orderModel = avalon.define("orderCtrl",function(vm){
    	if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id;
        }else{
            window.history.back();
        };
        vm.serial_no = common.getUrlParam("serial_no");
        vm.content = "";
        vm.doCancel = function(){
            $.ajax({
                url : apiconfig.baseapiurl + "transaction/servicetracking!clientCannelOrder.action",
                type : "post",
                dataType : "json",
                data : {serial_no:vm.serial_no,user_id:vm.user_id,content:vm.content},
                success : function(data){
                    if (data.errorCode == "000000") {
                        window.history.back();
                    };
                }
            });
        };
        vm.loading = false;
    });
});