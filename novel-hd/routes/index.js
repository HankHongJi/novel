var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const superagent = require('superagent');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


const url = 'http://www.xqishuta.com'; //借用笔趣阁的地址去爬取
/* 作者，小说名称查询 */
router.get('/api/queryName', function (req, res, next) {
    let {name} = req.query;
    let queryUrl = `${url}/search.html?searchkey=${encodeURI(name)}`
    superagent.get(queryUrl)
        .end((err, sres) => {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            let $ = cheerio.load(sres.text);
            let items = [];
            $('.grid tr').each((idx, element) => {
                let $element = $(element).find('td');
                if(idx > 0)
                {
                    let id = $element.eq(1).find('a').attr('href').replace(/[^0-9]/ig,"");
                    items.push({
                        title: $element.eq(1).find('a').text(),
                        id: id,
                        prefix: id.slice(0, id.length - 3) || 0,
                        suffix: id.slice(id.length - 3),
                        author: $element.eq(2).text(),
                        newtitle: $element.eq(3).find('a').text(),
                        lastTime: $element.eq(4).text()
                    });
                }
            });

            res.json(items)
        });
});

/* 小说章节列表 */
router.get('/api/queryChapterList', function (req, res, next) {
    let {prefix, suffix} = req.query;
    let queryUrl = `${url}/du/${prefix}/${suffix}/`
    superagent.get(queryUrl)
        .end((err, sres) => {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            let $ = cheerio.load(sres.text);
            let items = [];
            let list = $('.pc_list');
            list.eq(list.length - 1).find('li a').each((idx, element) => {
                let $element = $(element);
                items.push({
                    title: $element.text(),
                    id: $element.attr('href'),
                });
            });
            res.json(items)
        });
});

/* 小说章节 */
router.get('/api/queryChapter', function (req, res, next) {
    let {prefix, suffix, id} = req.query;
    let queryUrl = `${url}/du/${prefix}/${suffix}/${id}`
    superagent.get(queryUrl)
        .end((err, sres) => {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            let $ = cheerio.load(sres.text);
            let html = $('#content1');
            html.find('.sitetext').empty();
            let text = html.html(); 
            res.json({
                title: $('h1').text(),
                text: text
            })
        });
});
module.exports = router;
