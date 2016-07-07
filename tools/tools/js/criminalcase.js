var criminalcaseModel = avalon.define("criminalcaseCtrl",function(vm){
	vm.keywords = "";
	vm.error = "";
	vm.search = function(){
		if (vm.keywords=="纠纷"||vm.keywords.length<2) {
			vm.error = "请输入更多信息查询！"
		}else{
			window.location.href="searchlist.html?keywords="+vm.keywords+"&caseType=1";
		};
		setTimeout(function(){
			vm.error = "";
		},1500);
	};
	vm.searchCivil = function(parentid,title,fromId){
		window.location.href="criminalcaselist.html?caseType=1&parentid="+parentid+"&title="+title+"&fromId="+fromId;
	}
});
$(function(){
	$("#search").bind('keydown', function (e) {
		var key = e.which;
		if (key == 13) {
			e.preventDefault();
			var key = e.which;
			if (criminalcaseModel.keywords=="纠纷"||criminalcaseModel.keywords.length<2) {
				criminalcaseModel.error = "请输入更多信息查询！"
			}else{
				window.location.href="searchlist.html?keywords="+criminalcaseModel.keywords+"&caseType=1";
			};
			setTimeout(function(){
				criminalcaseModel.error = "";
			},1500);
		}
	});
});