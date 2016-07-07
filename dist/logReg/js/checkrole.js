/**
 * auther : ouyang
 * date : 2016-3-16
 * content : 关于我们
 */
seajs.config({
    // 别名配置
    alias: {
    }
});
define(function(require, exports, module) {
    require("avalon");
    var vm = avalon.define({
        $id: "checkRoleCtrl",
        checkType: "",
        errorinfo: "",
        rols: [{
            type: "我是法律人",
            list: [{
                id: 3,
                text: "律师",
                class: "role1",
                title: "解决法律难题，提供法律服务"
            },
            {
                id: 4,
                text: "律师助理",
                class: "role2",
                title: "掌握法律基础，律师业务辅助"
            },
            {
                id: 5,
                text: "法务",
                class: "role3",
                title: "处理企业事项，展现法律之长"
            },
            {
                id: 6,
                text: "法学生",
                class: "role4",
                title: "研习法学知识，实现法律之志"
            },
            {
                id: 7,
                text: "司法工作者",
                class: "role5",
                title: "侦查检察审判，公正与法同行"
            }]
        },
        {
            type: "我是普通人",
            list: [{
                id: 1,
                text: "个人",
                class: "role6",
                title: "寻求法律，走近法律"
            },
            {
                id: 2,
                text: "企业",
                class: "role7",
                title: "企业法律事务，寻找处理之路"
            }]
        }],
        doCheckType: function(id) {
            vm.checkType = id;
            vm.errorinfo = ""
        },
        roleNote: "",
        doHover: function(title) {
            vm.roleNote = title;
            vm.errorinfo = ""
        },
        gotoRegister: function() {
            if (vm.checkType != '') {
                window.location.href = "register.html?roletype=" + vm.checkType
            } else {
                vm.errorinfo = '请先选择角色'
            }
        }
    });
    avalon.scan();
});