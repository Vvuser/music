export function reception(data){
	console.log(data)
}
var script = document.getElementById('script');
script.setAttribute('src','https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg?format=jsonp&tpl=v12&page=other&callback=reception&rnd=8810616011716195&g_tk=681686046&jsonpCallback=GetRecomListCallback8810616011716195&loginUin=614330288&hostUin=0&format=jsonp&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq&needNewCode=0')
document.body.append(script)
