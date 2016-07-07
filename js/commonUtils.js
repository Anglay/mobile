function SetCookie(name,value)
{
	var Days = 1; //此 cookie 将被保存 30 天
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

///删除cookie
function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

//读取cookie
function getCookie(name)
{
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null)
	{
		return unescape(arr[2]);
	}else{
		return null;
	}
}

//根据身份证号判断性别
function getGender(idCard){//身份证
	if (parseInt(idCard.substr(idCard.length-2, 1)) % 2 == 1) { 
		return '先生';
	} else { 
		return '女士'; 
	}
}
//密码强度
function pwdPower(e){
	Nb_L=/^[A-Za-z]+$/;//包含字母
	Nb_N=/^[0-9]*$/;//包含数字
	Nb_S=/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/; //包含特殊字符
	Nb_LN=/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;//包含字母和数字
	Nb_LNS=/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W])[\da-zA-Z\W]{8,}$/;//包含字母数字和特殊字符
	var psw = e.val();
	
	if(psw.length>5){
		if((Nb_L.test(psw))||(Nb_N.test(psw))||(Nb_S.test(psw))){
			e.nextAll("dl.strength-box").find(".c1").show();
			e.nextAll("dl.strength-box").find(".c2").hide();
			e.nextAll("dl.strength-box").find(".c3").hide();
		}
		if(Nb_LN.test(psw)){
			e.nextAll("dl.strength-box").find(".c1").show();
			e.nextAll("dl.strength-box").find(".c2").show();
			e.nextAll("dl.strength-box").find(".c3").hide();
		}
		if(Nb_LNS.test(psw)){
			e.nextAll("dl.strength-box").find(".c1").show();
			e.nextAll("dl.strength-box").find(".c2").show();
			e.nextAll("dl.strength-box").find(".c3").show();
		}
	}else{
		e.nextAll("dl.strength-box").find(".c1").hide();
		e.nextAll("dl.strength-box").find(".c2").hide();
		e.nextAll("dl.strength-box").find(".c3").hide();
	}  
}; 

////创建js、css文件:createjscssfile("android2.3.css","css");
function createjscssfile(filename, filetype) {
  var fileref;
  if (filetype === "js") {  
    fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);
    document.documentElement.appendChild(fileref);  

  } else if (filetype === "css") {
    fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
    document.documentElement.appendChild(fileref);  
  }
};

/*
 * Storage存储 - 适用于存储不具有时限的永久数据
 */
(function(){
    var StorageWidget = {
        __backend__: null,
        storeList:{},
        init:function(){
            var that = this;
            if(window.localStorage){  //使用localStorage存储
                try{
                    that.__backend__ = window.localStorage;
                    that.__backend__["__type__"] = "ls";
                }catch(e){

                }
            }else if(window.globalStorage){//globalStorage存储
                try{
                    that.__backend__ = window.globalStorage;
                    that.__backend__["__type__"] = "gs";
                 }catch(e){

                 }
            }else if(document.cookie){ //使用cookie存储
                try{
                    that.__backend__ = CookieWidget.__backend__; 
                    that.__backend__["__type__"] = "ck";
                }catch(e){

                }
            }else{
                this.backend = {
                  getItem: function() { return null; },
                  setItem: function() {},
                  __type__: 'dummy'
                };
            }
        },
        /*
         * 根据键获取Storage里对应的值
         * param{String} k-键
         * param{String} d-默认值（未获取到或者失败）
         */
        getItem: function(k, d) {
          	var v = null;
          	try {
              	v = this.__backend__.getItem(k);
              	if (v !== null) {
                 	v = JSON.parse(v + '') || d;
              	} else {
                 	v = d;
              	}
          	}catch(ex) {
              	v = d;
          	}
          	return v;
        },
        setItem: function(k, v,expire) {
          	var that = this;
          	try {
              	that.__backend__.setItem(k, JSON.stringify(v));
                that.storeList[k] = 1;
          	} catch (ex){}
        },
        //强制清除本地存储在stroage里的信息（localStorage、globalStorage必须手动清除）
        clear:function(){
          	var that = this,
              	storeList = that.storeList;
            	var lastTime = StorageWidget.getItem("n_2014_s_version"); //区分2013版本
          	if(lastTime != __version__){
              	if(__clears__ && __clears__.length){
                   	$.each(__clears__,function(h,k){
                        that.setItem(k,"");  
                   	});
              	}else{
                    $.each(storeList,function(i,n){
                        that.setItem(i,"");
                    });
            	}
            	//CookieWidget.setItem("n_user_data","");
            	that.setItem("n_2014_s_version",__version__); //区分2013版本
          	}
      	}
    };
    StorageWidget.init();
    if(!window.StorageWidget) window.StorageWidget = StorageWidget;
})();