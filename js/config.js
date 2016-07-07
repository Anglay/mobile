/**
 * auther : ouyang
 * date : 2016-3-16
 * content : js配置文件   版本号以发布日期为准
 */
var version =eval(+(new Date));
var v = '', v = v === '' ? version : v;
 seajs.config({
	// 别名配置
	alias : {
		'jquery':'plugIn/jquery/1.10.2/jquery.min.js',
		'avalon' : 'plugIn/avalon/avalon.min.js',
		'head' : 'dist/module/head/header.js',
		'footer' : 'dist/module/foot/footer.js',
		'common' : 'js/common.js',
		'layer' : 'plugIn/layer/layer.js',
		'layercss' : 'plugIn/layer/need/layer.css'
	},
	// 路径配置
	paths : {

	},
	// 映射
	map : [
		[ /^(.*\.(?:css|js))(.*)$/i, '$1?v='+v ]
	],
	// 预加载项
	preload : [
		window.jQuery ? '' : 'jquery'
	],
	// Sea.js 的基础路径
	//base:'http://www.linklaws.com/mobile/',
	base : 'http://192.168.1.112/code/mobile/',//http://14.215.113.168:8084/api_ssh/linklaws/mobile/
	// 文件编码
 	charset : 'utf-8',
	// 调试模式
	debug : true
});