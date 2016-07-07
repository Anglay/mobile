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
    var header = require("headback");
    require("layercss");
    require("layer");
    require("footer");
    
    avalon.filters.date10String = function(str, args, args2){
        ss = str.substr(0, 10);
        return ss;
    }
    var _btn = $("#nav-edite");
    var activedetailModel = avalon.define("activedetailCtrl",function(vm){
		vm.baseUrl = "http://192.168.1.105/code/web/linklaws/mobile/";
		vm.id = common.getUrlParam("id");
		if (header.user!=''&&header.user!=null&&header.user!==undefined) {
			vm.user_id = header.user.id
		}else{
			vm.user_id = "";
			_btn.addClass("icon-ucollect")
		};
		vm.loading = true;
		vm.imghost = apiconfig.baseapiurl;
		vm.obj = {};
		vm.getdetail = function(){
			$.get(apiconfig.baseapiurl+"bbs/active!queryDetail.action",{
				id:vm.id
			},function(data){
				if (data.errorCode == "000000") {
					vm.obj = data.detail;
					vm.isFavorite();
				};
			},"json");
			vm.loading = false;
		};
		vm.doCollect = function(){
			$.ajax({
				url : apiconfig.baseapiurl+"favorite/favorite!addOrCancel.action",
				type : "post",
				dataType : "json",
				data : {
					type : "5",
					user_id  : vm.user_id,
					refer_id : activedetailModel.id
				},
				success : function(data){
					if (data.errorCode=="000000") {
						vm.isFavorite();
					};
				}
			});
		};
		vm.favorite = false;
		vm.isFavorite = function(){
			if (vm.user_id!="") {
				$.get(apiconfig.baseapiurl+"favorite/favorite!isFavorite.action",{
					type : "5",
					user_id : vm.user_id,
					refer_id  : vm.id
				},function(data){
					if (data.errorCode=="000000") {
						vm.favorite = data.isFavorite;
						if (vm.favorite) {
							_btn.addClass("icon-collect").removeClass("icon-ucollect");
						}else{
							_btn.addClass("icon-ucollect").removeClass("icon-collect");
						};
					};
				});
			};

		}
	});
	activedetailModel.getdetail();
	_btn.bind("click",function(){
		if (activedetailModel.user_id=="") {
			window.location.href = "../logReg/login.html?turl="+header.turl;
		}else{
			activedetailModel.doCollect();
		};
	});
    
});
