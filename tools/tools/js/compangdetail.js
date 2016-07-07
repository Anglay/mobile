var compangdetailModel = avalon.define("compangdetailCtrl", function(vm){
	vm.isshow=true;
	vm.compang={};
	vm.detailInfo={};
	vm.status = true;
	vm.show=function(id){
		if (vm.status) {
			$("#"+id).fadeIn();
			vm.status=false;
		}else{
			$("#"+id).fadeOut();
			vm.status=true;
		}
	};
});
var id=LinkLawsCmn.getUrlParam("id");
if (id!="") {
	$.ajax({
	 	url:thirdDataUrl.qixinGetDetailById,
		dataType: 'json',
		data: {id:id,appkey:"49C0AB19F17342E3AC3F3AE349BB416B"},
		contentType: 'application/Json',
		async: true,
		success: function (result) {
			if(null!=result){
				compangdetailModel.compang=result.data;
				compangdetailModel.isshow=false;
			}			
		}
	});
}else{
	
}
