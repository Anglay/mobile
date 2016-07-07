/**
 * 项目公共方法 
 * 
 */
var LinkLawsCmn = {
		//root:"http://192.168.1.133/api/",
		root : "http://api.linklaws.com/",
		root2:"http://co.linklaws.com/",
		/**
		 * 解析URL参数
		 * @param {Object} name 参数名
		 * @memberOf {LinkLawsCmn}
		 * @return {String} 
		 */
		getUrlParam: function (name){
			var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
			if (reg.test(location.search)) {
				return decodeURIComponent(RegExp.$2.replace(/\+/g, " "));
			} else {
				return "";
			}
		},
		/***
		 * 获取当前时间 如:2015-07-16
		 */
		getCurrentTime:function (params){
			var date = new Date();
			this.year = date.getFullYear();
			this.month = date.getMonth() + 1;
			this.date = date.getDate();
			this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
			this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
			this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			
			var currentTime = "";
			if(params==0){
				currentTime = this.year + "-" + this.month + "-" + this.date;
			}else if(params==1){
				currentTime = this.year + "." + this.month + "." + this.date;
			}else if(params==2){
				currentTime = this.year + "年" + this.month + "月" + this.date + "日";
			}else if(params==3){
				currentTime = this.year + "-" + this.month + "-" + this.date + " " + this.hour + ":" + this.minute;
			}else if(params==4){
				currentTime = this.minute + ":" + this.second;
			}
			return currentTime;
		},
		 /**              
         * 日期 转换为 Unix时间戳
         * @param <string> 2014-01-01 20:20:20  日期格式              
         * @return <int>        unix时间戳(秒)              
         */
		DateToUnix: function(string) {
            var f = string.split(' ', 2);
            var d = (f[0] ? f[0] : '').split('-', 3);
            var t = (f[1] ? f[1] : '').split(':', 3);
            return (new Date(
                    parseInt(d[0], 10) || null,
                    (parseInt(d[1], 10) || 1) - 1,
                    parseInt(d[2], 10) || null,
                    parseInt(t[0], 10) || null,
                    parseInt(t[1], 10) || null,
                    parseInt(t[2], 10) || null
                    )).getTime() / 1000;
        },
		/**
		 * 返回上一页
		 */
		goBack:function(){
//			history.go(-1);
			history.back();
		},
		/**
		 * 用户意见反馈纠错
		 * @param title 标题
		 * @param uid 用户id（可为空）
		 * @param fid 纠错名id
		 * @Param fname 纠错名
		 * @param ftype 模块
		 * @param content 内容
		 * 
		 */
		feedback:function(options){
			var title = options.title || '意见反馈';
			var uid = options.uid || "00000000000000000000000";
			var param={};
			if (options.fid) {
				param.uid=options.uid;
				param.fid=options.fid;
				param.fname=options.fname+"(mobile)";
				param.ftype=options.ftype;
				param.content=options.content;
				var message;
				$.ajax({
					url:"../../../feedback!webchatSave.action",
					type:"post",
					dataType:"json",
					data:param,
					async:false,
					success:function(data){
						message=data;
					}
				});
				return message;
			}
		},
		isEqual:function(a,b){
			/**
			 * 判断是否相等
			 */
			if (a===b) {
				return true;
			}else{
				return false;
			}
		},
		getRandom : function(n){
			/**
			 * eg：
			 * 获取0-100的随机数——getRandom(100);
			 */
			return Math.floor(Math.random()*n+1)
        },
		getRandomList : function(n){
			/**
			 * 获取n位随机数
			 */
			var Random="";
			for ( var i = 0; i < n; i++) {  
				Random += parseInt(Math.random() * 9).toString();
		    }
			return Random;
		},
		urlEncode : function(str) { 
			/**
			 * 对URL进行encode加密
			 */
		    str = (str + '').toString();   
		    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').  
		    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');  
		},
		//图片处理
		adjustImgSize:function(img, boxWidth, boxHeight){
			var tempImg = new Image();          
			tempImg.src = img.attr('src');  
		    var imgWidth=tempImg.width;  
		    var imgHeight=tempImg.height; 
		    if(boxWidth/boxHeight>=imgWidth/imgHeight){  
		    	//重新设置img的width和height
		    	img.width(boxWidth);
		    	img.height((boxWidth*imgHeight)/imgWidth);
		    	//让图片居中显示  
		    	var margin=(boxHeight-img.height())/2;
		    	img.css("margin-top",margin);
		    }else{
		    	//重新设置img的width和height  
		    	img.width((boxHeight*imgWidth)/imgHeight);  
		    	img.height(boxHeight);
		    	//让图片居中显示  
		    	var margin=(boxWidth-img.width())/2;  
		    	img.css("margin-left",margin);  
		    }  
		},
		getFooterHtml:function(dom){
			var footerTextArray = 
			[{"icon":"icon1","url":"lawer/main.html","navtitle":"找律师"},
			{"icon":"icon2","url":"tools/tools.html","navtitle":"工具"},
			{"icon":"icon3","url":"center/user_center.html","navtitle":"我的"}];
			var footerHtml = "<div class='am-g'>";
			var linkhrefUrl = window.location.href;
			var chooseIndex = 0;
			if(linkhrefUrl.indexOf("app/tools")>0){
				chooseIndex = 1;
			}else if(linkhrefUrl.indexOf("app/center")>0){
				chooseIndex = 2;
			}
			$.each(footerTextArray,function(key,val){
				footerHtml +="<div class='am-u-sm-4 ";
				if(chooseIndex==key){
					footerHtml+= "footactive";
				};
				footerHtml+="'><a href='../"+footerTextArray[key].url+"'><div class='footericon "+footerTextArray[key].icon+"'></div>"+
				"<div class='deccolor footertitle'>"+footerTextArray[key].navtitle+"</div></a></div>";				
			})
			footerHtml +="</div>";
			$(dom).append(footerHtml);
		},
		isWap: function() {
			var userAgentInfo = navigator.userAgent;
			var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = false;
					break
				}
			}
			return flag
		}
};
$(function(){
	if (common.isWap()) {
		window.location.href="http://www.linklaws.com";
	}
})


/**
 * 退出
 */
function loginOut(){
	$.ajax({
		url:LinkLawsCmn.root+"login!mobileLogout.action",
		type:"post",
		dataType:"json",
		async:false,
		success:function(data){
			if (data.errorCode=="000000") {
				window.location.href="belogin.html";
			}
		}
	});
}
/**
 * 第三方数据接口
 */
var thirdDataUrl={
		qixinSearchListUrl:"http://api.qixin007.com/APIService/enterprise/searchListPaging",//企业信息列表查询
		qixinGetDetailById:"http://api.qixin007.com/APIService/enterprise/getDetailById"
//		qixinSearchListUrl:"http://120.26.126.121:2478/APIService/enterprise/searchList",//企业信息列表查询
//		qixinGetDetailById:"http://120.26.126.121:2478/APIService/enterprise/getDetailById"
}
/**
 * 本地存储：localStorage
 */
var localData = {
		init : function(){
			if (!window.localStorage) {
				alert("不支持本地存储");
				return false;
			}
		},
		set : function(key,value){
			//if (!localData.get(key)) {
				localStorage.setItem(key, value);
			//}
		},
		get : function(key){
			return localStorage.getItem(key);
		},
		//存储json对象
		setJson : function(key,jsonObj){
			try{
				localStorage.setItem(key,JSON.stringify(jsonObj));
				
			}catch(oException){
				if(oException.name == 'QuotaExceededError'){
					console.log('超出本地存储限额！');
					localStorage.clear();
				}

			}
			
		},
		//返回对象
		getJson : function(key){
			return JSON.parse(localStorage.getItem(key));
		},
		//获取所有存储数据，返回对象
		getAll : function(){
			var len = localStorage.length;
			if (len>=1) {
				var keyStr,obj={};
				for (var i = 0; i < len; i++) {
					kerStr = localStorage.key(i);
					obj[keyStr] = localStorage[keyStr];
				}
				return obj;
			}
		},
		//移除一对键值
		remove : function(key){
			if (localData.get(key)) {
				localStorage.removeItem(key);
			}
		},
		//清楚所有存储数据
		clear : function(){
			localStorage.clear();
		}
};
