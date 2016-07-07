/**
 * auther : ouyang
 * date : 2016-3-21
 * content : 找律师
 */
seajs.config({
    // 别名配置
    alias: {
        //'style' : 'dist/lawyer/css/style.css'
    }
});
define(function(require, exports, module) {
    require("head");
    require("footer");
    avalon.filters.date10String = function(str, args, args2){
        ss = str.substr(0, 10);
        return ss;
    }
    avalon.filters.text25String = function(str, args, args2){
        if (str.length>25) {
            str = str.substr(0, 25)+"...";
        };
        return str;
    }
    var lawerlistModel = avalon.define("lawerlistCtrl",function(vm){
        vm.list = [];
        vm.totalpages = "";
        vm.total = "";
        vm.loading = true;
        vm.loadmorehtml = "加载更多";//<div>加载中...</div>
        vm.pageNo = 1;
        vm.type = "";
        vm.city_id = "";
        vm.imghost = apiconfig.baseapiurl;
        vm.getList = function(){
            vm.searchList =[]; 
            $.get(apiconfig.baseapiurl + "bbs/active!queryActiveForPage.action",{
                page_no : vm.pageNo,
                page_size : 5,
                type : vm.type,
                city_id : vm.city_id
            },function(data){
                vm.loading = false;
                if (data.errorCode=="000000") {
                    $.each(data.list,function(index){
                        vm.list.push(data.list[index]);
                    });
                    vm.loadmorehtml = "加载更多";
                    vm.totalpages = data.totalPage;
                    vm.total = data.total;
                };
            },"json");
        };
        vm.loadmore = function(){
            vm.loadmorehtml = "<div>加载中...</div>";
            vm.pageNo = vm.pageNo+1;
            vm.getList();
        };

        vm.searchList =[];        
        vm.typeList = [];
        vm.getActiveType = function(){
            $.get(apiconfig.baseapiurl+"bbs/active!getActiveTypeList.action",function(data){
                if (data.errorCode == "000000") {
                    vm.typeList = data.list;
                };
            },"json")
        };
        vm.cityList = [];
        vm.getActiveCity = function(){
            $.get(apiconfig.baseapiurl+"bbs/active!queryActiveAllCity.action",function(data){
                if (data.errorCode == "000000") {
                    vm.cityList = data.list;
                };
            },"json");
        };
        vm.ptype = "";
        vm.doCheckBar = function(dom,type){
            vm.ptype = type;
            var _this = $(this);
            var _parent = _this.closest(".search-list-pannel");
            if(_parent.hasClass("show")&&_this.hasClass("active")){
                _parent.removeClass("show");
                _this.removeClass("active");
            }else if(_parent.hasClass("show")&&!_this.hasClass("active")){
                _this.addClass("active").siblings().removeClass("active");
            }else{
                _this.addClass("active");
                _parent.addClass("show");
            }
            if (type=="type") {
                vm.searchList = vm.typeList;
            }else{
                vm.searchList = vm.cityList;
            };
        };
        vm.hidePannel = function(dom){
            $(dom).closest(".search-list-pannel").removeClass("show");
        };
        vm.doCheckItem = function(dom,id){
            vm.pageNo = 1;
            vm.totalpages = "";
            vm.total = "";
            vm.list = [];
            vm.loading = true;
            $("#"+vm.ptype).html($(dom).text());
            $(dom).closest(".search-list-pannel").removeClass("show");
            if (vm.ptype=="type") {
                vm.type = id;
            }else{
                vm.city_id = id;
            }
            vm.getList();
        };
    });
    lawerlistModel.getActiveCity();
    lawerlistModel.getActiveType();
    lawerlistModel.getList();
});