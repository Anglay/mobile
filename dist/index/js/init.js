/**
 * auther : ouyang
 * date : 2016-3-16
 * content : 首页
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

    var serviceModel = avalon.define("serviceCtrl",function(vm){
        if (header.user!=''&&header.user!=null&&header.user!==undefined) {
            vm.user_id = header.user.id
        }else{
            vm.user_id = "";
        };
        vm.errorMsg = "";
        vm.detail = {};
        vm.isShow = false;
        vm.id = 1;//代表律师咨询
        vm.getDetail = function(id){
            $.get(apiconfig.baseapiurl+"store/product/product!getDetail.action?id="+vm.id,function(data){
                if (data.errorCode=="000000") {
                    vm.detail = data;
                };
                vm.isShow = true;
            })
        };
        vm.serviceInit = function(dom){
            $(dom).addClass("service-item").siblings("li").removeClass("service-item");
        };
        vm.discription = "";
        vm.doOrder = function(){
            if (vm.user_id!="") {
                if (vm.discription=='') {
                    vm.errorMsg = "请描述您的问题";
                }else{
                    $.ajax({
                        url :　apiconfig.baseapiurl+"store/order/order!save.action",
                        type : "post",
                        dataType : "json",
                        async : false,
                        data : {
                            user_id:vm.user_id,
                            product_id:vm.detail.id,
                            quantity:vm.detail.quantity,
                            rstime:vm.time,
                            descr:vm.discription,
                            province_id:vm.province_id,
                            city_id:vm.city_id
                        },
                        success : function(data){
                            if (data.errorCode=="000000") {
                                var params = "?id="+vm.id+"&descr="+vm.discription+"&serial_no="+data.result.serial_no;
                                window.location.href = apiconfig.baseUrl+"service/servicepay.html"+params;
                                // vm.getPayOrder(data.result.serial_no,data.result.descr);
                            }else{
                                
                            };
                        }
                    });
                }
                setTimeout(function(){
                    vm.errorMsg = "";
                },2000);
            }else{
                window.location.href = "../logReg/login.html?turl="+header.turl;
            }
        };
    });
    var lawerModel = avalon.define("lawerCtrl",function(vm){
        vm.list = [];
        vm.eduction  = ["","大专","本科","硕士","博士"]
        vm.imgHost = apiconfig.baseapiurl;
        vm.isShow = false;
        vm.getList = function(){
            $.get(apiconfig.baseapiurl+"lawyer/lawyer!search.action",{
                page_no:1,
                page_size:5,
                push_state:1,
                state :1
            },function(data){
                if (data.errorCode=="000000") {
                    vm.list = data.lawyer;
                    setTimeout(function(){
                        var mySwiper = new Swiper('#swiper-container2', {
                            slidesPerView : 2,
                            prevButton:'.swiper-button-prev',
                            nextButton:'.swiper-button-next',
                            loop:true
                        })
                    },10);
                };
                vm.isShow = true;
            },"json");
        }
    });
    
    var toolsModel = avalon.define("toolsCtrl",function(vm){
        vm.isShow = false;
        vm.baseUrl = apiconfig.baseUrl;
        vm.toolList = {
            list1:[
                {
                    text:"律师费",
                    linkto: vm.baseUrl + "tools/tools/Linklaws/index.html#/lawyerFee",
                    style:"tool-1"
                },{
                    text:"诉讼费",
                    linkto:vm.baseUrl + "tools/tools/Linklaws/index.html#/legalFee",
                    style:"tool-2"
                },{
                    text:"仲裁费",
                    linkto:vm.baseUrl + "tools/tools/Linklaws/index.html#/arbitrationFee",
                    style:"tool-3"
                },{
                    text:"经济补偿金",
                    linkto:vm.baseUrl + "tools/tools/Linklaws/index.html#/economicCompensation",
                    style:"tool-4"
                },{
                    text:"交通事故赔偿",
                    linkto:vm.baseUrl + "tools/tools/Linklaws/index.html#/trafficAccident",
                    style:"tool-5"
                },{
                    text:"利息计算",
                    linkto:vm.baseUrl + "tools/tools/Linklaws/index.html#/interestRate",
                    style:"tool-6"
                }
            ],
            list2:[
                {
                    text:"民事案由解析",
                    linkto:vm.baseUrl + "tools/tools/civilcases.html",
                    style:"tool-7"
                },{
                    text:"刑事罪名解析",
                    linkto:vm.baseUrl + "tools/tools/criminalcase.html",
                    style:"tool-8"
                },{
                    text:"司法机关查询",
                    linkto:vm.baseUrl + "tools/tools/officesearch.html",
                    style:"tool-9"
                },
                {
                    text:"企业信息查询",
                    linkto:vm.baseUrl + "tools/tools/compangsearch.html",
                    style:"tool-10"
                },{
                    text:"商标信息查询",
                    linkto:vm.baseUrl + "tools/tools/trademarkesearch.html",
                    style:"tool-11"
                },{
                    text:"失信被执行人查询",
                    linkto:vm.baseUrl + "tools/tools/promisesearch.html",
                    style:"tool-12"
                },
                {
                    text:"网址导航",
                    linkto:vm.baseUrl + "tools/tools/infosearch.html",
                    style:"tool-13"
                },{
                    text:"",
                    linkto:"javascript:void(0);",
                    style:"tool-14"
                },{
                    text:"",
                    linkto:"javascript:void(0);",
                    style:"tool-15"
                }
            ]
        }
    });
    $(function(){
        var mySwiper = new Swiper('#swiper-container1', {
            autoplay: 2500,//可选选项，自动滑动
            pagination : '.swiper-pagination'
        });
        serviceModel.getDetail();
        lawerModel.getList();
        toolsModel.isShow = true;
    })
    
    setTimeout(function(){
        var listRoot = $(".tool-list");
        var W = listRoot.width();
        listRoot.find("li.tool-max-icon").width(W/3).height(W/3);
        listRoot.find("li.tool-min-icon").width(W/3).height(W/3);
    },100);
    $(window).resize(function() {
        var listRoot = $(".tool-list");
        var W = listRoot.width();
        listRoot.find("li.tool-max-icon").width(W/3).height(W/3);
        listRoot.find("li.tool-min-icon").width(W/3).height(W/3);
    });
});