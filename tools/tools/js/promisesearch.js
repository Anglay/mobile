var promiseSearchModel = avalon.define("promiseCtrl",function(vm){
	vm.type = "person"
	vm.name = "";
	vm.cardno = "";
	vm.error = "";
	vm.hidelist = false;
	vm.index = 0;
	vm.html = ["个人","企业"];
	vm.pname = ["请输入被执行人姓名","请输入企业名称"];
	vm.pid = ["请输入身份证号","请输入机构营业执照编号"];
	vm.itemHtml = "个人"
	vm.pnameHtml = "请输入被执行人姓名";
	vm.pidHtml = "请输入身份证号";
	vm.check = function(index,type){
		vm.type=type;
		vm.itemHtml = vm.html[index];
		vm.pnameHtml = vm.pname[index];
		vm.pidHtml = vm.pid[index];
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
		var cardid =/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(vm.name == ""){
			if (vm.type=="person") {
				vm.error = "请输入被执行人姓名！";
			}else{
				vm.error = "请输入企业名称！";
			}
		}else if(vm.cardno == ""){
			if (vm.type=="person") {
				vm.error = "请输入身份证号！";
			}else{
				vm.error = "请输入机构营业执照！";
			};
		}else{
			if (vm.type=="person"&!cardid.test(vm.cardno)) {
				vm.error = "请输入正确的身份号！";
			}else{
				window.location.href="promiselist.html?type="+vm.type+"&name="+vm.name+"&cardno="+vm.cardno;
			};
		}
		setTimeout(function(){
			vm.error = "";
		},1500);
	};
});