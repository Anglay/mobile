/*
 * name : ouyang
 * date : 2016-3-16
 * content:头部js
 */
 define(function(require, exports, module) {
 	require("common");
 	require("avalon");
	var footerModel = avalon.define("footerCtrl",function(vm){
		vm.v = eval(+(new Date));
		vm.baseUrl = apiconfig.baseUrl;
		vm.footerUrl = vm.baseUrl+"common/footer.html?_="+vm.v;
		vm.footerList = {
			list1 :[
				{
					text : "新闻动态",
					linkto : vm.baseUrl+"news/index.html"
				},
				{
					text : "团队",
					linkto : vm.baseUrl+"team/index.html"
				},
				{
					text : "加入我们",
					linkto : vm.baseUrl+"join/index.html"
				},
				{
					text : "联系我们",
					linkto : vm.baseUrl+"about/index.html"
				}
			],
			list2 : [
				{
					text : "领络律师",
					linkto : vm.baseUrl+"down/index.html"
				}
				
			],
			list3 : [
				{
					text : "律所联盟",
					linkto : vm.baseUrl+"alliance/index.html"
				}
			]
		};
		vm.copyright = "Copyright ©2015 深圳领络科技有限公司. <small><a href='http://www.miitbeian.gov.cn' target='_blank'>粤ICP备15055192号</a></small>";
		vm.sns = "<a href='javascript:void(0);'><img ms-click='showweixinlayer' src='../images/icon-weixin.png' alt='微信' width='35'></a><a href='http://weibo.com/linklaws'><img src='../images/icon-sina.png' alt='新浪'' width='35'></a>";
		vm.showweixinlayer = function(){
			$(".weixinLayer").show();
		};
		vm.hideweixinlayer = function(){
			$(".weixinLayer").hide();
		};
	});
});