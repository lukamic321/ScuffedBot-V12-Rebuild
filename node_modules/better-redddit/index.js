const axios = require('axios').default;
const opt = { headers: {
	"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
	"Accept-Encoding":"gzip, deflate, br",
	"Connection":"keep-alive",
	"DNT":"1",
	"Host":"www.reddit.com",
	"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0",
}}
async function top_posts(sub, limit){
	if(!sub)var sub = 'all';
	if(!limit)var limit = 100;
	const url = `https://reddit.com/r/${sub}/top.json?limit=${limit}`;
	const res = await axios({url: url, method: 'get', opt});
	if(!res)return null;
	return res.data.data.children;
}
async function get_post(post){
	if(!post)return null;
	const url = `https://reddit.com${post}.json`;
	const res = await axios({url: url, method: 'get', opt});
	if(!res)return null;
	const resp = JSON.parse(JSON.stringify({
		"post": res.data[0].data.children,
		"comments": res.data[1].data.children
	}));
	return resp;
}
async function search(query, limit){
	if(!query)return null;
	const url = `https://reddit.com/search.json?q=${encodeURI(query)}&limit=${limit}`;
	const res = await axios({url: url, method: 'get', opt});
	if(!res)return null;
	return res.data.data.children;
}
async function get_url(search_url){
	if(!search_url)return null;
	const url = `https://reddit.com/${search_url}.json`;
	console.log(url);
	const res = await axios({url: url, method: 'get', opt});
	if(!res)return null;
	console.log(res);
	return res.data[0].data.children.data;
}
module.exports = {
	top_posts,
	get_post,
	search,
	get_url
}