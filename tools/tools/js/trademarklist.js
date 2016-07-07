var trademarkModel = avalon.define("trademarkCtrl", function(vm){
	vm.searchType = LinkLawsCmn.getUrlParam("searchType");
	vm.keyword = LinkLawsCmn.getUrlParam("keyword");
	vm.isshow=true;
	vm.loadtext="加载更多";
	vm.pageNo=1;
	vm.totalpages="";
	vm.listArr=[];
	vm.loadData=function(){
		vm.loadtext="<i class='am-icon-spinner am-icon-spin'></i>加载中";
		if (vm.pageNo<=vm.totalpages) {
			vm.pageNo=vm.pageNo+1;
			setTimeout(function(){
				vm.getList();
			},500);
		}
	};
	vm.getList = function(){
		$.ajax({
			url:"http://api.linklaws.com/tool/trademark!search.action",
			type:"get",
			dataType:"json",
			data:{searchType:vm.searchType,keyword:vm.keyword,pageSize:5,pageNo:vm.pageNo},
			async:true,
			success:function(data){
				vm.isshow = false;
				vm.loadtext = "加载更多";
				if (data.error_code=="0") {
					$.each(data.result.data,function(index){
						vm.listArr.push(data.result.data[index]);
					});
					vm.totalpages = data.result.data.length;
				}else{
					vm.totalpages = '';
				};
			}
		});
	};
	vm.linkToDetail = function(regNo,intCls){
		window.location.href="trademarkdetail.html?regNo="+regNo+"&intCls="+intCls;
	}
});
trademarkModel.getList();