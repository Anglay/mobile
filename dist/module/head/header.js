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
		vm.headerUrl = vm.baseUrl + "common/header.html?_="+vm.v;
		vm.menuList = [
			{id:1,text:"首页",linkto:vm.baseUrl+"index/index.html"},
			{id:2,text:"找律师",linkto:vm.baseUrl+"lawyer/index.html"},
			{id:3,text:"法律服务",linkto:vm.baseUrl+"service/service-DH.html"},
			{id:4,text:"圈子",linkto:vm.baseUrl+"topic/index.html"},
			{id:5,text:"活动",linkto:vm.baseUrl+"active/index.html"},
			{id:6,text:"下载APP",linkto:vm.baseUrl+"down/index.html"},
			{id:7,text:"律所联盟" ,linkto:vm.baseUrl+"alliance/index.html"},
			{id:8,text:"关于我们",linkto:vm.baseUrl+"about/index.html"}
		];
	});
	var _user = localData.getJson("user");
	var userDom = $(".nav-user");
	userDom.find("i").remove();
	//如果登录，则更改导航头像
	if (_user!=""&&_user!=null&&_user!=undefined&&_user.img!="") {
		var img = $("<img src='"+apiconfig.baseapiurl+_user.img+"'/>");
		userDom.append(img);
		console.log(123);
	};
	
	var _thisUrl = encodeURIComponent(window.location.href);//获取当前url
	//点击头像判断，如果登录，则到个人中心，没有则跳转到登录页面，同时将当前url传过去
	userDom.bind("click",function(){
		if (_user!=""&&_user!=null&&_user!=undefined) {
			window.location.href = apiconfig.baseUrl+"center/index.html";
		}else{
			window.location.href = "../logReg/login.html?turl="+_thisUrl;
		}
	});

	exports.user = _user;
	exports.turl = _thisUrl;
});