var civilcasessublistModel = avalon.define("civilcasessublistCtrl",function(vm){
	vm.parentid = LinkLawsCmn.getUrlParam("id");
	vm.title = LinkLawsCmn.getUrlParam("title");
	vm.isshow = true;
	vm.loadtext = "加载更多";
	vm.page = 1;
	vm.totalpages = "";
	vm.civilcasessublistArr = [];
	vm.loadData=function(){
		vm.page=vm.page+1;
		vm.loadtext="<i class='am-icon-spinner am-icon-spin'></i>加载中";
		if (vm.page<=vm.totalpages) {
			vm.getCrimList();
		}
	};
	vm.getCrimList = function(){
		$.ajax({
			url:LinkLawsCmn.root2+"tools/toolcase!jsonlist.action",
			type:"post",
			dataType:"json",
			data:{caseType:"0",parentid:vm.parentid,page:vm.page,rows:"15"},
			async:false,
			success:function(data){
				vm.isshow=false;
				vm.totalpages=data.totalpages;
				$.each(data.rows,function(index){
					vm.civilcasessublistArr.push(data.rows[index]);
				});
				vm.loadtext="加载更多";
			}
		});
	}
});
civilcasessublistModel.getCrimList();