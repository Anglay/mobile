/**
 * auther : ouyang
 * date : 2016-3-21
 * content : App下载
 */
seajs.config({
    // 别名配置
    alias: {
    }
});
define(function(require, exports, module) {
    require("head");
    require("footer");
    var productModel = avalon.define("productCtrl",function(vm){
    	vm.scrolldown = function(){
	        $('html,body').animate({scrollTop:$("#downproduct").offset().top -100}, 800);
	    }
	    vm.showLayer = function(){
	        $(".layer").fadeIn();
	    };
	    vm.hideLayer = function(){
	        $(".layer").fadeOut();
	    };
	    vm.downComputer = function(){
	        window.location.href = "http://co.linklaws.com/app/appload/android/new/co.apk";     
	    }
    });
    $(function(){
	    var u = navigator.userAgent;
	    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
	    if(isAndroid){
	        $(".linkiosbtn").hide();
	    }
	    if(isiOS){
	        $(".linkandroidbtn").hide();
	    }
	    /*var wow = new WOW({
	        mobile: true,
	        live: true
	    });
	    wow.init();*/
	})
});