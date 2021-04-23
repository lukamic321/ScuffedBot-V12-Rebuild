# better-redddit
Simple Reddit API, no authentication needed! All credits go to normanlol for the original code, I just changed it to promises and used a different web scraper. Link to original https://github.com/normanlol/redddit and npm https://www.npmjs.com/package/redddit

## example code

```js
const r = require('better-redddit');

r.top_posts("memes", 10).then(results => {
	const post = results[Math.floor(Math.random() * results.length)].data.permalink;
	console.log(post);
	r.get_post(post).then(post_info => {
		console.log(post_info);
	});
});

r.search('memes', 10).then(results => {
	console.log(results);
});

r.get_url('r/PewdiepieSubmissions/comments/kseegx/im_bad_at_titles/').then(result => {
	console.log(result);
});
```
