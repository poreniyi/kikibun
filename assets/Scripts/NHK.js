const articles=[...document.querySelectorAll('.selectText')];
const articleSelect=document.querySelector('#articleSelect');
let buttons =[...document.querySelectorAll('button')];
let currentArticle='';
articleSelect.addEventListener('change',()=>{
    if(buttons[0].hidden=true){
        buttons[0].hidden=false;
        buttons[1].hidden=false;
    }
    currentArticle.hidden=true;
    console.log(articleSelect.selectedIndex);
    articles[articleSelect.selectedIndex].hidden=false;
    currentArticle= articles[articleSelect.selectedIndex];
})

console.log(articles.length);