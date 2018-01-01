const axios = require('axios');
const cheerio = require('cheerio');
(async () => {
    const res = await axios.get('https://movie.douban.com/chart');
    const html = res.data;
    const $ = cheerio.load(html);
    console.log(html);
    const rankItem = $('tr.item .pl2')
    rankItem.each(function(index, el) {
        let item = $(el);
        let link = item.find('a').attr('href');
        let name = item.find('a span').text();
        let desc = item.find('p.pl').text();
        let star = item.find('.rating_nums').text();
        console.log('---------------');
        console.log(`name: ${name}`);
        console.log(`link: ${link}`);
        console.log(`desc: ${desc}`);
        console.log(`star: ${star}`);
        console.log('---------------');
    });

})()
    .then(r => {
        process.exit(0);
    })
    .catch(e => {
        console.log(e);
        process.exit(1);
    })
