let list=[...document.querySelector('.ul').getElementsByTagName("li")];
console.log(`List length is ${list.length}`)
list.forEach(element=>{
    let href=element.firstChild.getAttribute('href');
    let pathname=window.location.pathname+window.location.search;
    let url=window.location.href
   // console.log(`The href is:${element.getAttribute("a href")}`);
   if(href==pathname || href == url){
      let link= element.querySelector('a');
       link.className="active";
   }else{
       console.log(`else ${href} url is ${url}`);
   }
});

