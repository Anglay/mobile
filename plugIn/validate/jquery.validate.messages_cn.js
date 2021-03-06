$.extend($.validator.messages, {
    required: "不能为空",
    remote: "请修正该字段",
    email: "请输入正确格式的电子邮件",
    url: "请输入合法的网址",
    date: "请输入合法的日期",
    dateISO: "请输入合法的日期 (ISO).",
    number: "请输入合法的数字",
    digits: "只能输入整数",
    creditcard: "请输入合法的信用卡号",
    equalTo: "两次密码不相同",
    accept: "请输入拥有合法后缀名的字符串",
    maxlength: $.validator.format("长度大于{0}位"),
    minlength: $.validator.format("长度少于 {0}位"),
    rangelength: $.validator.format("长度在 {0} 和 {1} 之间"),
    range: $.validator.format("请输入介于 {0} 和 {1} 之间的值"),
    max: $.validator.format("请输入一个最大为 {0} 的值"),
    min: $.validator.format("请输入一个最小为 {0} 的值"),
  	isNumber:"请输入有效的号码",
  	mobile:"请输入正确的手机号码",
  	phone:"请输入正确的电话号码",
  	pwdsimple:"输入的密码太简单！",
  	isQQ:"请输入正确的QQ号码",
    isWeixin:"请输入正确的微信号",
	isCardID:"请输入正确的身份证号"
});