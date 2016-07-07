/**
 * auther : ouyang
 * date : 2016-4-1
 * content : 我的发票
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
        vm.baseData = {};
        vm.getBase = function(){
            $.get(apiconfig.baseapiurl + "store/invoice/invoice!countAndSum.action?user_id="+vm.user_id,function(data){
                if (data.errorCode=="000000") {
                    vm.baseData = data;
                };
                vm.getList();
            },"json");
        };
        vm.page_no = 1;
        vm.list = [];
        vm.getList = function(){
            $.get(apiconfig.baseapiurl + "store/invoice/invoice!queryForPage.action?user_id="+vm.user_id,function(data){
                if (data.errorCode=="000000") {
                    $.each(data.list,function(index){
                        vm.list.push(data.list[index]);
                    })
                };
                vm.loading = false;
            },"json");
        };
    	
    });
    $(function(){
        invoiceModel.getBase();
    })
});