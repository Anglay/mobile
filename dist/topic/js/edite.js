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
    var topicediteModel = avalon.define("topicediteCtrl",function(vm){
    	vm.typeList = [{id:"1",text:"同行合作"},{id:"2",text:"业务合作"},{id:"3",text:"法律咨询"},{id:"4",text:"其他"}];
    	vm.user_id = header.user.id;
        vm.paramscode = "";
    	vm.errorMsg = "";
    	vm.doType = function(dom,id){
			vm.paramscode = id;
			$(dom).addClass("active").siblings().removeClass("active");
    	};
    	vm.title = "";
    	vm.num = ""
    	vm.$watch("title",function(a){
    		if (a.length<=30) {
    			vm.num = 30-a.length;
    		}else{
    			vm.num = 0;
    			vm.title=a.substring(0,30)
    		};
    	});
    	vm.content = "";
    	vm.doSend = function(){
    		vm.errorMsg = "";
    		if (vm.paramscode=="") {
    			vm.errorMsg = "话题类型不能为空！";
    		}else if($.trim(vm.title)==""){
    			vm.errorMsg = "话题标题不能为空！";
    		}else if($.trim(vm.content)==""){
    			vm.errorMsg = "话题内容不能为空！";
    		}else{
                var loading = layer.open({type: 2,shadeClose:false});
                $.ajax({
                    url : apiconfig.baseapiurl+"bbs/topic!save.action",
                    type : "post",
                    dataType : "json",
                    async : false,
                    data : {
                        params_code : vm.paramscode,
                        user_id : vm.user_id,
                        title : vm.title,
                        content : vm.content
                    },
                    success : function(data){
                        layer.close(loading);
                        if (data.errorCode=="000000") {
                            window.location.href="index.html";
                        }else{
                            vm.errorMsg = "发布失败";
                        };
                    }
                })
    		};
    		setTimeout(function(){
    			vm.errorMsg = "";
    		},1500);
    	};
	});
});
