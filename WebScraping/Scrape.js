const rp = require('request-promise');
const link = 'https://www3.nhk.or.jp/news/easy/k10012430641000/k10012430641000.html';
const articleLinks='https://www3.nhk.or.jp/news/easy/';
const $ = require('cheerio');
const puppeteer = require('puppeteer');
const fs= require('fs');

getNHKArticle= (url,stream) =>{
  rp(url)
  .then(function(html){
    //success!
    let articleText=$('#js-article-body', html).text();
    articleText=articleText.trim();
    stream.write(articleText);
    return articleText;
  })
  .catch(function(err){
    //handle error
    console.log(err)
  });
}
let readStream=fs.createReadStream(__dirname + '/links.txt',  'utf8');


getArticleLinks=  (url) =>{
  return new Promise(async (resolve, reject) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        let urls = await page.evaluate(() => {
            let results = [];
            let items = document.querySelectorAll('figure > a');
            items.forEach((item) => {
              let begin=window.location;
              let data= begin+item.getAttribute('href').slice(2);
             // myWriteStream.write(data+"\n");
                results.push({
                   url: data,
                    text: item.innerText,
                });
                //console.log(item);
            });
            return results;
        })
        
        browser.close();
        return resolve(urls);
    } catch (e) {
        return reject(e);
    }
})
}
myFunc=(string)=>{
  let today=new Date();
  let date= `${today.getMonth()}/${today.getDay()}/${today.getFullYear()}`;
  let time=`${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  console.log(string);
  console.log(date)
  console.log(time);
}
//setInterval(myFunc,5000,"Mario");
let myWriteStream=fs.createWriteStream(__dirname + '/Happy.txt', {flags: 'a'});

getArticleLinks(articleLinks).then(results=>{
  let counter=1;
 results.forEach(element=>{
   let name='Article'+String(counter)+'.txt';
   console.log(name);
  let writeStream=fs.createWriteStream(name);
   getNHKArticle(element.url,writeStream);
  console.log(element+counter);
   counter++
 })
}).catch(console.err);


getNHKArticle(link,myWriteStream);

