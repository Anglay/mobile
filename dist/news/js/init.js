/**
 * auther : ouyang
 * date : 2016-3-21
 * content : 新闻动态
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
    var newsModel = avalon.define("newsCtrl",function(vm){
    	vm.isShow = true;
    	vm.newsArr = [];
		vm.type = common.getUrlParam("type")||1;
		vm.pageno = 1;
		vm.pagesize = 9;
		vm.newsArr = [];
		vm.pagetotal = "";
		vm.baseUrl = apiconfig.baseapiurl;
		vm.getNews = function(){
			vm.newsArr = [];
			$.ajax({
				url : vm.baseUrl + "official_site/newstends!queryForPage.action",
				type : "get",
				dataType : "json",
				data : {type : vm.type,page_no:vm.pageno,page_size:vm.pagesize},
				success : function(data){
					if (data.errorCode=="000000") {
						$.each(data.list,function(index){
							vm.newsArr.push(data.list[index]);
						});
						vm.pagetotal = data.totalPage;
					};
					vm.isShow = false;
				}
			});
		};
		vm.doPrev = function(){
			if (vm.pageno==1) {
				return false
			}else{
				vm.pageno = vm.pageno -1;
				vm.getNews();
			};

		};
		vm.doNext = function(){
			if (vm.pageno==vm.pagetotal) {
				return false
			}else{
				vm.pageno = vm.pageno +1;
				vm.getNews();
			}
		};
		vm.filter = function(dom,type){
			vm.isShow = true;
			$(dom).addClass("active").siblings().removeClass("active");
			vm.pageno = 1;
			vm.pagesize = 9;
			vm.type = type;
			vm.getNews();
		}
    });
	newsModel.getNews();
	$(function(){
		$(".navbar-item li").each(function(index){
			if ($(this).attr("lang")==newsModel.type) {
				$(this).addClass("active").siblings().removeClass("active");
			};
		})
	});
});