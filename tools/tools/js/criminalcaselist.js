var criminalcaselistModel = avalon.define("criminalcaselistCtrl",function(vm){
	vm.isshow = true;
	vm.title = title = LinkLawsCmn.getUrlParam("title");
	vm.caseType = LinkLawsCmn.getUrlParam("caseType");
	vm.parentid = LinkLawsCmn.getUrlParam("parentid");
	vm.fromId = LinkLawsCmn.getUrlParam("fromId");
	vm.loadtext="加载更多";
	vm.page=1;
	vm.totalpages="";
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
	vm.criminalcaselistArr=[];
	vm.loadData=function(){
		vm.loadtext="<i class='am-icon-spinner am-icon-spin'></i>加载中";
		if (vm.page<=vm.totalpages) {
			vm.page=vm.page+1;
			vm.getcriminalcase();
		}
	};
	vm.getcriminalcase = function(){
		$.ajax({
			url:LinkLawsCmn.root2+"tools/toolcase!jsonlist.action",
			type:"post",
			dataType:"json",
			data:{caseType:criminalcaselistModel.caseType,page:criminalcaselistModel.page,parentid:criminalcaselistModel.parentid,rows:15},
			async:false,
			success:function(data){
				criminalcaselistModel.isshow=false;
				criminalcaselistModel.loadtext="加载更多";
				criminalcaselistModel.totalpages=data.totalpages;
				if (data.rows.length>0) {
					$.each(data.rows,function(index){
						criminalcaselistModel.criminalcaselistArr.push(data.rows[index]);
					});
				};
			}
		});
	}
});

//刑事罪名解析
criminalcaselistModel.getcriminalcase();
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
			if (criminalcaselistModel.keywords == "") {
				criminalcaselistModel.error = "请输入关键字搜索！"
			}else{
				window.location.href="searchlist.html?keywords="+criminalcaselistModel.keywords+"&caseType="+criminalcaselistModel.caseType+"&parentid="+criminalcaselistModel.parentid;
			};
			setTimeout(function(){
				criminalcaselistModel.error = ""
			},1500);
		}
	});
});
