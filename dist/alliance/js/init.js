/**
 * auther : ouyang
 * date : 2016-3-16
 * content : 律所联盟
 */
seajs.config({
    // 别名配置
    alias: {
    }
});
define(function(require, exports, module) {
    require("head");
    require("footer");
    var allianceModel = avalon.define("allianceCtrl",function(vm){
        vm.allianceArr = [];
        vm.cityArr = [];
        vm.logoHost = apiconfig.baseapiurl;
        vm.getCity = function(){
            $.ajax({
                url : apiconfig.baseapiurl + "official_site/unionlaw!queryAllCitys.action",
                type:"get",
                dataType:"json",
                success:function(data){
                    vm.cityArr = data.list;
                }
            });
        };
        vm.cityid = "";
        vm.pageno = 1;
        vm.pagesize = 9;
        vm.pagetotal = "";
        vm.isShow = true;
        vm.getAlliance = function(){
            vm.allianceArr = [];
            $.ajax({
                url: apiconfig.baseapiurl + "official_site/unionlaw!queryForPage.action",
                type:"get",
                data:{city_id:vm.cityid,page_no:vm.pageno,page_size:vm.pagesize},
                dataType:"json",
                success:function(data){
                    if (data.errorCode=="000000") {
                        $.each(data.list,function(index){
                            vm.allianceArr.push(data.list[index]);
                        });
                        vm.pagetotal = data.totalPage;
                        vm.isShow = false;
                    };
                }
            });
        };
        vm.doPrev = function(){
            if (vm.pageno==1) {
                return false
            }else{
                vm.pageno = vm.pageno -1;
                vm.getAlliance();
            };

        };
        vm.doNext = function(){
            if (vm.pageno==vm.pagetotal) {
                return false
            }else{
                vm.pageno = vm.pageno +1;
                vm.getAlliance();
            }
        };
        vm.linkTo = function(url){
            if (url=="#") {
                return false;
            }else{
                window.open(url,"_blank");
            };
        };
        vm.filer = function(dom,cityid){
            vm.cityid = cityid;
            vm.pageno = 1;
            vm.pagesize = 8;
            $(dom).addClass("active").siblings().removeClass("active");
            vm.getAlliance();
        };
    });
    allianceModel.getCity();
    allianceModel.getAlliance();
    
});