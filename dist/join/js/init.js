/**
 * auther : ouyang
 * date : 2016-3-16
 * content : 加入我们
 */
seajs.config({
    // 别名配置
    alias: {
        'headback' : 'dist/module/head/head-back.js',
        'jobJson' : 'dist/module/job/jobData.js'
    }
});
define(function(require, exports, module) {
    require("headback");
    require("footer");
    var jobJson = require("jobJson");
    var joinModel = avalon.define("joinCtrl",function(vm){
    	vm.checkItem = function(index){
    		var _index = index;
    		$(".wraper-con>div").each(function(index){
    			if (index===_index) {
    				$(this).fadeIn().siblings().fadeOut();
    			};
    		});
    	};
    	vm.list = jobJson.jobList;
    	vm.linksidemenu = function(dom) {
	        $this = $(dom),
	        $next = $this.next();
	        $next.slideToggle();
	        $this.parent().toggleClass("groupopen");
	        $this.parent().siblings().removeClass("groupopen");
	        $this.parent().find(".jobicons").toggleClass("jobhover");
	        $this.closest(".jobgroup").siblings().find(".jobdeail").slideUp();
	        if ($this.parent().hasClass("groupopen")) {
	            if ($(document).height() - $this.parent().offset().top - $(".jobdeail").height() > $("footer").height() * 2) {
	                var targetOffset = $this.parent().offset().top - $(".jobdeail").height();
	                $("html,body").animate({
	                    scrollTop: targetOffset
	                },
	                500)
	            }
	        }
	    };
    });
});