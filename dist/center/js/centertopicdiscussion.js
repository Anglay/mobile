/**
 * auther : ouyang
 * date : 2016-4-1
 * content : 话题讨论
 */
seajs.config({
    // 别名配置
    alias: {
    	'headback' : 'dist/module/head/head-back.js'
    }
});
define(function(require, exports, module) {
    var header = require("headback");
    require("footer");
    avalon.filters.maxString = function(str, args, args2){
        if (str.length>25) {
        	str = str.substr(0, 25)+"...";
        };
        return str;
    }
    var topicDisModel = avalon.define("topicDisCtrl",function(vm){
    	vm.loading = true;
    	if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id;
        }else{
            window.history.back();
        };
    	vm.type=0;
    	vm.page_no = 1;
    	vm.totalpages = 0;
    	vm.loadmorehtml = "加载更多";//<div>加载中...</div>
    	vm.doSwitch = function(dom,type){
    		vm.loading = true;
    		vm.page_no = 1;
    		vm.totalpages = 0;
    		vm.type = type;
    		$(dom).addClass("active").siblings().removeClass("active");
    		if (type==0) {
    			vm.topicList = [];
				vm.getTopicList();
    		}else{
    			vm.discusionList = [];
    			vm.getDiscusionList();
    		};
    	};
    	vm.topicList = [];
    	vm.baseUrl = apiconfig.baseUrl;
    	vm.getTopicList = function(){
    		$.get(apiconfig.baseapiurl+"bbs/topic!queryTopicForPage.action",{
    			page_no : vm.page_no,
    			page_size : 5,
    			user_id : vm.user_id,
    			ispersonal : 1
    		},function(data){
    			if (data.errorCode=="000000") {
    				$.each(data.list,function(index){
    					vm.topicList.push(data.list[index]);
    				});
    			};
    			vm.totalpages = data.totalPage;
    			vm.loadmorehtml = "加载更多";
    			vm.loading = false;
    		},"json");
    	};
    	vm.discusionList = [];
    	vm.getDiscusionList = function(){
    		$.get(apiconfig.baseapiurl+"comment/comment!quaryCommentAndApplyPage.action",{
    			type:8,
    			user_id : vm.user_id,
    			page_no :vm.page_no,
    			page_size :5,
    			state : 1
    		},function(data){
    			if (data.errorCode=="000000") {
    				$.each(data.list,function(index){
    					vm.discusionList.push(data.list[index]);
    				});
    			};
    			vm.totalpages = data.totalPage;
    			vm.loadmorehtml = "加载更多";
    			vm.loading = false;
    		},"json");
    	};
    	vm.loadmore = function(){
            vm.loadmorehtml = "<div>加载中...</div>";
            vm.page_no = vm.page_no+1;
            vm.getTopicList();
        };
    });
    $(function(){
    	topicDisModel.getTopicList();
    })
});