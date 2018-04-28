import {
	baseUrl
} from './env'
import axios from 'axios'
export default async (url = '', data = {}, type = 'GET') => {
	type = type.toUpperCase();
	url = baseUrl + url;

	//if (type == 'GET') {
	let dataStr = ''; //数据拼接字符串
	Object.keys(data).forEach(key => {
		dataStr += key + '=' + data[key] + '&';
	})

	if (dataStr !== '') {
		dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
		url = url + '?' + dataStr;
	}
	//}
	let requestConfig = {
		method: type,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'//'Content-Type': 'application/json' 
		},
		url,
	}

	if (type == 'POST') {
		requestConfig.data = data;
		requestConfig.transformRequest = [function (data) {
			// 对 data 进行任意转换处理
			return data;
		}];
		requestConfig.transformResponse = [function (data) {
			// 对 data 进行任意转换处理
			return data;
		}];
	} else if (method == 'GET') {
		requestConfig.params = data;
	}
	const responseJson = await axios(requestConfig);
	if (responseJson.status == 200) {
		let obj = responseJson.data
		if (typeof obj !== 'object') {
			obj = JSON.parse(obj);
		}
		if(obj.errorCode == 0){
			return obj.data;
		}
		return obj
	} else {
		return responseJson
	}
}