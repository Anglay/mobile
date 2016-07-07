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
        vm.serviceChildNavList = [];
        vm.serviceType = "HT";
        vm.id=common.getUrlParam("id");
        vm._id = "";
        vm.getNavList = function(){
            $.get(apiconfig.baseapiurl+"store/product/product!queryForPage.action?parent_id=0",function(data){
                if (data.errorCode=="000000") {
                    vm.serviceNavList = data.list;
                    $.get(apiconfig.baseapiurl+"store/product/product!queryForPage.action?parent_id="+vm.id,function(data){
                        if (data.errorCode=="000000") {
                            vm.serviceChildNavList = data.list;
                            vm._id = data.list[0].id;
                            vm.getDetail(vm._id);
                        };
                    },"json");
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
        vm.checkPaperType = function(dom,id){
            vm._id = id;
            vm.getDetail(id);
    		$(dom).addClass("active").siblings("a").removeClass("active");
    	};
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
                    var params = "?id="+vm._id+"&discription="+vm.discription;
                    window.location.href = apiconfig.baseUrl+"service/servicepay.html"+params;
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