/**
 * auther : ouyang
 * date : 2016-4-11
 * content : 修改密码
 */
seajs.config({
    // 别名配置
    alias: {
    	'headback' : 'dist/module/head/head-back.js',
        'md5' : 'plugIn/md5/jQuery.md5.js'
    }
});
define(function(require, exports, module) {
    var header = require("headback");
    require("layercss");
    require("layer");
    require("md5");
    require("footer");
    var userModel = avalon.define("userCtrl",function(vm){
    	if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id;
        }else{
            window.history.back();
        };
        vm.errorMsg = "";
        vm.oldpass = "";
        vm.newpass = "";
        vm.rnewpass = "";
        vm.doSend = function(){
            if ($.trim(vm.oldpass)=="") {
                vm.errorMsg = "原密码不能为空！";
            }else if($.trim(vm.newpass)==""){
                vm.errorMsg = "新密码不能为空！";
            }else if($.trim(vm.newpass).length<6){
                vm.errorMsg = "新密码长度不能小于6位！";
            }else if($.trim(vm.rnewpass)==""){
                vm.errorMsg = "请再次输入新密码！";
            }else if(vm.newpass!=vm.rnewpass){
                vm.errorMsg = "两次输入的新密码不一致！";
            }else{
                var loading = layer.open({type: 2,shadeClose:false});
                $.ajax({
                    url : apiconfig.baseapiurl+"base/user!modifyPasswordV2.action",
                    type : "post",
                    dataType : "json",
                    data : {
                        uid : vm.user_id,
                        old_pass : $.md5(vm.oldpass),
                        new_pass : $.md5(vm.newpass),
                        token : ""
                    },
                    success : function(data){
                        layer.close(loading);
                        if (data.errorCode=="000000") {
                            if (data.flag) {
                                window.location.href=apiconfig.baseUrl+"logReg/login.html"
                            }else{
                                if (data.flagCode==1) {
                                    vm.errorMsg = "原密码输入错误！";
                                }else{
                                    vm.errorMsg = "网络泡妞去了，请再试！";
                                };
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