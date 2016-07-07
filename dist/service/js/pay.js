/**
 * auther : ouyang
 * date : 2016-3-16
 * content : 关于我们
 */
seajs.config({
    // 别名配置
    alias: {
        'headback' : 'dist/module/head/head-back.js',
        'pingpp':'dist/service/js/pingpp.js',
        'base64':'plugIn/base64/Base64.js'
    }
});
define(function(require, exports, module) {
    var header = require("headback");
    require("base64");
    require("footer");
    require("pingpp");
    var serviceModel = avalon.define("serviceCtrl",function(vm){
        vm.errorMsg = "";
        if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id;
        }else{
            window.history.back();
        };
        vm.detail = {};
        vm.getDetail = function(id){
            $.get(apiconfig.baseapiurl+"store/product/product!getDetail.action?id="+id,function(data){
                if (data.errorCode=="000000") {
                    vm.detail = data;
                };
            })
        };
        vm.id=common.getUrlParam("id");
        vm.descr = common.getUrlParam("descr");
        vm.province_id = common.getUrlParam("province_id")||"";
        vm.province_name = common.getUrlParam("province_name")||"";
        vm.city_id = common.getUrlParam("city_id")||"";
        vm.city_name = common.getUrlParam("city_name")||"";
        vm.time=common.getUrlParam("time")||"";
        vm.serial_no = common.getUrlParam("serial_no");
        vm.channel = "";
        vm.checkPayType = function(dom,payType){
            vm.channel = payType;
            $(dom).addClass("active").closest("div.server-pay-list").siblings().find("a.pay-item").removeClass("active");
        };
        //提交订单信息
        doPay = function(){
            if (vm.channel=="") {
                vm.errorMsg = "请选择支付方式";
            }else{
                vm.getPayOrder(vm.serial_no,vm.descr);
            };
            setTimeout(function(){
                vm.errorMsg = "";
            },2000);
        };
        //获取支付凭证
        vm.getPayOrder = function(serial_no,descr){
            $.get(apiconfig.baseapiurl+"transaction/transaction!makeCharge.action",{
                from_id:vm.user_id,
                serial_no:serial_no,
                channel:vm.channel,
                success_url:apiconfig.baseUrl+"service/payresult.html",
                desc:descr
            },function(data){
                if (data.errorCode=="000000") {
                    var charge = data.charge;
                    localData.set("tran_id",data.tran_id);
                    console.log(base64decode(charge));
                    pingpp.createPayment(base64decode(charge), function(result, error){
                        
                    });
                };
            },"json")
        };
        vm.doCancel = function(){
            history.back();
        }
    });
    $(function(){
        if (serviceModel.id!='') {
            serviceModel.getDetail(serviceModel.id);
        };

    })
});