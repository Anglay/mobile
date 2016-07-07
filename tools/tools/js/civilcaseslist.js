var civilcaseslistModel = avalon.define("civilcaseslistCtrl",function(vm){
	vm.title = LinkLawsCmn.getUrlParam("title");
	vm.caseType = LinkLawsCmn.getUrlParam("caseType");
	vm.parentid = LinkLawsCmn.getUrlParam("parentid");
	vm.page = 1;
	vm.civilcaseslist = [];
	vm.isshow = true;
	vm.loadtext="加载更多";
	vm.total="";
	vm.totalpages = "";
	vm.isSearch = false;
	vm.keywords = "";
	vm.error = "";
	vm.showSearch = function(){
		vm.isSearch = true;
	};
	vm.hideSearch = function(){
		vm.isSearch = false;
	}
	vm.search = function(){
		if (vm.keywords == "") {
			vm.error = "请输入关键字搜索！"
		}else{
			window.location.href="searchlist.html?keywords="+vm.keywords+"&caseType="+vm.caseType+"&parentid="+vm.parentid;
		};
		setTimeout(function(){
			vm.error = ""
		},1500);
	};
	vm.loadData=function(){
		vm.loadtext="<i class='am-icon-spinner am-icon-spin'></i>加载中";
		if (vm.page<vm.totalpages) {
			vm.page = vm.page +1;
			vm.getCrimList();
		};
	};
	vm.getCrimList = function(){
		$.ajax({
			url:LinkLawsCmn.root2+"tools/toolcase!jsonlist.action",
			type:"post",
			dataType:"json",
			data:{caseType:civilcaseslistModel.caseType,parentid:civilcaseslistModel.parentid,page:vm.page,rows:15},
			async:false,
			success:function(data){
				vm.loadtext="加载更多";
				vm.isshow = false;
				vm.total = data.total;
				vm.totalpages = data.totalpages;
				if(data.rows.length>0){
					$.each(data.rows,function(index){
						vm.civilcaseslist.push(data.rows[index]);
					})
				}
				
			}
		});
	}
});
civilcaseslistModel.getCrimList();
$(function(){
	$("#search").bind("focus",function(){
		$(".fixed-header").css({"position":"absolute","top":"-49px"});
	});
	$("#search").bind("blur",function(){
		$(".fixed-header").css({"position":"fixed","top":"0px"});
	});
	$("#search").bind('keydown', function (e) {
		var key = e.which;
		if (key == 13) {
			e.preventDefault();
			var key = e.which;
			if (civilcaseslistModel.keywords == "") {
				civilcaseslistModel.error = "请输入关键字搜索！"
			}else{
				window.location.href="searchlist.html?keywords="+civilcaseslistModel.keywords+"&caseType="+civilcaseslistModel.caseType+"&parentid="+civilcaseslistModel.parentid;
			};
			setTimeout(function(){
				civilcaseslistModel.error = ""
			},1500);
		}
	});
});