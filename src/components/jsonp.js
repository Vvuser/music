export function jsonp(url){
	var script = document.createElement('script');
	script.setAttribute('src', url)
	document.body.append(script)
}
