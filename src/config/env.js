/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

;
(function (global) {
	global.baseUrl = "https://ali-mp.zhongan.com/mini/";
	global.imgBaseUrl = 'https://dev-cdn.zhongan.com/a00000/frontend/test/static/img/';
	//global.baseUrl = "https://dev-ali-mp.zhongan.com/mini/developer/wangmanzhe/";
	if (location.href.indexOf('dev-') > -1) {
		global.baseUrl = "https://dev-ali-mp.zhongan.com/mini/developer/wangmanzhe/";
	} else if (location.href.indexOf('uat-') > -1) {
		global.baseUrl = "https://dev-ali-mp.zhongan.com/mini/developer/wangmanzhe/";
	} else {
		//global.baseUrl = "https://dev-ali-mp.zhongan.com/mini/developer/wangmanzhe/";
		global.baseUrl = "https://dev-ali-mp.zhongan.com/mini/developer/wangmanzhe/";
	}
})(window);

let routerMode = 'history';
if (process.env.NODE_ENV == 'development') {

}else if(process.env.NODE_ENV == 'production'){
	// baseUrl = 'http://cangdu.org:8001';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}