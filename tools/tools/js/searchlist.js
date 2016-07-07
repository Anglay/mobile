var searchlistModel = avalon.define("searchlistCtrl",function(vm){
	vm.title = LinkLawsCmn.getUrlParam("keywords");
	vm.parentid = LinkLawsCmn.getUrlParam("parentid")||"";
	vm.caseType = LinkLawsCmn.getUrlParam("caseType");
	vm.isshow = true;
	vm.searchdataArr = [];
	vm.page = 1;
	vm.totalpages = "";
	vm.loadtext="加载更多";
	vm.loadData=function(){
		if (vm.page<vm.totalpages) {
			vm.loadtext="<i class='am-icon-spinner am-icon-spin'></i>加载中";
			vm.page = vm.page +1;
			vm.getSearchList();
		};
	};
	vm.getSearchList = function(){
		$.ajax({
			url:LinkLawsCmn.root2+"tools/toolcase!getCaseLawSearchJson.action",
			type:"get",
			dataType:"json",
			data:{caseType:vm.caseType,casename:vm.title,parentid:vm.parentid,page:vm.page,rows:"15"},
			async:true,
			success:function(data){
				vm.loadtext="加载更多";
				vm.isshow = false;
				vm.totalpages = data.totalpages;
				if (vm.searchdataArr.length>0) {
					var pid = vm.searchdataArr[vm.searchdataArr.length-1].parentT.id;
				};
				$.each(data.rows,function(index){
					if (pid!=undefined) {
						if (pid==data.rows[index].parentT.id) {
							$.each(data.rows[index].childTS,function(i){
								vm.searchdataArr[vm.searchdataArr.length-1].childTS.push(data.rows[index].childTS[i]);
							})
						}else{
							vm.searchdataArr.push(data.rows[index]);
						};
					}else{
						vm.searchdataArr.push(data.rows[index]);
					};
				})
				
			}
		});
	}
});
searchlistModel.getSearchList();