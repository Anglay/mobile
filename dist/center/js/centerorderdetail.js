/**
 * auther : ouyang
 * date : 2016-4-1
 * content : 订单管理
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
    	vm.loading = true;
        vm.serial_no = common.getUrlParam("serial_no");
        vm.detail = {};
        vm.imgHost = apiconfig.baseapiurl;
    	vm.getDetail = function(){
            $.get(apiconfig.baseapiurl+"store/order/order!getDetail.action",{
                serial_no:vm.serial_no,
                user_id:vm.user_id
            },function(data){
                if (data.errorCode=="000000") {
                    vm.detail = data.result;
                };
                vm.loading = false;
            },"json");
        }
    });
    $(function(){
        orderModel.getDetail();
    })
});