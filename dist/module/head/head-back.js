/*
 * name : ouyang
 * date : 2016-3-16
 * content:头部js
 */
 define(function(require, exports, module) {
 	require("common");
 	require("avalon");
	var headerModel = avalon.define("headerCtrl",function(vm){
		vm.v = eval(+(new Date));
		vm.baseUrl = apiconfig.baseUrl;
		vm.headerUrl = vm.baseUrl + "common/header-back.html?_="+vm.v;
		vm.log = common.getUrlParam("log");
		vm.back = function(){
			if (vm.log!=''&&vm.log!=null&&vm.log!=undefined) {
				history.go(-3);
			}else{
				history.back();
			};
		};
	});
	var _user = localData.getJson("user");
	var _thisUrl = encodeURIComponent(window.location.href);//获取当前url
	exports.user = _user;
	exports.turl = _thisUrl;
});