var civilvasesModel = avalon.define("civilvasesCtrl",function(vm){
	vm.keywords = "";
	vm.error = "";
	vm.search = function(){
		if (vm.keywords=="纠纷"||vm.keywords.length<2) {
			vm.error = "请输入更多信息查询！"
		}else{
			window.location.href="searchlist.html?keywords="+vm.keywords+"&caseType=0";
		};
		setTimeout(function(){
			vm.error = "";
		},1500);
	};
	vm.searchCivil = function(parentid,title){
		window.location.href="civilcaseslist.html?caseType=0&parentid="+parentid+"&title="+title;
	}
});
$(function(){
	var ch= $(window).height() - $(".am-header").height() - $(".am-search").height();
	$(".app-list-left div.app-height-16").height(ch/3);
	$(".app-list-right div.app-height-12").height(ch/4);
	$("#search").bind('keydown', function (e) {
		var key = e.which;
		if (key == 13) {
			e.preventDefault();
			if (civilvasesModel.keywords=="纠纷"||civilvasesModel.keywords.length<2) {
				civilvasesModel.error = "请输入更多信息查询！"
			}else{
				window.location.href="searchlist.html?keywords="+civilvasesModel.keywords+"&caseType=0";
			};
			setTimeout(function(){
				civilvasesModel.error = "";
			},1500);
		}
	});
});