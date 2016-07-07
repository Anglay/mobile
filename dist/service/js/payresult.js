/**
 * auther : ouyang
 * date : 2016-3-16
 * content : 关于我们
 */
seajs.config({
    // 别名配置
    alias: {
        'headback' : 'dist/module/head/head-back.js',
        'pingpp':'dist/service/js/pingpp.js'
    }
});
define(function(require, exports, module) {
    var header = require("headback");
    require("footer");
    require("pingpp");
    var serviceModel = avalon.define("serviceCtrl",function(vm){
        vm.baseurl = apiconfig.baseUrl;
        if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id;
        }else{
            window.history.back();
        };
        vm.loading = false;
        vm.tran_id = localData.get("tran_id");
        vm.getPayResult = function(){
            $.ajax({
                url : apiconfig.baseapiurl + "transaction/transaction!payResult.action",
                type : "post",
                dataType : "json",
                data : {user_id:vm.user_id,tran_id:vm.tran_id},
                success : function(data){
                    if (data.errorCode == "000000") {
                        vm.getDetail(data.serial_no);
                    };
                }
            });           
        };
        vm.detail = {};
        vm.getDetail = function(serial_no){
            $.get(apiconfig.baseapiurl + "store/order/order!getDetail.action",{
                serial_no : serial_no,
                user_id : vm.user_id
            },function(data){
                if (data.errorCode=="000000") {
                    vm.detail = data.result;
                };
                vm.loading = false;
            },"json");
        }       
    });
    $(function(){
        serviceModel.getPayResult();
    })
});