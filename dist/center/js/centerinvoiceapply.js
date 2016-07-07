/**
 * auther : ouyang
 * date : 2016-4-1
 * content : 发票申请
 */
seajs.config({
    // 别名配置
    alias: {
    	'headback' : 'dist/module/head/head-back.js'
    }
});
define(function(require, exports, module) {
    var header = require("headback");
    require("layercss");
    require("layer");
    require("footer");
    var invoiceModel = avalon.define("invoiceCtrl",function(vm){
    	if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id;
        }else{
            window.history.back();
        };
    	vm.loading = true;
    	vm.invoiceList = [];
    	vm.sum = 0;
    	vm.count = 0;
    	vm.serial_nos = [];
    	vm.getInvoiceList = function(){
    		$.get(apiconfig.baseapiurl+"store/invoice/invoice!queryUninvoicedOrderPage.action?user_id="+vm.user_id,function(data){
    			if (data.errorCode=="000000") {
    				vm.sum = data.sum;
    				vm.count = data.count;
    				vm.invoiceList = data.list;
    			};
    			vm.getProv();
    			vm.loading = false;
    		},"json");
    	};
    	vm.checkOrding = function(dom,obj){
    		if ($(dom).hasClass("check")) {
    			$(dom).removeClass("check");
    			vm.serial_nos.splice($.inArray(obj.serial_no,vm.serial_nos),1);
    		}else{
    			$(dom).addClass("check");
    			vm.serial_nos.push(obj.serial_no);
    		};
    	}
	    vm.showLayer = function(){
	    	$("#city-layer").fadeIn();
	    };
	    vm.hideLyer = function(){
	    	$("#city-layer").fadeOut();
	    };
	    vm.provList = [];
	    vm.cityList = [];
	    vm.isFirst = true;
	    vm.province_id = "";
	    vm.province_name = "";
	    vm.city_id = "";
	    vm.city_name = "";
	    vm.getProv = function(){
	        $.get(apiconfig.baseapiurl+"common/area!getProvinceAll.action",function(data){
	            if (data.errorCode == "000000") {
	                vm.provList = data.list;
	                if (vm.isFirst) {
	                    vm.province_id = data.list[0].province_id;
	                	vm.getCitys(data.list[0].province_id);
	                	vm.isFirst = false;
	                };
	            };
	        },"json");
	    };
	    vm.checkProv = function(dom,id,name){
	        vm.province_id = id;
	        vm.province_name = name;
	        vm.getCitys(id);
	    };
	    vm.getCitys = function(id){
	        $.get(apiconfig.baseapiurl+"common/area!getCitysByProvince.action?province_id="+id,function(data){
	            if (data.errorCode == "000000") {
	                vm.cityList = data.list;
	            };
	        },"json");
	    };
	    vm.checkCity = function(dom,id,name){
	    	vm.city_id = id;
	    	vm.city_name = name;
	    	$("#city-layer").fadeOut();
	    };
	    vm.title = "";
	    vm.mobile = "";
	    vm.name = "";
	    vm.address = "";
	    vm.doApply = function(){
	    	if (vm.serial_nos=="") {
	    		layer.open({
				    content: '请选择需要开发票的订单',
				    btn: ['确定']
				});
	    	}else if(vm.title==""){
	    		layer.open({
				    content: '请输入发票抬头',
				    btn: ['确定']
				});
	    	}else if(vm.name==""){
	    		layer.open({
				    content: '请输入收件人姓名',
				    btn: ['确定']
				});
	    	}else if(vm.mobile==""){
	    		layer.open({
				    content: '请输入收件人联系方式',
				    btn: ['确定']
				});
	    	}else if(vm.province_name==""){
	    		layer.open({
				    content: '请选择省份',
				    btn: ['确定']
				});
	    	}else if(vm.city_name==""){
	    		layer.open({
				    content: '请选择城市',
				    btn: ['确定']
				});
	    	}else if(vm.address==""){
	    		layer.open({
				    content: '请输入详细地址',
				    btn: ['确定']
				});
	    	}else{
	    		$.ajax({
	    			url : apiconfig.baseapiurl+"store/invoice/invoice!apply.action",
	    			type : "post",
	    			dataType : "json",
	    			data :{
	    				user_id : vm.user_id,
	    				type : 1,
	    				title : vm.title,
	    				mobile : vm.mobile,
	    				name : vm.name,
	    				province_id : vm.province_id,
	    				city_id : vm.city_id,
	    				address : vm.address,
	    				serial_nos : vm.serial_nos.join(",")
	    			},
	    			success : function(data){
	    				if (data.errorCode=="000000") {
	    					if (data.flag=="1") {
	    						layer.open({
								    content: "申请成功！",
								    btn: ['确定'],
								    yes: function(index){
									    window.history.back();
									}  
								});
	    					}else{
	    						layer.open({
								    content: "申请失败！",
								    btn: ['确定']
								});
	    					};
	    				}else{
	    					layer.open({
							    content: "申请失败！",
							    btn: ['确定']
							});
	    				};
	    			}
	    		});
	    	};
	    };
    });
	$(function(){
		invoiceModel.getInvoiceList();
	})
});