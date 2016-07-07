/**
 * auther : ouyang
 * date : 2016-3-21
 * content : 律师详情
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
    var lawerModel = avalon.define("lawerCtrl",function(vm){
		vm.id = common.getUrlParam("lawerId");
		vm.imgHost = apiconfig.baseapiurl;
		vm.loading = true;
		vm.lawerObj = {};
		vm.getDetail = function(){
			$.get(apiconfig.baseapiurl + "lawyer/lawyer!getDetailsData.action?id="+vm.id,function(data){
				if (data.errorCode == "000000") {
					vm.lawerObj = data;
				};
				vm.loading = false;
			},"json");
		}
	});
	lawerModel.getDetail();
});
$(function(){
	$(".app-pannel dl").each(function(index){
		var _this = $(this);
		_this.bind("click",function(){
			/*if (_this.hasClass("open")) {
				_this.removeClass("open");
			}else{
				_this.addClass("open").siblings().removeClass("open");
			};*/
		});
	});
});