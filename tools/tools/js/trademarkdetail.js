var trademarkModel = avalon.define("trademarkCtrl", function(vm){
	vm.regNo = LinkLawsCmn.getUrlParam("regNo");
	vm.intCls = LinkLawsCmn.getUrlParam("intCls");
	vm.detail = {};
	vm.getdetail = function(){
		$.ajax({
			url:"http://api.linklaws.com/tool/trademark!trademarkDetail.action",
			type:"get",
			dataType:"json",
			data:{regNo:vm.regNo,intCls:vm.intCls},
			async:true,
			success:function(data){
				if (data.error_code=="000000") {
					vm.detail = data.result.data;
				};
			}
		});
	}
});
trademarkModel.getdetail();