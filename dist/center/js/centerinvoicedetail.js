/**
 * auther : ouyang
 * date : 2016-4-1
 * content : 发票详情
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
    var invoiceModel = avalon.define("invoiceCtrl",function(vm){
    	if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id;
        }else{
            window.history.back();
        };
    	vm.loading = true;
        vm.id = common.getUrlParam("id");
        vm.detail = {};
        vm.orderList = [];
        vm.getDetail = function(){
            $.get(apiconfig.baseapiurl + "store/invoice/invoice!getDetail.action?id="+vm.id+"&user_id="+vm.user_id,function(data){
                if (data.errorCode=="000000") {
                    vm.detail = data.result;
                    vm.orderList = data.result.list;
                };
                vm.loading = false;
            },"json");
        }
    });
    $(function(){
        invoiceModel.getDetail();
    })
});