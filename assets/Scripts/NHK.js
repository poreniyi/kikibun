const articles=[...document.querySelectorAll('.selectText')];
const articleSelect=document.querySelector('#articleSelect');
let buttons =[...document.querySelectorAll('button')];
let articleTextDiv=document.getElementById('articleText');
let currentArticle='';
let articleText=document.getElementById('Text');

articleSelect.addEventListener('change',()=>{
    if(buttons[0].hidden=true){
        buttons[0].hidden=false;
    }
    articleTextDiv.textContent='';
    if(articleSelect.selectedIndex!=0){
        currentArticle= articles[articleSelect.selectedIndex-1];
       articleTextDiv.textContent=currentArticle.textContent;
        console.log(articleSelect.selectedIndex);
        currentArticle= articles[articleSelect.selectedIndex-1];
    }
})
buttons.forEach(button=>{
    button.addEventListener('click',()=>{
        articleText.value=articleTextDiv.textContent;
        form.submit();
    })
})
console.log(articles.length);
function loadArticles(){
    let jsonObj;
    let xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange=()=>{
        if(xhttp.readyState==4){
        //console.log(this.response);
        jsonObj=JSON.parse(xhttp.responseText);
        console.log(jsonObj.dog);
        console.log(jsonObj.cat);
        }  
    }
    xhttp.open("GET", "/ajaxtest", true);
    xhttp.send();
}
loadArticles();
let sendToHome=()=>{
    xhttp.onreadystatechange=()=>{
        if(xhttp.readyState==4){
        jsonObj=JSON.parse(xhttp.responseText);
        console.log(jsonObj.dog);
        console.log(jsonObj.cat);
        }  
    }
    xhttp.open("GET", "/ajaxtest", true);
    xhttp.send();
}