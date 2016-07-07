seajs.config({
    // 别名配置
    alias: {
    }
});
define(function(require, exports, module) {
	require("avalon");
	require("common");
	avalon.filters.date10String = function(str, args, args2){
        ss = str.substr(0, 10);
        return ss;
    }
    var shareModel = avalon.define("shareCtrl",function(vm){
    	vm.loading = true;
    	vm.id = common.getUrlParam("id");
    	vm.shareType = common.getUrlParam("type");
    	vm.platform = common.getUrlParam("platform");
    	vm.imgHost = apiconfig.baseapiurl;
    	vm.detail = {};
    	vm.y = "";
    	vm.files_url = [];
    	vm.downUrl = "http://a.app.qq.com/o/simple.jsp?pkgname=org.linklaws.app.android";
    	vm.getDetail = function(id,type){
    		var url = "";
    		if(type == "action"){
    			url = apiconfig.baseapiurl+"bbs/active!queryDetail.action?id="+id;
    		}else if (type == "topic") {
    			url = apiconfig.baseapiurl+"bbs/topic!getDetail.action?id="+id;
    		}else if(type == "lawyer"){
    			url = apiconfig.baseapiurl+"lawyer/lawyer!getDetailsData.action?id="+id;
    		};
    		$.get(url,function(data){
    			if (data.errorCode=="000000") {
    				if (data.files_url!=undefined && $.trim(data.files_url)!='') {
						vm.files_url = data.files_url.split(",");
					}
					if (data.license_no!=undefined && data.sysyear!==undefined && data.sysyear!='' && data.license_no!='') {
						vm.y = data.sysyear-data.license_no.substr(5, 4);
					};
    				vm.detail=data;
    			};
    		},"json");
    		vm.loading = false;
    	}
    });
    $(function(){
    	if (shareModel.shareType!="app") {
    		if (shareModel.id!=""&&shareModel.shareType!="") {
    			shareModel.getDetail(shareModel.id,shareModel.shareType);
    		};
    	}else{
    		shareModel.loading = false;
    	};
    	//不同系统终端下载链接地址处理
    	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		    shareModel.downUrl = "https://itunes.apple.com/cn/app/ling-luo-lu-shi/id1062780668?mt=8";
		} else if (/(Android)/i.test(navigator.userAgent)) {
		    shareModel.downUrl = "http://a.app.qq.com/o/simple.jsp?pkgname=org.linklaws.app.android";
		} else {
			console.log("pc");
		};
    });
});