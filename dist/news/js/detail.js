/**
 * auther : ouyang
 * date : 2016-3-21
 * content : 动态详情
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
    var detailModel = avalon.define("detailCtrl",function(vm){
    	vm.type = common.getUrlParam("type");
    	vm.id = common.getUrlParam("id");
		vm.detailObj = {};
		vm.isShow = true;
		vm.getDetail = function(){
			if(detailModel.type === "" || detailModel.type === undefined || detailModel.id === "" || detailModel.id === undefined){
				window.location.href = "index.html";
			}else{
				$.ajax({
					url : apiconfig.baseapiurl + "/official_site/newstends!queryDetail.action",
					type : "get",
					dataType : "json",
					data : {id:vm.id},
					success : function(data){
						if (data.errorCode=="000000") {
							vm.detailObj = data.detail;
							document.title = '最新动态-' + data.detail.title;
						};
						vm.isShow = false;
					}
				});
			}
		};
    });
    detailModel.getDetail();
});