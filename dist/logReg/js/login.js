/**
 * auther : ouyang
 * date : 2016-3-16
 * content : 关于我们
 */
seajs.config({
    // 别名配置
    alias: {
    	'icheck' : 'plugIn/icheck/icheck.js',
    	'icheckcss' : 'plugIn/icheck/skins/all.css',
        'validate' : 'plugIn/validate/jquery.validate.js',
        'md5' : 'plugIn/md5/jQuery.md5.js'
    }
});
define(function(require, exports, module) {
    require("common");
    require("validate");
    require("md5");
    require("avalon");
    require("icheckcss");
    require("icheck");
    
    var loginModel = avalon.define("loginCtrl",function(vm){
        vm.paramsUrl = common.getUrlParam("turl");
        vm.errorinfo = "";
        vm.checkLogin = function() {
            $('#loginForm').validate({
                rules: {
                    mobile: {
                        required: true,
                        maxlength: 11,
                        isMobile: true
                    },
                    password: {
                        required: true,
                        minlength: 6
                    }
                },
                messages: {
                    mobile: {
                        required: '请输入手机号码',
                        maxlength: '请输入正确的手机号码',
                        isMobile: '请输入正确的手机号码'
                    },
                    password: {
                        required: '请输入密码',
                        minlength: '请输入正确的密码'
                    }
                },
                submitHandler: function(form) {
                    var _mobile = $("input[name='mobile']").val();
                    var _password = $("input[name='password']").val();
                    $.ajax({
                        url: apiconfig.baseapiurl+"base/login!login.action",
                        dataType: 'json',
                        type: 'post',
                        data: {
                            mobile:_mobile,
                            password : $.md5(_password)
                        },
                        success: function(data) {
                            if ("000000" == data.errorCode) {
                                if (data.flag === true) {
                                    vm.errorinfo = "";
                                    /*if ($('#choosepassword').prop('checked')) {
                                        if (localData.init()) {
                                            localData.setJson('user',data);
                                        };
                                    }*/
                                    if (localData.init()) {
                                        localData.setJson('user',data);
                                    };
                                    if (vm.paramsUrl!=""&&vm.paramsUrl!=null&&vm.paramsUrl!=undefined) {
                                        var turl = decodeURIComponent(vm.paramsUrl);
                                        console.log(turl);
                                        if (turl.indexOf("?")>=0) {
                                            window.location.href = decodeURIComponent(vm.paramsUrl)+"&log=log";
                                        }else{
                                            window.location.href = decodeURIComponent(vm.paramsUrl)+"?log=log";
                                        };
                                        //window.location.href = decodeURIComponent(vm.paramsUrl);
                                    }else{
                                        window.location.href = '../index/index.html';
                                    };
                                } else {
                                    switch (data.flagCode) {
                                        case '1':
                                            vm.errorinfo = '手机号码格式错误';
                                            break;
                                        case '2':
                                            vm.errorinfo = '请输入密码';
                                            break;
                                        case '3':
                                            vm.errorinfo = '该用户不存在';
                                            break;
                                        case '4':
                                            vm.errorinfo = '用户禁止登陆';
                                            break;
                                        case '5':
                                            vm.errorinfo = '密码错误';
                                            break;
                                        default:
                                            vm.errorinfo = '服务器正在维护中';
                                    }
                                }
                            }
                        },
                        error: function(data) {
                            window.location.href = '../error/error.html'
                        }
                    })
                }
            })
        };
    });
    $(function(){
        loginModel.checkLogin();
        $('.skin-square input').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
            increaseArea: '20%'
        });
    });
});