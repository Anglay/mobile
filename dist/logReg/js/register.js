/**
 * auther : ouyang
 * date : 2016-3-16
 * content : 关于我们
 */
seajs.config({
    // 别名配置
    alias: {
        'validate' : 'plugIn/validate/jquery.validate.js',
        'md5' : 'plugIn/md5/jQuery.md5.js'
    }
});
define(function(require, exports, module) {
    require("common");
    require("validate");
    require("md5");
    require("avalon");

    var regModel = avalon.define("regCtrl",function(vm){
        vm.errorinfo = "";
        vm.roletype = common.getUrlParam("roletype");
        vm.registerForm = function() {
            if (vm.roletype == "") {
                window.location.href = "checkrole.html"
            } else {
                $("#registerForm").validate({
                    rules: {
                        name: {
                            required: true,
                            isString: true
                        },
                        mobile: {
                            required: true,
                            maxlength: 11,
                            isMobile: true
                        },
                        code: {
                            required: true,
                            minlength: 6,
                            maxlength: 6,
                            digits: true
                        },
                        password: {
                            required: true,
                            minlength: 6
                        }
                    },
                    messages: {
                        name: {
                            required: "请输入用户名",
                            isString: "用户名只能由字母,数字和中文组成"
                        },
                        mobile: {
                            required: '请输入手机号码',
                            maxlength: '请输入正确的手机号码',
                            isMobile: '请输入正确的手机号码'
                        },
                        code: {
                            required: '请输入验证码',
                            minlength: '请输入正确的验证码',
                            maxlength: '请输入正确的验证码',
                            digits: '请输入正确的验证码'
                        },
                        password: {
                            required: '请输入密码',
                            minlength: '请输入正确的密码'
                        }
                    },
                    submitHandler: function(form) {
                        var _mobile = $("input[name='mobile']").val();
                        var _code = $("input[name='code']").val();
                        var _password = $("input[name='password']").val();
                        var _name = $("input[name='name']").val();
                        $.ajax({
                            url: apiconfig.baseapiurl+"base/register!register.action",
                            dataType: 'json',
                            type: 'post',
                            data: {'mobile':_mobile,'code':_code,'password':$.md5(_password),'name':_name,'role':vm.roletype,'platform':"3"},
                            success: function(data) {
                                if ("000000" == data.errorCode) {
                                    if (data.flag === true) {
                                        window.location.href = "login.html";
                                    } else {
                                        switch (data.flagCode) {
                                            case '1':
                                                vm.errorinfo = '手机号码格式错误';
                                                break;
                                            case '2':
                                                vm.errorinfo = '请输入密码';
                                                break;
                                            case '3':
                                                vm.errorinfo = '验证码错误';
                                                break;
                                            case '4':
                                                vm.errorinfo = '手机号已注册';
                                                break;
                                            default:
                                                vm.errorinfo = '服务器正在维护中';
                                        }
                                    }
                                } else {
                                    vm.errorinfo = '服务器正在维护中';
                                }
                            },
                            error: function() {
                                vm.errorinfo = '服务器正在维护中';
                            }
                        })
                    }
                })
            }
        };
        vm.sendMessage = function(param) {
            var $mobile = $('input[name=mobile]').val();
            if ($mobile == "") {
                vm.errorinfo = "请输入正确的手机号码"
            } else {
                if (common.ischeckmobile($mobile)) {
                    vm.checkMobile($mobile, param)
                } else {
                    vm.errorinfo = "请输入正确的手机号码"
                }
            }
        };
        vm.checkMobile = function(mobileparam, codetype) {
            $.get(apiconfig.baseapiurl+"base/register!send_code.action", {
                "mobile": mobileparam,
                "code_type": codetype
            }, function(data) {
                if ("000000" == data.errorCode) {
                    if (data.flag !== true) {
                        switch (data.flagCode) {
                            case '1':
                                vm.errorinfo = '手机号码格式错误';
                                break;
                            case '2':
                                vm.errorinfo = '手机号已注册';
                                break;
                            case '3':
                                vm.errorinfo = '手机号还没注册';
                                break;
                            default:
                                vm.errorinfo = '服务器正在维护中';
                        }
                    } else {
                        vm.waitCode(60)
                    }
                }
            })
        };
        vm.waitCode = function(wait) {
            var $code = $('#getcodebtn');
            if (wait == 0) {
                $code.attr('disabled',false);
                $code.text('获取验证码');
            } else {
                $code.attr('disabled', true);
                $code.text('重新发送 ' + wait + 's');
                wait--;
                setTimeout(function() {
                    vm.waitCode(wait)
                }, 1000)
            }
        };
    });
    $(function(){
        regModel.registerForm();
    });
});