/**
 * auther : ouyang
 * date : 2016-4-1
 * content : 评价
 */
seajs.config({
    // 别名配置
    alias: {
    	'headback' : 'dist/module/head/head-back.js'
    }
});
define(function(require, exports, module) {
    var header = require("headback");
    require("footer");
    var orderModel = avalon.define("orderCtrl",function(vm){
    	if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id;
        }else{
            window.history.back();
        };
        vm.errorMsg = "";
    	vm.loading = false;
        vm.serial_no = common.getUrlParam("serial_no");
        vm.detail = {};
        vm.imgHost = apiconfig.baseapiurl;
        vm.getDetail = function(){
            $.get(apiconfig.baseapiurl+"store/order/order!getDetail.action",{
                serial_no:vm.serial_no,
                user_id:vm.user_id
            },function(data){
                if (data.errorCode=="000000") {
                    vm.detail = data.result;
                };
                vm.loading = false;
            },"json");
        }
        vm.starArr = [1,2,3,4,5,6];
        vm.score = 0;
    	vm.setStar = function(dom,starNum){
            var _dom = $(dom);
            if (_dom.hasClass("active")) {
                _dom.removeClass("active");
            }else{
                _dom.addClass("active");
            };
            _dom.prevAll("span").addClass("active");
            _dom.nextAll("span").removeClass("active")
            vm.score = starNum
        };
        vm.content = "";
        vm.sendPrise = function(){
            if(vm.score==0){
                vm.errorMsg = "请选择星级！";
            }else if (vm.content=="") {
                vm.errorMsg = "请输入评价内容！";
            }else{
                $.ajax({
                    url : apiconfig.baseapiurl + "comment/comment!saveOrderComment.action",
                    type : "post",
                    dataType : "json",
                    data : {serial_no : vm.detail.serial_no,user_id : vm.user_id,content : vm.content,score : vm.score},
                    success : function(data){
                        if (data.errorCode=="000000") {
                            window.history.back();    
                        };
                    }
                })
            };
            setTimeout(function(){
                vm.errorMsg = "";
            },2000)
        };
    });
    $(function(){
        orderModel.getDetail();
    })
});