var promiselistModel = avalon.define("promiselistCtrl", function(vm){
	vm.type = LinkLawsCmn.getUrlParam("type");
	vm.name = LinkLawsCmn.getUrlParam("name");
	vm.cardno = LinkLawsCmn.getUrlParam("cardno");
	vm.isshow=true;
	vm.totalpages="";
	vm.promiselistArr=[];
	vm.getList = function(){
		vm.isshow = false;
		$.ajax({
			url:"http://api.linklaws.com/tool/breachblacklist!search.action",
			type:"get",
			dataType:"json",
			data:{type:vm.type,name:vm.name,cardno:vm.cardno},
			async:false,
			success:function(data){
				vm.isshow = false;
				if(data.errorCode=="000000"){
					if (data.list.code=="0"&data.list.data.length>0) {};
					$.each(data.list.data,function(index){
						vm.promiselistArr.push(data.list.data[index]);
					});
					vm.totalpages = data.list.data.length;
				}else{
					vm.totalpages = "";
				}
			}
		});
	};
	vm.linkToDetail = function(index){
		localData.setJson("person",vm.promiselistArr[index].$model);
		window.location.href="promisedetail.html"
	}
});
promiselistModel.getList();