/**
 * auther : ouyang
 * date : 2016-4-1
 * content : 订单管理
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
    avalon.filters.date10String = function(str, args, args2){
        ss = str.substr(0, 10);
        return ss;
    }
    var orderModel = avalon.define("orderCtrl",function(vm){
    	if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id;
        }else{
            window.history.back();
        };
    	vm.loading = true;
    	vm.type=1;
    	vm.page_no = 1;
    	vm.totalpages = 0;
    	vm.listArr = [];
    	vm.loadmorehtml = "加载更多";//<div>加载中...</div>
    	vm.doSwitch = function(dom,type){
    		vm.type=type;
    		vm.loading = true;
    		vm.page_no = 1;
    		vm.listArr = [];
    		$(dom).addClass("active").siblings().removeClass("active");
    		vm.getList();
    	};
    	vm.getList = function(){
    		$.get(apiconfig.baseapiurl+"store/order/order!queryForPage.action",{
    			user_id:vm.user_id,
    			type:vm.type,
    			page_no:vm.page_no,
    			page_size:5,
    			state:1
    		},function(data){
    			if (data.errorCode=="000000") {
    				$.each(data.list,function(index){
    					vm.listArr.push(data.list[index]);
    				});
    				vm.totalpages = data.totalPage;
    				vm.loadmorehtml = "加载更多";
    			};
    			vm.loading = false;
    		},"json");
    	};
    	vm.loadmore = function(){
            vm.loadmorehtml = "<div>加载中...</div>";
            vm.page_no = vm.page_no+1;
            vm.getList();
        };
        vm.doClick = function(dom,obj,type,index){
            if (type=="cancel") {
                layer.open({
                    content:'确定取消该订单吗?',
                    btn: ['确认', '取消'],
                    shadeClose: false,
                    yes: function(index){
                        layer.close(index);
                        window.location.href="center-order-cancel.html?serial_no="+obj.serial_no;
                    }, no: function(index){
                        layer.close(index);
                    }
                });
            }else if(type=="gopay"){
                var params = "?id="+obj.product_id+"&descr="+obj.descr+"&serial_no="+obj.serial_no;
                window.location.href = apiconfig.baseUrl+"service/servicepay.html"+params;
            }else if(type=="refunds"){
                layer.open({
                    content:'已支付金额'+obj.univalence+'元，<br/>确定该服务要申请退款吗？',
                    btn: ['确认', '取消'],
                    shadeClose: false,
                    yes: function(index){
                        vm.listArr[index].status_name="退款中"
                        $.ajax({
                            url : apiconfig.baseapiurl+"transaction/servicetracking!clientCannelOrder.action",
                            type : "post",
                            dataType : "json",
                            data : {user_id :vm.user_id,serial_no:obj.serial_no},
                            success : function(data){
                                if (data.errorCode=="000000") {
                                    vm.listArr[index].status_name="退款中";
                                    vm.listArr[index].status="3";
                                    layer.close(index);
                                };
                            }
                        })
                    }, no: function(index){
                        layer.close(index);
                    }
                });
            }else if(type=="praise"){
                window.location.href = apiconfig.baseUrl+"center/center-lawyer-praise.html?serial_no="+obj.serial_no;
            };
        };
    });
    $(function(){
    	orderModel.getList();
    	$(".nav-edite").html("发票").css({"color":"#66DA8A","font-size":"16px","width":"auto"}).attr("href","center-invoice.html");
    })
});