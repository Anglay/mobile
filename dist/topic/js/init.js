/**
 * auther : ouyang
 * date : 2016-3-21
 * content : 找律师
 */
seajs.config({
    // 别名配置
    alias: {
        'swipercss' : 'plugIn/swiper/css/swiper.min.css',
        'swiper' : 'plugIn/swiper/js/swiper.min.js'
    }
});
define(function(require, exports, module) {
    var header = require("head");
    require("swipercss");
    require("swiper");
    require("footer");
    var domEdite = $("#nav-edite");
    domEdite.addClass("icon-edite").bind("click",function(){
        if (header.user!=""&&header.user!=null&&header.user!=undefined) {
            window.location.href = "topicedite.html";
        }else{
            window.location.href = "../logReg/login.html?turl="+header.turl;
        };
    });

    avalon.filters.myfilter = function(str, args, args2){
        var ss = str.replace(/<[^>]+>/g,"");//去掉所有的html标记
        if (ss.length>80) {
            ss = ss.substr(0, 80)+"...";
        }
        return ss;
    }
    var mySwiper = new Swiper('#topic-item', {
        slidesPerView : 4
    })

    var topiclistModel = avalon.define("topiclistCtrl",function(vm){
        vm.baseUrl = "http://192.168.1.105/code/web/linklaws/mobile/";
        vm.list = [];
        vm.pageNo = 1;
        vm.totalpages = "";
        vm.total = "";
        vm.loading = true;
        vm.loadmorehtml = "加载更多";//"<div>加载中...</div>";
        vm.imgHost = apiconfig.baseapiurl;
        vm.params_code = "";
        vm.getList = function(){
            $.get(apiconfig.baseapiurl+"bbs/topic!queryTopicForPage.action",{
                page_no:vm.pageNo,
                page_size:5,
                params_code:vm.params_code
            },function(data){
                vm.loading = false;
                if (data.errorCode=="000000") {
                    $.each(data.list,function(index){
                        var files = data.list[index].files_url;
                        if(files!=""){
                            files = files.split(",")[0];
                            data.list[index].files_url = files;
                        }
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
        vm.checkItem = function(dom,type){
            vm.list = [];
            vm.pageNo = 1;
            vm.totalpages = "";
            vm.total = "";
            vm.params_code = type;
            vm.loading = true;
            var _this = $(dom);
            _this.find("span").addClass("active");
            _this.siblings().find("span").removeClass("active");
            vm.getList();
        };
    });
    topiclistModel.getList();
});