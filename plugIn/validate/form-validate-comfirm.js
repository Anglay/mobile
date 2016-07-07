	
	jQuery.fn.extend({
		/**
		*	提交检验输出参数是否全部符合规则
		*
		*
		*/
		/*CheckUnameAjax : function(){

			$.ajax({
				type: "POST", 
				contentType:"application/json;utf-8", 
				url: "", 
				data:"", 
				dataType: 'json', 
				anysc:false, 
				success:function(data){
					
				},
				error:function(){
					
				}
			}); 
		},*/
		
		SumbitBtn : function(){
			var _this = $(this);
			var ischecked = true;
			var isTotal = new Array();
			var isTrue = new Array();
			var isNum = new Array();
			
			//var $form = $(BTCCommon.content()).find('#signupForm');
			var $form = $('#signupForm');
			var arrNum = new Array();
			
			console.log('start');
			isNum[0] = $form.find('#name').checkedUsername();
			isNum[1] = $form.find('#role').checkedRole();
			isNum[2] = $form.find('#mobile').checkedTele();
			isNum[3] = $form.find('#enterdate').checkedDate();
			isNum[4] = $form.find('#onLine').isOnLine();
			isNum[5] = $form.find('#sex').clickisTrue();
			isNum[6] = $form.find('#number').checkedNum();
			isNum[7] = $form.find('#email').checkedEmail();
			isNum[8] = $form.find('#exitdateString').checkedDate();
			
			for(var i=0;i<isNum.length;i++){
				var arrs = isNum[i];
				if(arrs){
					isTrue[i] = 1; 
				}else{
					isTrue[i] = 0;
				}
				console.log(isTrue[i] + '---isTrue'+(i+1));
				
				isTotal.push(isTrue[i]);
			}
			
			for(var j=0; j < isTotal.length; j++){

				console.log(isTotal[j] == 1);
				if(isTotal[j] == 1){

				}else{
					ischecked = false;
				}
			}
			
			console.log(isTotal + 'isTotals');
			
			// && isNum7
			if (ischecked) {

				/*$.ajax({
					type: "POST", 
					contentType:"application/json;utf-8", 
					//提交地址
					url: "",
					//传输数据
					data:"", 
					dataType: 'json', 
					anysc:false, 
					success:function(data){
						//返回数据
						alert('提交成功！'+',返回'+data);
						console.log('SumbitBtn'+'已经提交过');
					},
					error:function(){
						console.log('提交不成功!');
					}
				}); */
				console.log('已经提交成功！');
				
			}else{
				console.log('检验不成功!');
			}
		},
	});
	

	//var $form = $(BTCCommon.content()).find('#signupForm');

	var $form = $('#signupForm');


	$form.find('#name').checkedUsername();
	$form.find('#role').checkedRole();
	$form.find('#number').checkedNum();
	$form.find('#mobile').checkedTele();
	$form.find('#email').checkedEmail();
	
	
	$form.find('#onLine').isOnLine();
	$form.find('#sex').clickisTrue();
	$form.find('#enterdate').checkedDate();
	$form.find('#exitdateString').checkedDate();

	//$(this).checkedUsername();

	$form.find('#SumBtn').click(function() {
		$(this).SumbitBtn();
	});
	
	
	
	
	/*function CheckedForm(){

		var ischecked = true;
		var isTotal = new Array();
		var isTrue = new Array();
		var isNum = new Array();
		
		//var $form = $(BTCCommon.content()).find('#signupForm');
		var $form = $('#signupForm');
	
		isNum[0] = $form.find('#name').checkedUsername( '正确', '用户格式错误', '不能为空');
		isNum[1] = $form.find('#role').checkedRole( '正确', '角色格式错误', '不能为空');
		isNum[2] = $form.find('#mobile').checkedTele( '正确', '手机号码格式错误', '不能为空');
		isNum[3] = $form.find('#enterdate').checkedDate( '正确', '未选择入职时间', '不能为空');
		isNum[4] = $form.find('#onLine').isOnLine( '已选择', '未选择', '不能为空');
		isNum[5] = $form.find('#sex').clickisTrue( '已选择', '未选择', '不能为空');
		isNum[6] = $form.find('#number').checkedNum( '正确', '工号格式错误', '不能为空');
		isNum[7] = $form.find('#email').checkedEmail( '正确', '邮件格式错误', '不能为空');
		isNum[8]= $form.find('#exitdateString').checkedDate( '正确', '未选择预计离职时间', '不能为空');
		
		for(var i=0;i<isNum.length;i++){
			var arrs = isNum[i];
			if(arrs){
				isTrue[i] = 1; 
			}else{
				isTrue[i] = 0;
			}
			console.log(isTrue[i] + '---isTrue'+(i+1));
			
			isTotal.push(isTrue[i]);
		}
		
		for(var j=0; j < isTotal.length; j++){
	
			console.log(isTotal[j] == 1);
			if(isTotal[j] == 1){
	
			}else{
				ischecked = false;
			}
		}
		console.log(isTotal + 'isTotals');
		
		return isChecked;
		
	}*/