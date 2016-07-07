/**
 * auther : ouyang
 * date : 2016-3-21
 * content : 律师详情
 */
 seajs.config({
    // 别名配置
    alias: {
        'headback' : 'dist/module/head/head-back.js',
    }
});
 define(function(require, exports, module) {
    var header = require("headback");
    require("layercss");
    require("layer");
    require("footer");
    var domEdite = $("#nav-edite"),domDelete = $(".icon-delete");
    var topicdetailModel = avalon.define("topicdetailCtrl",function(vm){
		vm.id = common.getUrlParam("id");
		vm.form = common.getUrlParam("type");
		if (header.user!=''&&header.user!=null&&header.user!==undefined) {
			vm.user_id = header.user.id
		}else{
			vm.user_id = "";
		};
		vm.list = [];
		vm.pageNo = 1;
		vm.totalpages = "";
		vm.loading = true;
		vm.loadmorehtml = "加载更多";//"<div>加载中...</div>";
		vm.imgHost = apiconfig.baseapiurl;
		vm.obj = {};
		vm.files_url = [];
		vm.getdetail = function(){
			$.get(apiconfig.baseapiurl+"bbs/topic!getDetail.action",{
				id:vm.id,
				user_id:vm.user_id
			},function(data){
				if (data.errorCode == "000000") {
					if ($.trim(data.files_url)!='') {
						vm.files_url = data.files_url.split(",");
					}
					vm.obj = data;
					if (header.user!=""&&header.user!=null&&header.user!=undefined) {
						if (vm.user_id!=data.user_id) {
							domDelete.remove();
						};
					}else{
						domDelete.remove();
					}
				};
			},"json");
		};
		vm.totalNum = 0;
		vm.getList = function(){
			$.get(apiconfig.baseapiurl+"comment/comment!quaryCommentAndApplyPage.action",{
				page_no:vm.pageNo,
				page_size:5,
				refer_id : vm.id,
				type:8,
				state:1,
				user_id : vm.user_id
			},function(data){
				vm.loading = false;
				if (data.errorCode=="000000") {
					$.each(data.list,function(index){
						vm.list.push(data.list[index]);
					});
					vm.loadmorehtml = "加载更多";
					vm.totalpages = data.totalPage;
					vm.totalNum = data.total;
				};
			},"json");
		};
		vm.loadmore = function(){
			vm.loadmorehtml = "<div>加载中...</div>";
			vm.pageNo = vm.pageNo+1;
			vm.getList();
		};
		vm.content = "";
		vm.sendReview = function(){
			if (vm.user_id!="") {
            	if ($.trim(vm.content)=="") {
					layer.open({ btn: ['确定'], content:'请输入评论内容！' })
				}else{
					$.ajax({
						url:apiconfig.baseapiurl+"comment/comment!save.action",
						type:"post",
						dataType:"json",
						async:false,
						data:{
							type:8,
							user_id:vm.user_id,
							refer_id : vm.id,
							content : vm.content,
						},
						success:function(data){
							if (data.errorCode=="000000") {
								vm.content = "";
								vm.list = [];
								vm.getList();
							}else{
								layer.open({ btn: ['确定'], content:'评论失败！' })
							};
						}
					});
				};
	        }else{
	            window.location.href = "../logReg/login.html?turl="+header.turl;
	        };
			
		};
		vm.rcontent = "";
		vm.sendRreview = function(parent_id,parent_user_id){
			if (vm.user_id!="") {
				if ($.trim(vm.rcontent)=="") {
					layer.open({ btn: ['确定'], content:'请输入评论内容！' });
				}else{
					$.ajax({
						url:apiconfig.baseapiurl+"comment/comment!save.action",
						type:"post",
						dataType:"json",
						async:false,
						data:{
							type:8,
							user_id:vm.user_id,
							refer_id : vm.id,
							content : vm.rcontent,
							parent_id : parent_id,
							parent_user_id : parent_user_id
						},
						success:function(data){
							if (data.errorCode=="000000") {
								vm.rcontent = "";
								vm.list = [];
								vm.getList();
							}else{
								layer.open({ btn: ['确定'], content:'评论失败！' })
							};
						}
					});
				};
			}else{
				window.location.href = "../logReg/login.html?turl="+header.turl;
			}
		};
		vm.showviewbox = function(dom){
			var _this = $(dom);
			var _parent = _this.closest(".review-item");
			var display =_parent.find(".r-review-area").css('display');
			if (display=="none") {
				_parent.find(".r-review-area").show();
				_parent.siblings().find(".r-review-area").hide();
			}else{
				_parent.find(".r-review-area").hide();
			};
			
		};
		vm.doZan = function(id,isprise,type){
			if (vm.user_id!="") {
				var msg = "点";
				if (isprise!=0) {
					var msg = "取消";
				};
				$.ajax({
					url:apiconfig.baseapiurl+"praise/praise!addOrCancel.action",
					type:"post",
					dataType:"json",
					async:false,
					data:{
						type:type,
						user_id:vm.user_id,
						refer_id : id
					},
					success:function(data){
						if (data.errorCode=="000000") {
							layer.open({ btn: ['确定'], content:msg+'赞成功！' });
							if (type==1) {
								vm.list = [];
								vm.getList();
							}else{
								vm.obj = {};
								vm.getdetail();
							};
							
						}else{
							layer.open({ btn: ['确定'], content:msg+'赞失败！' });
						};
					}
				})
			}else{
				window.location.href = "../logReg/login.html?turl="+header.turl;
			}
			
		};
		vm.removeTopic = function(id){
			layer.open({
			    content: '删除后不可恢复，仍要删除该话题吗？',
			    btn: ['是的', '取消'],
			    shadeClose : false,
			    yes: function(index){
			    	layer.close(index);
			    	var loading = layer.open({type: 2,shadeClose:false});
			        $.ajax({
						url : apiconfig.baseapiurl+"bbs/topic!delete.action",
						type:"post",
						dataType:"json",
						async:false,
						data:{
							ids:id,
							state :"-1"
						},
						success:function(data){
							layer.close(loading);
							if (data.errorCode=="000000") {
								window.history.back();
							}else{
								layer.open({ btn: ['确定'], content:'删除失败！' });
							};
						}
					});
			        
			    }
			});
		};
	});
	$(function(){
		if (topicdetailModel.form=="share") {
			$(".back,.nav-edite").remove();
		};
	})
	topicdetailModel.getdetail();
	topicdetailModel.getList();
    domEdite.addClass("icon-edite").bind("click",function(){
        if (header.user!=""&&header.user!=null&&header.user!=undefined) {
            window.location.href = "topicedite.html";
        }else{
            window.location.href = "../logReg/login.html?turl="+header.turl;
        };
    });
    domDelete.bind("click",function(){
    	topicdetailModel.removeTopic(topicdetailModel.id);
    });
});
