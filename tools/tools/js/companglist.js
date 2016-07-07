var companglistModel = avalon.define("companglistCtrl", function(vm){
	vm.keywords = localData.get("keywords");
	vm.isshow = true;
	vm.loadtext = "加载更多";
	vm.currentpage = 0;
	vm.total = "";
	vm.companglistArr = [];
	vm.keyword = "";
	vm.isSearch = false;
	vm.keyword = "";
	vm.error = "";
	vm.showSearch = function(){
		vm.isSearch = true;
	};
	vm.hideSearch = function(){
		vm.isSearch = false;
	}
	vm.search = function(){
		if (vm.keyword == "") {
			vm.error = "请输入关键字搜索！"
		}else{
			vm.isshow = true;
			vm.currentpage = 0;
			vm.keywords = vm.keyword;
			localData.set("keywords",vm.keyword);
			vm.companglistArr = [];
			vm.getData();
		};
		setTimeout(function(){
			vm.error = ""
		},1500);
	};
	vm.loadData=function(){
		vm.loadtext="<i class='am-icon-spinner am-icon-spin'></i>加载中";
		if (vm.currentpage<=vm.total) {
			setTimeout(function(){
				vm.getData();
			},500);
		}else{
			setTimeout(function(){
				$(".load-btn").hide();
			},500);
		}
	};
	vm.getData = function(){
		if(0==vm.currentpage){
			vm.companglistArr=[];
			vm.currentpage = 0;
		}else{
			vm.currentpage = vm.currentpage+15;
		} 
		$.ajax({
			url:thirdDataUrl.qixinSearchListUrl,
			dataType:"json",
			contentType: 'application/Json',
			data:{keyword:vm.keywords,skip:vm.currentpage,appkey:"49C0AB19F17342E3AC3F3AE349BB416B"},
			async:true,
			success:function(data){
				vm.isSearch = false;
				if(data.data!='null'){
					var arr = data.data.items;
					vm.isshow=false;
					vm.loadtext="加载更多";
					vm.companglist=data.data;
					$.each(arr,function(index){
						vm.companglistArr.push(arr[index]);
					});
					vm.total = data.data.total
				}else{
					window.history.back();
				}
			}
		});
	};
	vm.linktodetail=function(id){
		window.location.href="compangdetail.html?&id="+id;
	};
});
companglistModel.getData();
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
			if (companglistModel.keyword == "") {
				companglistModel.error = "请输入关键字搜索！"
			}else{
				companglistModel.isshow = true;
				companglistModel.currentpage = 0;
				companglistModel.keywords = companglistModel.keyword;
				localData.set("keywords",companglistModel.keyword);
				companglistModel.companglistArr = [];
				companglistModel.getData();
			};
			setTimeout(function(){
				companglistModel.error = ""
			},1500);
		}
	});
});