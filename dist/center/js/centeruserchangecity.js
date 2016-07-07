/**
 * auther : ouyang
 * date : 2016-4-11
 * content : 修改城市
 */
seajs.config({
    // 别名配置
    alias: {
    	'headback' : 'dist/module/head/head-back.js'
    }
});
define(function(require, exports, module) {
    var header = require("headback");
    require("layercss");
    require("layer");
    require("footer");
    var userModel = avalon.define("userCtrl",function(vm){
    	if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id;
            vm.city_name = header.user.city_name;
        }else{
            window.history.back();
        };
        vm.showLayer = function(){
        	$("#city-layer").fadeIn();
        };
        vm.hideLyer = function(){
        	$("#city-layer").fadeOut();
        };
        vm.provList = [];
        vm.cityList = [];
        vm.isFirst = true;
        vm.province_id = "";
        vm.city_id = "";
        vm.getProv = function(){
            $.get(apiconfig.baseapiurl+"common/area!getProvinceAll.action",function(data){
                if (data.errorCode == "000000") {
                    vm.provList = data.list;
                    if (vm.isFirst) {
                        vm.province_id = data.list[0].province_id;
                    	vm.getCitys(data.list[0].province_id);
                    	vm.isFirst = false;
                    };
                };
            },"json");
        };
        vm.checkProv = function(dom,id){
            vm.province_id = id;
            vm.getCitys(id);
        };
        vm.getCitys = function(id){
            $.get(apiconfig.baseapiurl+"common/area!getCitysByProvince.action?province_id="+id,function(data){
                if (data.errorCode == "000000") {
                    vm.cityList = data.list;
                };
            },"json");
        };
        vm.checkCity = function(dom,id,name){
            vm.city_id = id;
        	$("#city-layer").fadeOut();
            console.log(vm.province_id+"--->"+vm.city_id);
            var loading = layer.open({type: 2,shadeClose:false});
            $.ajax({
                url : apiconfig.baseapiurl+"base/user!update_user_data.action",
                type : "post",
                dataType : "json",
                data : {
                    uid : vm.user_id,
                    province_id : vm.province_id,
                    city_id : vm.city_id,
                    role : vm.role
                },
                success : function(data){
                    layer.close(loading);
                    if (data.errorCode=="000000") {
                        vm.city_name = name;
                        if (data.flag) {
                            if (localData.init()) {
                                header.user.city_name = name;
                                localData.setJson('user',header.user);
                                window.history.back();
                            };
                        }else{
                            vm.errorMsg = "网络泡妞去了，请再试！";
                        };
                    }else{
                        vm.errorMsg = "网络泡妞去了，请再试！";
                    };
                }
            })
        };
    });
	$(function(){
		userModel.getProv();
	})
});