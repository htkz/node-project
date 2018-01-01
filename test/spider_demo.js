const axios = require('axios');
const cheerio = require('cheerio');
(async () => {
    const res = await axios.get('http://www.acfun.cn/a/ac4166585');
    const html = res.data;
    const $ = cheerio.load(html);
    const articalContent = $('.article-content');
    const dom = $(articalContent);
    const content = getTextOrImg(dom, []);
    console.log(content);

    function getTextOrImg(dom, arr) {
        const d = $(dom);
        const children = d.children();
        const text = d.text()
        if (text) {
            arr.push(text);
        }
        if (children.length === 0) {
            if (d['0'].name === 'img') {
                arr.push(d.attr('src'));
            }
        }
        else {
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                getTextOrImg(child, arr);
            }
        }
        return arr;
    }
})()
    .then(r => {
        process.exit(0);
    })
    .catch(e => {
        console.log(e);
        process.exit(1);
    })
