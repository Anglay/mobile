var officelistModel = avalon.define("officelistCtrl", function(vm){
	vm.title = LinkLawsCmn.getUrlParam("title");
	vm.judtype = LinkLawsCmn.getUrlParam("judtype");
	vm.address = LinkLawsCmn.getUrlParam("keywords");
	vm.isshow=true;
	vm.loadtext="加载更多";
	vm.page=1;
	vm.totalpages="";
	vm.isSearch = false;
	vm.keywords = "";
	vm.error = "";
	vm.officelistArr=[];
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
			vm.officelistArr=[];
			vm.address = vm.keywords;
			vm.officeSearch();
		};
		setTimeout(function(){
			vm.error = ""
		},1500);
	};
	vm.loadData=function(){
		vm.loadtext="<i class='am-icon-spinner am-icon-spin'></i>加载中";
		if (vm.page<=vm.totalpages) {
			vm.page=vm.page+1;
			setTimeout(function(){
				vm.officeSearch();
			},500);
		}
	};
	vm.myoption = function(orgname,ptype,id){
		console.log(orgname+"-----"+ptype+"-----"+id);
	};
	vm.officeSearch = function(){
		$.ajax({
			url:LinkLawsCmn.root2+"tools/tooljudiciary!jsonlist.action",
			type:"get",
			dataType:"json",
			data:{judtype:vm.judtype,address:vm.address,rows:10,page:vm.page},
			async:false,
			success:function(data){
				vm.isSearch = false;
				vm.isshow = false;
				vm.loadtext = "加载更多";
				vm.totalpages = data.totalpages;
				if(data.rows.length>0){
					$.each(data.rows,function(index){
						vm.officelistArr.push(data.rows[index]);
					});
				}
			}
		});
	}
});
officelistModel.officeSearch();
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
			if (officelistModel.keywords == "") {
				officelistModel.error = "请输入关键字搜索！"
			}else{
				officelistModel.officelistArr=[];
				officelistModel.address = officelistModel.keywords;
				officelistModel.officeSearch();
			};
			setTimeout(function(){
				officelistModel.error = ""
			},1500);
		}
	});
});