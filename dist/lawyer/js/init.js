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
    var lawerlistModel = avalon.define("lawerlistCtrl",function(vm){
        vm.baseUrl = "http://192.168.1.105/code/mobile/";
        vm.list = [];
        vm.pageNo = 1;
        vm.totalpages = "";
        vm.total = "";
        vm.loading = true;
        vm.loadmorehtml = "加载更多";//<div>加载中...</div>
        vm.imgHost = "http://api.linklaws.com/";
        vm.min = "";
        vm.max = "";
        vm.major_id = "";
        vm.vocation_id = "";
        vm.city_id  = "";
        vm.getList = function(){
            vm.leftList = [];
            vm.rightList = [];
            $.get(apiconfig.baseapiurl + "lawyer/lawyer!search.action",{
                page_no:vm.pageNo,
                page_size:8,
                push_state:1,
                state :1,
                min:vm.min,
                max:vm.max,
                major_id:vm.major_id,
                vocation_id:vm.vocation_id,
                city_id:vm.city_id
            },function(data){
                vm.loading = false;
                if (data.errorCode=="000000") {
                    $.each(data.lawyer,function(index){
                        vm.list.push(data.lawyer[index]);
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
        vm.leftList = [];
        vm.rightList = [];

        vm.provList = [];
        vm.getProv = function(){
            $.get(apiconfig.baseapiurl + "common/area!getProvinceAll.action",function(data){
                if (data.errorCode == "000000") {
                    vm.provList = data.list;
                };
            },"json")
        };
        vm.getCity = function(id){
            $.get(apiconfig.baseapiurl + "common/area!getCitysByProvince.action?province_id="+id,function(data){
                if (data.errorCode == "000000") {
                    vm.rightList = data.list;
                };
            },"json");
        };
        vm.majorList = []
        vm.getMajor = function(){
            $.get(apiconfig.baseapiurl + "common/domain!getMajorList.action",function(data){
                if (data.errorCode =="000000") {
                    vm.majorList = data.list;
                };
            },"json")
        }
        vm.vocationList = [];
        vm.getVocation = function(){
            $.get(apiconfig.baseapiurl + "common/domain!getVocationList.action",function(data){
                if (data.errorCode =="000000") {
                    vm.vocationList = data.list;
                };
            },"json")
        }
        vm.year = [{id:"1",name:"3年内工作经验"},{id:"2",name:"3到5年工作经验"},{id:"3",name:"5到10年工作经验"},{id:"4",name:"10年以上工作经验"}]
        vm.type = "";
        vm.doCheckBar = function(dom,index){
            $(".left-list-item>span:first-child").addClass("active").siblings().removeClass("active");
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

            vm.leftList = [];
            vm.rightList = [];
            vm.type = index;
            if (index=='area') {
                vm.leftList = vm.provList;
            }else if(index=='major'){
                vm.leftList = vm.majorList;
            }else if(index=='vocation'){
                vm.leftList = vm.vocationList;
            }else if(index=='year'){
                vm.leftList = vm.year;
            }else if(index=='all'){
                vm.leftList = vm.allArr;
            }
        };
        vm.hidePannel = function(dom){
            $(dom).closest(".search-list-pannel").removeClass("show");
        };
        vm.doCheckItem = function(dom,id,index){
            $(dom).addClass("active").siblings().removeClass("active");
            vm.pageNo = 1;
            if (vm.type=="area"&&index==0) {
                vm.getCity(id);
            }else if(vm.type=="major"&&index==0){
                vm.totalpages = "";
                vm.total = "";
                vm.list = [];
                vm.loading = true;
                vm.major_id = id;
                $("#"+vm.type).html($(dom).text());
                $(dom).closest(".search-list-pannel").removeClass("show");
                vm.getList();
            }else if(vm.type=="vocation"&&index==0){
                vm.totalpages = "";
                vm.total = "";
                vm.list = [];
                vm.loading = true;
                vm.vocation_id = id;
                $("#"+vm.type).html($(dom).text());
                $(dom).closest(".search-list-pannel").removeClass("show");
                vm.getList();
            }else if(vm.type=="year"&&index==0){
                vm.totalpages = "";
                vm.total = "";
                vm.list = [];
                vm.loading = true;
                vm.min = "";
                vm.max = "";
                $(dom).closest(".search-list-pannel").removeClass("show");
                $("#"+vm.type).html($(dom).text());
                if (id==1) {
                    vm.min = 0;
                    vm.max = 3;
                }else if(id==2){
                    vm.min = 3;
                    vm.max = 5;
                }else if(id==3){
                    vm.min = 5;
                    vm.max = 10;
                }else if(id==4){
                    vm.min = 10;
                    vm.max = "";
                };
                vm.getList();
            }else if(vm.type=="all"&&index==0){
                vm.totalpages = "";
                vm.total = "";
                vm.loading = true;
                $(dom).closest(".search-list-pannel").removeClass("show");
                $("#"+vm.type).html($(dom).text());
                vm.list = [];
                vm.getList();
            }else if(vm.type=="area"&&index==1){
                vm.totalpages = "";
                vm.total = "";
                vm.list = [];
                vm.loading = true;
                vm.city_id = id;
                $(dom).closest(".search-list-pannel").removeClass("show");
                $("#"+vm.type).html($(dom).text());
                vm.getList();
            };
        };
    });
    lawerlistModel.getProv();
    lawerlistModel.getMajor();
    lawerlistModel.getVocation();
    lawerlistModel.getList();
});