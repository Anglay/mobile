var judicialauthorityModel = avalon.define("judicialauthorityCtrl",function(vm){
	vm.judtype = "0";
	vm.title = ["法院","仲裁委员会","公安局","检察院","劳动仲裁委"];
	vm.keywords = "";
	vm.error = "";
	vm.hidelist = false;
	vm.itemHtml = "法院";
	vm.check = function(judtype){
		vm.judtype = judtype;
		vm.itemHtml = vm.title[judtype];
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
		console.log(vm.judtype);
		if(vm.judtype<0 && vm.judtype>3){
			vm.error = "请选择类型！";
		}else if(vm.keywords == ""){
			vm.error = "请输入查询关键字！";
		}else{
			var title = ""
			if (vm.title[vm.judtype] == undefined){
				title = vm.keywords;
			}else{
				title = vm.title[vm.judtype];
			};
			window.location.href="officelist.html?judtype="+vm.judtype+"&title="+title+"&keywords="+vm.keywords;
		}
		setTimeout(function(){
			vm.error = "";
		},1500);
	};
});
$(function(){
	$("#search").bind('keydown', function (e) {
		var key = e.which;
		if (key == 13) {
			e.preventDefault();
			if(judicialauthorityModel.judtype<0 && judicialauthorityModel.judtype>3){
				judicialauthorityModel.error = "请选择类型！";
			}else if(judicialauthorityModel.keywords == ""){
				judicialauthorityModel.error = "请输入查询关键字！";
			}else{
				window.location.href="officelist.html?judtype="+judicialauthorityModel.judtype+"&title="+judicialauthorityModel.title[judicialauthorityModel.judtype]+"&keywords="+judicialauthorityModel.keywords;
			}
			setTimeout(function(){
				judicialauthorityModel.error = "";
			},1500);
		}
	});
})