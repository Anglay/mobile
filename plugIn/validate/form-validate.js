/*	String.prototype.trim = function() 
	{
		var x = this; 
		x = x.replace(/^\s*(.*)/, "$1"); 
		return x; 
	};*/


	
	jQuery.fn.extend({
		/**
		 * 
		 * @returns
		 */
		trim : function(){
			var x = $(this);
			x = x.replace(/^\s*(.*)/, "$1");
			return x;
		},
		/**
		 * 
		 * @param exp
		 * @returns
		 */
		regExpFn : function(exp,values) {
			switch(exp){

				case 'checkedUsername' :
					var regExpId = '^[\u2E80-\u9FFF]+$';
					var reg = new RegExp(regExpId);
					var isTrue = reg.test(values);
					return isTrue;
				break;
				
				case 'checkedRole' : 
					var regExpId = '^[a-z0-9_-]{1,3}$';
					var reg = new RegExp(regExpId);
					var isTrue = reg.test(values);
					return isTrue;
				break;
				
				case 'checkedTele' : 
					var regExpId = '^1[358][0-9]{9}$';
					var reg = new RegExp(regExpId);
					var isTrue = reg.test(values);
					return isTrue;
				break;
				
				case 'checkedNum' : 
					var regExpId = '^[a-z0-9_-]{3,16}$';
					var reg = new RegExp(regExpId);
					var isTrue = reg.test(values);
					return isTrue;
				break;
				
				case  'checkedEmail':
					var regExpId = '^([a-z0-9_\.-]+)@([\da-z0-9\.-]+)\.([a-z\.]{2,6})$';
					var reg = new RegExp(regExpId);
					var isTrue = reg.test(values);
					return isTrue;

				break;
				
				case 'checkedDate' :
					var regExpId = '^[a-z0-9_-]{3,16}$';
					var reg = new RegExp(regExpId);
					var isTrue = reg.test(values);
					return isTrue;
				break;
				case 'isOnLine':
					return true;
				break;
			}
		},
		
		setMonth : function(exp){
			switch(exp){
			
			case '一月' :
				
				return exp.replace(exp, '01');
			break;
			case '二月' : 
				return  exp.replace(exp, '02');
			break;
			case '三月' : 
				return  exp.replace(exp, '03');
			break;
			case '四月' : 
				return  exp.replace(exp, '04');
			break;
			case '五月' : 
				return  exp.replace(exp, '05');
			break;
			case '六月' : 
				return  exp.replace(exp, '06');
			break;
			case '七月' : 
				return  exp.replace(exp, '07');
			break;
			case '八月' : 
				return  exp.replace(exp, '08');
			break;
			case '九月' : 
				return  exp.replace(exp, '09');
			break;
			case '十月' : 
				return  exp.replace(exp, '10');
			break;
			case '十一月' : 
				return  exp.replace(exp, '11');
			break;
			case '十二月' : 
				return  exp.replace(exp, '12');
			break;
			
			}
		},
		
		/*selectDate : function(){

			var changeDate = $('.datetimepicker-days').find('.day.active').eq(0).html();
			var changeYM = $('.datetimepicker-days').find('.switch').eq(0).html().replace(' ','');
			var change_YM = $.setMonth(changeYM);
		},*/
		
		/**
		 * 
		 */
		splitToData : function(){

			var _this = $(this);
			_this.data('required', false);
			var _validates = _this.attr('validate-class');

			var _valid = _validates.replace('[', '').replace(']', '');

			strs = _valid.split(',');

			var strArr = new Array();
			var i, j = 0;
			for (i=0;i<strs.length ;i++ )
			{
				strs[i] = strs[i].replace( '{' ,'').replace('}', '').trim();
				
				strStr = strs[i].split(':');
				
				for(j=0;j<strStr.length; j=j+2){
					if(strStr[j]==''){
						
					}else{
						strStr[j+1] = strStr[j+1].replace(/^\'|\'$/g,'');

						_this.data(strStr[j], strStr[j+1]);
					}
				}
			}

			/*_this.removeData('required');
			_this.removeData('successMsg');
			_this.removeData('errorMsg');
			_this.removeData('nullMsg');*/

		},
		
		NullChecked : function(requires, isTrue){
			var _this = $(this);

			if(requires){
				
				if(isTrue){
					checkSU_ER();
				}
			}else{
				
			}
		},
		
		checkSU_ER : function(){
			
		},
		
	});

	jQuery.fn.extend({

		 /*init : function(){

			console.log('init');
			
		},*/
		
		version : '1.0',
		
		checkedLeader : function(){
			var isSuccess;
			var _this = $(this);

			
			_this.ready(function(){
				console.log('start');
			});
			
			_this.click(function(){

				var value;
				var value = _this.parent().find('.select2-choices');

				var values = value.find('.select2-search-choice');
				values = values.find('div').eq(0).html();
				values = $.trim(values);
				console.log(values);
				
				if(!!values){
					isSuccess = true;
				}else{
					isSuccess = false;
				}
				
				console.log(isSuccess);
				
				if(!isSuccess){
					value.css({ border : "1px solid #ddd"});
				}else{
					
					value.css({ border : "1px solid #080"});
					
				}
				
			});
			return isSuccess;

		},
		
		checkedSelects : function(){
			var isSuccess;
			var _this = $(this);

			_this.splitToData();
			_this.parent().find('.box-success-text').remove();
			_this.parent().find('.box-error-text').remove();
			_this.parent().find('.box-null-text').remove();
			_this.ready(function(){

				var values = _this.val();
				values = values.replace('-', '');
				
				values = $.isNumeric(values);

					isSuccess = values;
					//console.log(isSuccess+'--isSuccess = values');
				if (values == 'undefined'){
					isSuccess = false;
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
					_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
				}else if(!!values){
					_this.css({
						border : "1px solid #080"
					});
					isSuccess = true;
					_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
					_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
				}
			});
			
			_this.click(function() {

				_this.splitToData();
				_this.parent().find('.box-success-text').remove();
				_this.parent().find('.box-error-text').remove();
				_this.parent().find('.box-null-text').remove();
				var values = _this.val();
				
				var values = $.isNumeric(values);
				

				isSuccess = values;

				//console.log(isSuccess+'--isSuccess = values');
				if (!values ) {

					$(this).css({
						border : "1px solid #e5e5e5"
					});
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-exclamation tooltips box-null-text'></i>");
					_this.parent().append("<div class='box-null-text'>"+ _this.data('nullMsg') +"</div>");
					_this.css({
						border: "1px solid #dfba49"
					});

				} else if(values){

					_this.parent().find('.box-success-text').remove();
					_this.parent().find('.box-error-text').remove();
					_this.parent().find('.box-null-text').remove();
					$(this).css({
						border : "1px solid #080"
					});

					_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
					_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
					
				}else{
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
					$(this).parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
					
				}

			});
			
			
			_this.blur(function() {

				_this.splitToData();
				_this.parent().find('.box-success-text').remove();
				_this.parent().find('.box-error-text').remove();
				_this.parent().find('.box-null-text').remove();
				var values = _this.val();

				values = values.replace('-', '');
				
				var values = $.isNumeric(values);

				isSuccess = values;

				console.log(isSuccess+'--isSuccess = values');
				if (!values ) {

					$(this).css({
						border : "1px solid #e5e5e5"
					});
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-exclamation tooltips box-null-text'></i>");
					_this.parent().append("<div class='box-null-text'>"+ _this.data('nullMsg') +"</div>");
					_this.css({
						border: "1px solid #dfba49"
					});

				} else if(values){

					_this.parent().find('.box-success-text').remove();
					_this.parent().find('.box-error-text').remove();
					_this.parent().find('.box-null-text').remove();
					$(this).css({
						border : "1px solid #080"
					});

					_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
					_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
					
				}else{
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
					$(this).parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
					
				}

			});
			return isSuccess;
		},
		
		
		checkedNull : function(){
			var isSuccess;

			var _this = $(this);
			
			_this.parent().find('.box-success-text').remove();
			_this.parent().find('.box-error-text').remove();
			_this.parent().find('.box-null-text').remove();
			
			_this.ready(function(){

				_this.splitToData();

				var requires = _this.data('required');
				var values = _this.val();
				var values = $.trim(values);
				
				
				if(!values){
					
					
				}else{

					var isTrue = _this.regExpFn('checkedUsername', values);
					if (!isTrue){
						isSuccess = false;
						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
						
					}else{
						_this.css({
							border : "1px solid #080"
						});
						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
						isSuccess = true;
						_this.find('.input-icon > i').css({
							'color' : '#080',
						});
					}
				}

			});
			
			_this.click(function(){

				$(this).parent().find('.box-success-text').remove();
				$(this).parent().find('.box-error-text').remove();
				$(this).parent().find('.box-null-text').remove();
				_this.splitToData();

				var requires = _this.data('required');
				var values = _this.val();
				var values = $.trim(values);
				
				
				if(values){

					var isTrue = _this.regExpFn('checkedUsername', values);
					if (!isTrue){
						isSuccess = false;
						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
						
					}else{
						_this.css({
							border : "1px solid #080"
						});
						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
						isSuccess = true;
						_this.find('.input-icon > i').css({
							'color' : '#080',
						});
					}
					
				}else{
					/*_this.css({
						border : "1px solid #dfba49"
					});
					
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-exclamation tooltips box-null-text'></i>");
					_this.parent().append("<span class='box-null-text'>"+ _this.data('nullMsg') +"</span>");*/
					
				}
			});
			
			
			_this.blur(function() {

				_this.splitToData();
				console.log(_this.data('required'));
				console.log(_this.data('successMsg'));
				console.log(_this.data('errorMsg'));
				console.log(_this.data('nullMsg'));
				var requires = _this.data('required');

				var values = _this.val();
				var values = $.trim(values);

				if(!values){

					$(this).parent().find('.box-success-text').remove();
					$(this).parent().find('.box-error-text').remove();
					$(this).parent().find('.box-null-text').remove();

					_this.css({
						border : "1px solid #dfba49"
					});
					
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-exclamation tooltips box-null-text'></i>");
					_this.parent().append("<span class='box-null-text'>"+ _this.data('nullMsg') +"</span>");
					
				}else{
					var isTrue = _this.regExpFn('checkedUsername', values);
					
					
					if (!isTrue){
						isSuccess = false;

						_this.css({
							border : "1px solid #d64635"
						});

						$(this).parent().find('.box-success-text').remove();
						$(this).parent().find('.box-error-text').remove();
						$(this).parent().find('.box-null-text').remove();
						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
						
					}else{

						_this.css({
							border : "1px solid #080"
						});

						$(this).parent().find('.box-success-text').remove();
						$(this).parent().find('.box-error-text').remove();
						$(this).parent().find('.box-null-text').remove();
						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
						isSuccess = true;
					}
				}

				_this.removeData('required');
				_this.removeData('successMsg');
				_this.removeData('errorMsg');
				_this.removeData('nullMsg');

			});
			

			return isSuccess;

		},
		

		signupForm : function(){
			
			
		},
		
		/**
		 * 
		 * @param successMsg
		 * @param errorMsg
		 * @param nullMsg
		 * @returns
		 */

		checkedUsername : function() {
			var isSuccess;

			var _this = $(this);
			
			_this.parent().find('.box-success-text').remove();
			_this.parent().find('.box-error-text').remove();
			_this.parent().find('.box-null-text').remove();
			
			_this.ready(function(){

				_this.splitToData();

				var requires = _this.data('required');
				var values = _this.val();
				var values = $.trim(values);
				
				
				if(!values){
					
					
				}else{

					var isTrue = _this.regExpFn('checkedUsername', values);
					if (!isTrue){
						isSuccess = false;
						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
						
					}else{
						_this.css({
							border : "1px solid #080"
						});
						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
						isSuccess = true;
						_this.find('.input-icon > i').css({
							'color' : '#080',
						});
					}
				}

			});
			
			_this.click(function(){

				$(this).parent().find('.box-success-text').remove();
				$(this).parent().find('.box-error-text').remove();
				$(this).parent().find('.box-null-text').remove();
				_this.splitToData();

				var requires = _this.data('required');
				var values = _this.val();
				var values = $.trim(values);
				
				
				if(values){
					

					var isTrue = _this.regExpFn('checkedUsername', values);
					if (!isTrue){
						isSuccess = false;
						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
						
					}else{
						_this.css({
							border : "1px solid #080"
						});
						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
						isSuccess = true;
						_this.find('.input-icon > i').css({
							'color' : '#080',
						});
					}
					
				}else{
					/*_this.css({
						border : "1px solid #dfba49"
					});
					
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-exclamation tooltips box-null-text'></i>");
					_this.parent().append("<span class='box-null-text'>"+ _this.data('nullMsg') +"</span>");*/
					
				}
			});
			
			
			_this.blur(function() {

				_this.splitToData();
				console.log(_this.data('required'));
				console.log(_this.data('successMsg'));
				console.log(_this.data('errorMsg'));
				console.log(_this.data('nullMsg'));
				var requires = _this.data('required');

				var values = _this.val();
				var values = $.trim(values);

				if(!values){

					$(this).parent().find('.box-success-text').remove();
					$(this).parent().find('.box-error-text').remove();
					$(this).parent().find('.box-null-text').remove();

					_this.css({
						border : "1px solid #dfba49"
					});
					
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-exclamation tooltips box-null-text'></i>");
					_this.parent().append("<span class='box-null-text'>"+ _this.data('nullMsg') +"</span>");
					
				}else{
					var isTrue = _this.regExpFn('checkedUsername', values);
					
					
					if (!isTrue){
						isSuccess = false;

						_this.css({
							border : "1px solid #d64635"
						});

						$(this).parent().find('.box-success-text').remove();
						$(this).parent().find('.box-error-text').remove();
						$(this).parent().find('.box-null-text').remove();
						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
						
					}else{

						_this.css({
							border : "1px solid #080"
						});

						$(this).parent().find('.box-success-text').remove();
						$(this).parent().find('.box-error-text').remove();
						$(this).parent().find('.box-null-text').remove();
						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
						isSuccess = true;
					}
				}

				_this.removeData('required');
				_this.removeData('successMsg');
				_this.removeData('errorMsg');
				_this.removeData('nullMsg');

			});
			

			return isSuccess;

		},
		

		checkedSex : function() {
			
		},

		/**
		 * 
		 * @param successMsg
		 * @param errorMsg
		 * @param nullMsg
		 * @returns
		 */
		checkedRole : function (){
			var isSuccess;
			var _this = $(this);

			_this.splitToData();
			_this.parent().find('.box-success-text').remove();
			_this.parent().find('.box-error-text').remove();
			_this.parent().find('.box-null-text').remove();
			/*_this.parent().find('.box-error-text').css({
				'color' : '#fff'
			});
			_this.parent().find('.box-success-text').css({
				'color' : '#fff'
			});
			_this.parent().find('.box-null-text').css({
				'color' : '#fff'
			});*/
			_this.ready(function(){
				
				_this.splitToData();

				var requires = _this.data('required');
				var values = _this.val();
				var values = $.trim(values);
				
				
				if(!values){
					
					
				}else{

					var isTrue = _this.regExpFn('checkedRole', values);
					if (!isTrue){
						isSuccess = false;
						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
						
					}else{
						_this.css({
							border : "1px solid #080"
						});
						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
						isSuccess = true;
						_this.find('.input-icon > i').css({
							'color' : '#080',
						});
					}
				}
			});
			
			_this.click(function() {

				_this.splitToData();
				_this.parent().find('.box-success-text').remove();
				_this.parent().find('.box-error-text').remove();
				_this.parent().find('.box-null-text').remove();
				var values = $(this).val();

				var values = $.trim(values);
				
				if(values == ''){
					
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-exclamation tooltips box-null-text'></i>");
					_this.parent().append("<div class='box-null-text'>"+ _this.data('nullMsg') +"</div>");
					
					_this.css({
						border : "1px solid #dfba49"
					});
				}else{

					var isTrue = _this.regExpFn('checkedRole', values);
					
						
					if (!isTrue) {
						console.log('不匹配');

						$(this).css({
							border : "1px solid #d64635"
						});
						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");

					} else {

						$(this).css({
							border : "1px solid #080"
						});

						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
						
					}
				}
			});
			
			_this.blur(function() {

				_this.splitToData();
				_this.parent().find('.box-success-text').remove();
				_this.parent().find('.box-error-text').remove();
				_this.parent().find('.box-null-text').remove();
				var values = $(this).val();

				var isTrue  = _this.regExpFn('checkedRole', values);
				
					
				if (!isTrue) {

					$(this).css({
						border : "1px solid #d64635"
					});
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
					$(this).parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
					
				} else {

					_this.css({
						border : "1px solid #080"
					});
					
					_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
					_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
					

				}

			});
			return isSuccess;

		},
		
		/**
		 * 
		 * @param successMsg
		 * @param errorMsg
		 * @param nullMsg
		 * @returns
		 */
		checkedNum : function (){
			
			var isSuccess;
			
			var _this = $(this);
			/*
			_this.parent().find('.box-success-text').remove();
			_this.parent().find('.box-error-text').remove();
			_this.parent().find('.box-null-text').remove();*/

			_this.ready(function(){
				
				_this.splitToData();

				var requires = _this.data('required');
				var values = _this.val();
				var values = $.trim(values);
				
				
				if(!values){
					
					
				}else{

					var isTrue = _this.regExpFn('checkedNum', values);
					if (!isTrue){
						isSuccess = false;
						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
						
					}else{
						_this.css({
							border : "1px solid #080"
						});
						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
						isSuccess = true;
						_this.find('.input-icon > i').css({
							'color' : '#080',
						});
					}
				}
				
			});
			
			
			_this.blur(function() {

				_this.splitToData();
				
				var requires = _this.data('required');
				console.log(requires);
				_this.parent().find('.box-success-text').remove();
				_this.parent().find('.box-error-text').remove();
				_this.parent().find('.box-null-text').remove();
				var values = $(this).val();
				var values =$.trim(values);

				if(values == ''){
					$(this).parent().append("<div class='box-null-text'>"+ _this.data('nullMsg') +"</div>");
					$(this).css({
						border : "1px solid #dfba49"
					});
				}else{

					var isTrue = _this.regExpFn('checkedNum', values);

					if (!isTrue) {
						isSuccess = false;
						$(this).parent().find('.box-success-text').remove();
						$(this).parent().find('.box-error-text').remove();
						$(this).parent().find('.box-null-text').remove();
						$(this).css({
							border : "1px solid #d64635"
						});


						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
						$(this).parent().append("<div class='box-error-text'>"+ _this.data('errorMsg') +"</div>");
						
					} else {
						isSuccess = true;
						$(this).parent().find('.box-success-text').remove();
						$(this).parent().find('.box-error-text').remove();
						$(this).parent().find('.box-null-text').remove();
						$(this).css({
							border : "1px solid #080"
						});

							_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
							_this.parent().append("<div class='box-success-text'>"+ _this.data('successMsg') +"</div>");

					}
				}
			});
			

			return isSuccess;
		},
		
		/**
		 * 
		 * @param successMsg
		 * @param errorMsg
		 * @param nullMsg
		 * @returns
		 */
		checkedTele : function (){

			var _this = $(this);
			_this.parent().find('.box-success-text').remove();
			_this.parent().find('.box-error-text').remove();
			_this.parent().find('.box-null-text').remove();
			var isSuccess;

			_this.ready(function(){

				_this.splitToData();

				var requires = _this.data('required');
				var values = _this.val();
				var values = $.trim(values);
				
				
				if(!values){
					
					
				}else{

					var isTrue = _this.regExpFn('checkedTele', values);
					if (!isTrue){
						isSuccess = false;
						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
						
					}else{
						_this.css({
							border : "1px solid #080"
						});
						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
						isSuccess = true;
						_this.find('.input-icon > i').css({
							'color' : '#080',
						});
					}
				}
			});
			
			_this.blur(function() {

				_this.splitToData();
				var values = $(this).val();
				var values = $.trim(values);

				_this.parent().find('.box-success-text').remove();
				_this.parent().find('.box-error-text').remove();
				_this.parent().find('.box-null-text').remove();
				if(values == ''){
					_this.parent().find('.box-success-text').remove();
					_this.parent().find('.box-error-text').remove();
					_this.parent().find('.box-null-text').remove();
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-exclamation tooltips box-null-text'></i>");
					_this.parent().append("<span class='box-null-text'>"+ _this.data('nullMsg') +"</span>");
					$(this).css({
						border : "1px solid #dfba49"
					});
					
				}else{

					var isTrue = _this.regExpFn('checkedTele', values);
					
					if (!isTrue) {
						isSuccess = false;
						$(this).css({
							border : "1px solid #d64635"
						});

						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
						
						var isSuccess = false;
					} else {
						isSuccess = true;
						_this.parent().find('.box-success-text').remove();
						_this.parent().find('.box-error-text').remove();
						_this.parent().find('.box-null-text').remove();
						$(this).css({
							border : "1px solid #080"
						});

						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
						
						
						var isSuccess = true;

					}
				}
			});
			

			
			return isSuccess;

		},

		/**
		 * 
		 * @param successMsg
		 * @param errorMsg
		 * @param nullMsg
		 * @returns
		 */
		checkedEmail : function (){
			
			var isSuccess;
			var _this = $(this);

			_this.splitToData();
			_this.parent().find('.box-success-text').remove();
			_this.parent().find('.box-error-text').remove();
			_this.parent().find('.box-null-text').remove();
			
			_this.ready(function(){

				_this.splitToData();

				var requires = _this.data('required');
				var values = _this.val();
				var values = $.trim(values);
				
				
				if(!values){
					
					
				}else{

					var isTrue = _this.regExpFn('checkedNum', values);
					if (!isTrue){
						isSuccess = false;
						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
						
					}else{
						_this.css({
							border : "1px solid #080"
						});
						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
						isSuccess = true;
						_this.find('.input-icon > i').css({
							'color' : '#080',
						});
					}
				}
				
			});
			
			
			
			_this.blur(function() {

				_this.splitToData();
				_this.parent().find('.box-success-text').remove();
				_this.parent().find('.box-error-text').remove();
				_this.parent().find('.box-null-text').remove();
				var values = $(this).val();
				var values =  values.trim();
				var isTrue = _this.regExpFn('checkedEmail', values);
				
				if(!values){
					_this.parent().find('.box-success-text').remove();
					_this.parent().find('.box-error-text').remove();
					_this.parent().find('.box-null-text').remove();
					$(this).css({
						border : "1px solid #dfba49"
					});
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-exclamation tooltips box-null-text'></i>");
					_this.parent().append("<div class='box-null-text'>"+ _this.data('nullMsg') +"</div>");
				}else{
					if (isTrue) {
						isSuccess = true;
						$(this).css({
							border : "1px solid #080"
						});

						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
							
					}else{
						isSuccess = false;
						_this.parent().find('.box-success-text').remove();
						_this.parent().find('.box-error-text').remove();
						_this.parent().find('.box-null-text').remove();
						$(this).css({
							border : "1px solid #d64635"
						});

						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");

					}
				}
				
				
				/*if (!isTrue) {
					isSuccess = false;
					_this.parent().find('.box-success-text').remove();
					_this.parent().find('.box-error-text').remove();
					_this.parent().find('.box-null-text').remove();
					$(this).css({
						border : "1px solid #d64635"
					});

					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
					_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");

				} else {
					isSuccess = true;
					$(this).css({
						border : "1px solid #080"
					});

					_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
					_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
									
				}*/

			});
			return isSuccess;

		},
		

		/**
		 * 
		 * @param successMsg
		 * @param errorMsg
		 * @param nullMsg
		 * @returns
		 */
		checkedDate : function (){

			var _this = $(this);
			var isSuccess;

			_this.parent().find('.box-success-text').remove();
			_this.parent().find('.box-error-text').remove();
			_this.parent().find('.box-null-text').remove();
			
			_this.ready(function(){

				_this.splitToData();
				var values = _this.val();
				var values = values.trim();
				var isTrue = _this.regExpFn('checkedDate', values);
					
				if(!values){
					
				}else{
					if (isTrue){
						isSuccess = true;
						_this.css({
							border : "1px solid #080"
						});
						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
						
					}else{
						isSuccess = false;
						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
						
					}
				}
			});
			
			
			_this.click(function(){

				/*	_this.splitToData();
				_this.parent().find('.box-success-text').remove();
				_this.parent().find('.box-error-text').remove();
				_this.parent().find('.box-null-text').remove();
				var values = $(this).val();
				
				var isTrue  = _this.regExpFn('checkedDate', values);
				
				if(!values){
					_this.parent().find('.box-success-text').remove();
					_this.parent().find('.box-error-text').remove();
					_this.parent().find('.box-null-text').remove();
					$(this).css({
						border : "1px solid #dfba49"
					});
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-exclamation tooltips box-null-text'></i>");
					_this.parent().append("<div class='box-null-text'>"+ _this.data('nullMsg') +"</div>");
				}else{
					if (isTrue) {
						isSuccess = true;
						$(this).css({
							border : "1px solid #080"
						});

						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
							
					}else{
						isSuccess = false;
						_this.parent().find('.box-success-text').remove();
						_this.parent().find('.box-error-text').remove();
						_this.parent().find('.box-null-text').remove();
						$(this).css({
							border : "1px solid #d64635"
						});

						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");

					}
				}*/
				
				
			});
			
			_this.blur(function() {

				_this.splitToData();
				var values = $(this).val();
				var values = $.trim(values);
				console.log(values);
				
				var changeDate = $('.datetimepicker-days').find('.day.active').eq(0).html();
				//var changeYM = $('.datetimepicker-days').find('.switch').eq(0).html().replace(' ','');
				//changeYM = changeYM.repalceAll('四月', '04');
				/*console.log(changeYM);
				console.log(changeDate);
				var change_YM = $(this).setMonth(changeYM);
				console.log(change_YM);*/
				
				
				var isTrue  = _this.regExpFn('checkedDate', values);
				
				_this.parent().find('.box-success-text').remove();
				_this.parent().find('.box-error-text').remove();
				_this.parent().find('.box-null-text').remove();
				
				
				if(!values){
					_this.parent().find('.box-success-text').remove();
					_this.parent().find('.box-error-text').remove();
					_this.parent().find('.box-null-text').remove();
					$(this).css({
						border : "1px solid #e5e5e5"
					});
					/*_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-exclamation tooltips box-null-text'></i>");
					_this.parent().append("<div class='box-null-text'>"+ _this.data('nullMsg') +"</div>");*/
				}else{
					
					if (isTrue) {
						isSuccess = true;
						$(this).css({
							border : "1px solid #080"
						});

						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
							
					}else{
						isSuccess = false;
						_this.parent().find('.box-success-text').remove();
						_this.parent().find('.box-error-text').remove();
						_this.parent().find('.box-null-text').remove();
						$(this).css({
							border : "1px solid #d64635"
						});

						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");

					}
				}

			});

			
			return isSuccess;

		},
		
		
		/**
		 * 
		 * @param successMsg
		 * @param errorMsg
		 * @param nullMsg
		 * @returns
		 */

		isOnLine : function(){
			var isSuccess;
			var _this = $(this);

			_this.splitToData();
			_this.parent().find('.box-success-text').remove();
			_this.parent().find('.box-error-text').remove();
			_this.parent().find('.box-null-text').remove();
			_this.ready(function(){

				var values = _this.val();
				
				var values = $.isNumeric(values);

					isSuccess = values;
				if (values == 'undefined'){
					isSuccess = false;
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
					$(this).parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
				}else if(!!values){
					_this.css({
						border : "1px solid #080"
					});
					isSuccess = true;
					_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
					_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
				}
			});
			
			_this.click(function() {

				_this.splitToData();
				_this.parent().find('.box-success-text').remove();
				_this.parent().find('.box-error-text').remove();
				_this.parent().find('.box-null-text').remove();
				var values = _this.val();

				var values = $.isNumeric(values);
				

				if (!values ) {
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-exclamation tooltips box-null-text'></i>");
					_this.parent().append("<div class='box-null-text'>"+ _this.data('nullMsg') +"</div>");
					_this.css({
						border: "1px solid #dfba49"
					});

				} else if(values == '1' || values == '99'){

					_this.css({
						border : "1px solid #080"
					});

					_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
					_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
					

				}else{
					
				}

			});
			
			
			$(this).blur(function() {

				_this.splitToData();
				_this.parent().find('.box-success-text').remove();
				_this.parent().find('.box-error-text').remove();
				_this.parent().find('.box-null-text').remove();
				var values = $(this).val();
				
				var values = $.isNumeric(values);

				if (!values ) {

					$(this).css({
						border : "1px solid #e5e5e5"
					});
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-exclamation tooltips box-null-text'></i>");
					_this.parent().append("<div class='box-null-text'>"+ _this.data('nullMsg') +"</div>");
					_this.css({
						border: "1px solid #dfba49"
					});

				} else if(values == '1' || values == '99'){

					_this.parent().find('.box-success-text').remove();
					_this.parent().find('.box-error-text').remove();
					_this.parent().find('.box-null-text').remove();
					$(this).css({
						border : "1px solid #080"
					});

					_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
					_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
					
				}else{
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
					$(this).parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
					
				}
				
				_this.find('.box-success-text').css({
					'display' : 'inline-block',
					'font-size':'14px',
					'line-height': '14px',
					'margin-top' : '1px',
					'float' : 'left',
					'left' : '8px'
				});

			});
			return isSuccess;

		},
		
		/**
		 * 
		 * @param successMsg
		 * @param errorMsg
		 * @param nullMsg
		 * @returns
		 */
		clickisTrue : function(){
			
			var isSuccess;
			var _this = $(this);

			_this.splitToData();
			_this.parent().find('.box-success-text').remove();
			_this.parent().find('.box-error-text').remove();
			_this.parent().find('.box-null-text').remove();
			
			var value1 = _this.parent().find('input[type=radio]')[0].checked;
			var value2 = _this.parent().find('input[type=radio]')[1].checked;
			
			_this.ready(function(){
				
				if(value1=='undefined' || value2 == 'undefined'){
					isSuccess = false;
				}else if(value1 || value2 ){
					isSuccess = true;
					_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
					_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
				}else{
					isSuccess = false;
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
					$(this).parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
				}
				
/*				_this.splitToData();

				var requires = _this.data('required');
				var values = _this.val();
				var values = $.trim(values);
				
				
				if(!values){
					
					
				}else{

					var isTrue = _this.regExpFn('checkedNum', values);
					if (!isTrue){
						isSuccess = false;
						_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text box-error-text'></i>");
						_this.parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
						
					}else{
						_this.css({
							border : "1px solid #080"
						});
						_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
						_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
						isSuccess = true;
						_this.find('.input-icon > i').css({
							'color' : '#080',
						});
					}
				}*/
			});
			
			_this.click(function() {

				_this.splitToData();
				_this.parent().find('.box-success-text').remove();
				_this.parent().find('.box-error-text').remove();
				_this.parent().find('.box-null-text').remove();
				
				if(value1=='undefined' && value2 == 'undefined'){
					isSuccess = false;
				}else if(value1 || value2 ){
					isSuccess = true;
					_this.parent().append("<i data-original-title='success input!' class='fa fa-check tooltips box-success-text'></i>");
					_this.parent().append("<span class='box-success-text'>"+ _this.data('successMsg') +"</span>");
				}else{
					isSuccess = false;
					_this.parent().append("<i data-original-title='please write a valid email' class='fa fa-warning tooltips box-error-text'></i>");
					$(this).parent().append("<span class='box-error-text'>"+ _this.data('errorMsg') +"</span>");
				}

			});
			return isSuccess;

		},
		
		/**
		 * 
		 */
	/*	CheckSite: function(){
			$(this).blur(function(){
				var check; 
				var WebSite=$(this).val(); 
				var reg= /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/; 
				if(WebSite=='') check=1; 
				else if(!reg.test(WebSite)) check=16; 
				else check=0; 
				$(this).next().remove("span"); 
				$(this).after("<span class='"+ErrorClass[check]+"'>"+ErrorWords[check]+"</span>"); 
			});
		},*/

	});

