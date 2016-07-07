/**
 * auther : ouyang
 * date : 2016-3-16
 * content : 关于我们
 */
seajs.config({
    // 别名配置
    alias: {
    	'headback' : 'dist/module/head/head-back.js'
    }
});
define(function(require, exports, module) {
    require("headback");
    require("footer");
    var teamModel = avalon.define("teamCtrl",function(vm) {
	    vm.teamList = [];
	    vm.baseUrl = apiconfig.baseapiurl;
	    vm.getTeamList = function(callback) {
	        $.get(vm.baseUrl + "official_site/member!queryAll.action",{type:1,needContent:0},
	        function(data) {
	            callback(data)
	        })
	    }
	});
	$(function(){
		teamModel.getTeamList(function(data){
			if("000000" === data.errorCode){
	        	teamModel.teamList =  data.list;
	     	}
	     	$(".teampersonimg").each(function(dom){
	     		var $this = $(this);
	     		$this.css("background-image","url("+teamModel.baseUrl+$this.data("imgurl")+")");
	     	})
		});
	})
});