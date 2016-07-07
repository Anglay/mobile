/**
 * auther : ouyang
 * date : 2016-3-16
 * content : 关于我们
 */
seajs.config({
    // 别名配置
    alias: {
    }
});
define(function(require, exports, module) {
    var header = require("head");
    require("footer");
    var serviceModel = avalon.define("serviceCtrl",function(vm){
        vm.serviceNavList = [];
        vm.serviceType = "DH";
        vm.id=common.getUrlParam("id")||'';
        vm.getNavList = function(){
            $.get(apiconfig.baseapiurl+"store/product/product!queryForPage.action?parent_id="+0,function(data){
                if (data.errorCode=="000000") {
                    vm.serviceNavList = data.list;
                    if (vm.id=="") {
                        $.each(data.list,function(index){
                            if(data.list[index].alias == vm.serviceType){
                                vm.id = data.list[index].id;
                            }
                        });
                    };
                    vm.getDetail(vm.id);
                };
            },"json");
        };
        vm.detail = {};
        vm.getDetail = function(id){
            $.get(apiconfig.baseapiurl+"store/product/product!getDetail.action?id="+id,function(data){
                if (data.errorCode=="000000") {
                    vm.detail = data;
                };
            })
        };
        vm.errorMsg = "";
    	vm.tempUrl = apiconfig.baseUrl+"service/temp.html";
        if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id
        }else{
            vm.user_id = "";
        };
        vm.discription = "";
        vm.doAdvice = function(){
            if (vm.user_id!="") {
                if (vm.discription=='') {
                    vm.errorMsg = "请描述您的问题";
                }else{
                    // var params = "?id="+vm.id+"&discription="+vm.discription;
                    // window.location.href = apiconfig.baseUrl+"service/servicepay.html"+params;
                    $.ajax({
                        url :　apiconfig.baseapiurl+"store/order/order!save.action",
                        type : "post",
                        dataType : "json",
                        async : false,
                        data : {
                            user_id:vm.user_id,
                            product_id:vm.detail.id,
                            quantity:vm.detail.quantity,
                            rstime:vm.time,
                            descr:vm.discription,
                            province_id:vm.province_id,
                            city_id:vm.city_id
                        },
                        success : function(data){
                            if (data.errorCode=="000000") {
                                var params = "?id="+vm.id+"&descr="+vm.discription+"&serial_no="+data.result.serial_no;
                                window.location.href = apiconfig.baseUrl+"service/servicepay.html"+params;
                                // vm.getPayOrder(data.result.serial_no,data.result.descr);
                            }else{
                                
                            };
                        }
                    });
                };
                setTimeout(function(){
                    vm.errorMsg = "";
                },2000);
            }else{
                window.location.href = "../logReg/login.html?turl="+header.turl;
            }
        };
    });
    $(function(){
        serviceModel.getNavList();
    })

});