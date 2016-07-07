var apiconfig = {
	baseapiurl: "http://14.215.113.168:8084/api_ssh/",//"",
	baseUrl : "http://192.168.1.112/code/mobile/",//"http://14.215.113.168:8084/api_ssh/linklaws/mobile/",
}

/*var apiconfig = {
	baseapiurl: "http://api.linklaws.com/",
	baseUrl : "http://www.linklaws.com/mobile/",
}*/
/*公用*/
var common = {
	//获取url参数
	getUrlParam: function (name){
		var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
		if (reg.test(location.search)) {
			return decodeURIComponent(RegExp.$2.replace(/\+/g, " "));
		} else {
			return "";
		}
	},
	ischeckmobile: function(value) {
        if (typeof value == "string" && value != '') {
            var length = value.length;
            var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
            return (length == 11 && mobile.test(value))
        }
    },
	isWap: function() {
		var userAgentInfo = navigator.userAgent;
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break
			}
		}
		return flag
	}
}
/**
 * 本地存储
 */
var localData = {
	init : function(){
		var flag = true;
		if (!window.localStorage) {
			alert("不支持本地存储");
			flag = false;
		}
		return flag;
	},
	set : function(key,value){
		localStorage.setItem(key, value);
	},
	get : function(key){
		return localStorage.getItem(key);
	},
	//存储json对象
	setJson : function(key,jsonObj){
		localStorage.setItem(key,JSON.stringify(jsonObj));
	},
	//返回对象
	getJson : function(key){
		return JSON.parse(localStorage.getItem(key));
	},
	//获取所有存储数据，返回对象
	getAll : function(){
		var len = localStorage.length;
		if (len>=1) {
			var keyStr,obj={};
			for (var i = 0; i < len; i++) {
				kerStr = localStorage.key(i);
				obj[keyStr] = localStorage[keyStr];
			}
			return obj;
		}
	},
	//移除一对键值
	remove : function(key){
		if (localStorage.get(key)) {
			localStorage.removeItem(key);
		}
	},
	//清楚所有存储数据
	clear : function(){
		localStorage.clear();
	}
}
$(function(){
	if (common.isWap()) {
		//window.location.href="http://www.linklaws.com";
	}
})