var trademarkModel = avalon.define("trademarkCtrl",function(vm){
	vm.searchType = 4
	vm.keyword = "";
	vm.error = "";
	vm.hidelist = false;
	vm.index = 0;
	vm.html = ["全部","商标名称","注册号","申请人"];
	vm.itemHtml = "全部";
	vm.check = function(index,type){
		vm.searchType=type;
		vm.itemHtml = vm.html[index];
		vm.hidelist = false;
		$(".div-select ul").slideUp("fast");
	};
	vm.swichCheck = function(){
		if(vm.hidelist){
			vm.hidelist = false;
			$(".div-select ul").slideUp("fast");
		}else{
			vm.hidelist = true;
			$(".div-select ul").slideDown("fast");
		}
	};
	vm.search = function(){
		if(vm.keyword == ""){
			vm.error = "请输入商标名/注册号/申请人！";
		}else{
			window.location.href="trademarklist.html?searchType="+vm.searchType+"&keyword="+vm.keyword;
		}
		setTimeout(function(){
			vm.error = "";
		},1500);
	};
});