let list=[...document.querySelector('.ul').getElementsByTagName("li")];
//let list=ul.getElementsByTagName("li");
console.log(list[0].firstChild.href);
list.forEach(element=>{
    let href=element.firstChild.getAttribute('href');
    let pathname=window.location.pathname+window.location.search;
    let url=window.location.href
   // console.log(`The href is:${element.getAttribute("a href")}`);
   if(href==pathname || href == url){
       element.className="active";
   }
   console.log(`The href is: ${href} and the pathname is: ${pathname} the url is: ${url}`)

    //console.log(`The element is:${element.firstChild.getAttribute('href')}`);
});

console.log(`the pathname is ${window.location.pathname}`);