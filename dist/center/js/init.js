/**
 * auther : ouyang
 * date : 2016-4-1
 * content : 个人中心
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
            vm.user = header.user;
        }else{
            window.history.back();
        };
        vm.imgHost = apiconfig.baseapiurl;
        vm.loginOut = function(){
            layer.open({
                content: '确定退出账号登录吗？',
                btn: ['确定', '取消'],
                shadeClose : false,
                yes: function(index){
                    if (localData.init()) {
                        localData.clear();
                    };
                    layer.close(index);
                    window.location.href= apiconfig.baseUrl+"logReg/login.html";
                }
            });
        }
    });
});