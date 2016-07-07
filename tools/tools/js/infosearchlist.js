var infosearchlistModel = avalon.define("infosearchlistCtrl", function(vm){
	vm.isshow=true;
	vm.listArr={};
	vm.openWin = function(url){
		window.open(url,"newwindow", "fullscreen=no");  
	};
});

var id=LinkLawsCmn.getUrlParam("id");
if (id!="") {
	$.ajax({
		url:LinkLawsCmn.root2+"app/mobile/tools/control/infoSearchData.json",
		type:"post",
		dataType:"json",
		async:false,
		success:function(data){
			var listArr = data.data;
			$.each(listArr,function(index){
				if (id==listArr[index].id) {
					infosearchlistModel.listArr = listArr[index];
				}
			});
			infosearchlistModel.isshow=false;
		}
	});
}
