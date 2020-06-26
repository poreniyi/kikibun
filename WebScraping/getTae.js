const rp = require('request-promise');
const link = 'http://www.guidetojapanese.org/learn/category/grammar-guide/basic-grammar/';
const $ = require('cheerio');
const puppeteer = require('puppeteer');
const fs= require('fs');
const { get } = require('request');

let writeStream=fs.createWriteStream("TaeTest.txt");

getText= (url,stream) =>{
  rp(url)
  .then(function(html){
    //success!
    let urls=[];
    let grammarLinks=$('.collapsCat-8:3 > ul > li:nth-child(3)', html);
    grammarLinks=$('.collapsCat-8:3');
    let grammarLinksLength=grammarLinks.length;
    for(let i=0;i<grammarLinksLength;i++){
        console.log(grammarLinks[i].attribs.href);
    }
  })
  .catch(function(err){
    //handle error
    console.log(err)
  });
}

getArticleLinks=  (url) =>{
    return new Promise(async (resolve, reject) => {
      try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(url);
          let urls = await page.evaluate(() => {
              let results = [];
              let ul = document.querySelectorAll("a");
              ul.forEach(element=>{
                  let grammarLink=element.getAttribute('href');
                  if(grammarLink.includes("grammar")&&!results.includes(grammarLink)){
                    results.push(grammarLink);
                  }
              })
              return results;
          })
          //console.log(`These are the urls: ${urls}`);
          console.log(urls,urls.length);
          browser.close();
          return resolve(urls);
      } catch (e) {
          return reject(e);
      }
  })
  }
getArticleLinks(link);