/**
 * auther : ouyang
 * date : 2016-4-11
 * content : 修改手机号
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
    var userModel = avalon.define("userCtrl",function(vm){
    	if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id;
            vm.tel = header.user.tel;
        }else{
            window.history.back();
        };
        vm.errorMsg = "";
        vm.doSend = function(){
            if ($.trim(vm.tel)=="") {
                vm.errorMsg = "手机号码不能为空！";
            }else if(vm.tel.length != 11){
                vm.errorMsg = "手机号码格式不正确！";
            }else{
                var loading = layer.open({type: 2,shadeClose:false});
                $.ajax({
                    url : apiconfig.baseapiurl+"base/user!update_user_data.action",
                    type : "post",
                    dataType : "json",
                    data : {
                        uid : vm.user_id,
                        tel : vm.tel
                    },
                    success : function(data){
                        layer.close(loading);
                        if (data.errorCode=="000000") {
                            if (data.flag) {
                                if (localData.init()) {
                                    header.user.tel = vm.tel;
                                    localData.setJson('user',header.user);
                                    window.history.back();
                                };
                            }else{
                                vm.errorMsg = "网络泡妞去了，请再试！";
                            };
                        }else{
                            vm.errorMsg = "网络泡妞去了，请再试！";
                        };
                    }
                })
            };
            setTimeout(function(){
                vm.errorMsg = "";
            },2000);
        }
    });

});