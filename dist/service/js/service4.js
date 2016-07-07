/**
 * auther : ouyang
 * date : 2016-3-16
 * content : 关于我们
 */
seajs.config({
    // 别名配置
    alias: {
        'calendarcss':'plugIn/calendar/css/mobiscroll.custom-2.15.1.min.css',
        'calendar':'plugIn/calendar/js/mobiscroll.custom-2.15.1.min.js'
    }
});
define(function(require, exports, module) {
    var header = require("head");
    require("footer");
    require("calendarcss");
    require("calendar");
    var serviceModel = avalon.define("serviceCtrl",function(vm){
        vm.serviceNavList = [];
        vm.serviceType = "AJ";
        vm.id=common.getUrlParam("id");
        vm.getNavList = function(){
            $.get(apiconfig.baseapiurl+"store/product/product!queryForPage.action?parent_id="+0,function(data){
                if (data.errorCode=="000000") {
                    vm.serviceNavList = data.list;
                };
            },"json");
            vm.getDetail(vm.id);
        };
        vm.detail = {};
        vm.getDetail = function(id){
            $.get(apiconfig.baseapiurl+"store/product/product!getDetail.action?id="+id,function(data){
                if (data.errorCode=="000000") {
                    vm.detail = data;
                };
            })
        };
        vm.errorMsg = "";
    	vm.tempUrl = apiconfig.baseUrl+"service/temp.html";
        vm.provList = [];
        vm.cityList = [];
        vm.isFirst = true;
        vm.province_id = "";
        vm.province_name = ""
        vm.city_id = "";
        vm.city_name = "";
        vm.getProv = function(){
            $.get(apiconfig.baseapiurl+"common/area!getProvinceAll.action",function(data){
                if (data.errorCode == "000000") {
                    vm.provList = data.list;
                    if (vm.isFirst) {
                        vm.province_id = data.list[0].province_id;
                        vm.province_name = data.list[0].name;
                        vm.getCitys(vm.province_id);
                        vm.isFirst = false;
                    };
                };
            },"json");
        };
        vm.checkProv = function(dom,id,name){
            vm.province_id = id;
            vm.province_name = name;
            $(dom).addClass("active").siblings("a").removeClass("active");
            vm.getCitys(id);
        };
        vm.getCitys = function(id){
            $.get(apiconfig.baseapiurl+"common/area!getCitysByProvince.action?province_id="+id,function(data){
                if (data.errorCode == "000000") {
                    vm.cityList = data.list;
                };
            },"json");
        };
        vm.cityLayer = $("#cityLayer");
        vm.showCityLayer = function(){
            vm.cityLayer.fadeIn();
        };
        vm.hideCityLayer = function(){
            vm.cityLayer.fadeOut();
        };
        vm.checkCity = function(dom,id,name){
            vm.city_id = id;
            vm.city_name = name;
            $("#ording-city").val(name);
            $(dom).addClass("active").siblings("a").removeClass("active");
            vm.cityLayer.fadeOut();
        };
        if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id
        }else{
            vm.user_id = "";
        };
        vm.time = "";
        vm.discription = "";
        vm.doAdvice = function(){
            if (vm.user_id!="") {
                if(vm.time==""){
                    vm.errorMsg = "请选择咨询的时间";
                }else if(vm.city_name==""){
                    vm.errorMsg = "请选择咨询的城市";
                }else if (vm.discription=='') {
                    vm.errorMsg = "请描述您的问题";
                }else{

                };
                setTimeout(function(){
                    vm.errorMsg = "";
                },2000);
            }else{
                window.location.href = "../logReg/login.html?turl="+header.turl;
            }
        };
    });
    serviceModel.getProv();
    $(function(){
        serviceModel.getNavList();

        $('#ording-date').mobiscroll().calendar({
            theme: 'mobiscroll',
            mode: 'clickpick',
            display: 'bottom',
            lang: 'zh',
            dateFormat: 'yy-mm-dd', // 日期格式
            swipeDirection: 'vertical',
            controls: ['calendar', 'date', 'time']
        });
    })
});