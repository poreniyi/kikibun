const articles=[...document.querySelectorAll('.selectText')];
const articleSelect=document.querySelector('#articleSelect');
let dateButton =document.querySelector('#findArticlesButton');
let articleTextDiv=document.getElementById('articleText');
let currentArticle='';
let articleText=document.getElementById('Text');
let calendarTable=document.getElementById('calendarTable');
let tableName=document.getElementById('tableName');

const yearSelect=document.querySelector('#yearSelect');
const monthSelect=document.querySelector('#monthSelect');
let submitButton=document.querySelector('#submitButton');
dateButton.disabled=true;
articleSelect.addEventListener('change',()=>{
    if(submitButton.hidden=true){
        submitButton.hidden=false;
    }
    articleTextDiv.textContent='';
    if(articleSelect.selectedIndex!=0){
        currentArticle= articles[articleSelect.selectedIndex-1];
       articleTextDiv.textContent=currentArticle.textContent;
        console.log(articleSelect.selectedIndex);
        currentArticle= articles[articleSelect.selectedIndex-1];
    }
})


submitButton.addEventListener('click',()=>{
    articleText.value=articleTextDiv.textContent;
    form.submit();
})

console.log(articles.length);
function loadArticles(){
    let jsonObj;
    let xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange=()=>{
        if(xhttp.readyState==4){
        //console.log(this.response);
        }  
    }
    xhttp.open("GET", "/ajaxtest", true);
    xhttp.send();
}
loadArticles();

let makeGrid=()=>{

}
let monthDays={
    31:[0,2,4,6,7,9,11],
    30:[3,5,8,10],
    29:[],
    28:[1],
}
let tableIsShown=false;

let daysArray=[];
let weeksArray=[];
monthSelect.addEventListener('change',()=>{
    console.log(`The month is ${monthSelect.selectedIndex}`);
    console.log(`The month is ${monthSelect.value}`);
    monthValue=monthSelect.selectedIndex-1;
    tableName.textContent=monthSelect.value;
    weeksArray.forEach(weekRow=>{
        weekRow.parentNode.removeChild(weekRow);
    });
    weeksArray=[];
    daysArray=[];
    if(monthValue==-1){
        dateButton.disabled=true;
    }else{
        dateButton.disabled=false;
    }
    tableIsShown=false;

})
dateButton.addEventListener('click',()=>{
    if(!tableIsShown){
        makeCalendarTable(monthValue);
        tableIsShown=true;
    }
    requestMonths(monthValue);
})
let makeCalendarTable=(month)=>{
    let today=new Date(2020,month,1);
    let maxAmountDays;
    console.log("the month is",today.getMonth())
    switch(today.getMonth()){
        case 0:
        case 2:    
        case 4:
        case 6:
        case 7:    
        case 9:
        case 11:
            maxAmountDays=31;
            break;
        case 3:    
        case 5:
        case 8:
        case 10: 
        maxAmountDays=30;
        break; 
        case 1:   
        maxAmountDays=28; 
    }
    let days=1;
    console.log(`Max amount of days is ${maxAmountDays}`);
    let start=today.getDay();
    startIsDone=false;
  for(let i =1;i<7;i++){
      let row=calendarTable.insertRow(-1);
      weeksArray.push(row);
    for(let j=1;j<8;j++){
        let td=row.insertCell(-1);
    if(j-1==start &&!startIsDone){
        daysArray.push(td);
        td.textContent=days;
        startIsDone=true;
    }
     if(days!=maxAmountDays+1 && startIsDone ){
        daysArray.push(td);
        td.textContent=days;
        days++;
     }
    }
  }
}

let requestMonths=(date)=>{
    let jsonObj;
    let xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange=()=>{
        if(xhttp.readyState==4){
        //console.log(this.response);
        jsonObj=JSON.parse(xhttp.responseText);
        parseMonths(jsonObj.days);
        }  
    }
    xhttp.open("GET", "/ajaxtest?month=2", true);
    xhttp.send();
}
let parseMonths=(array)=>{
    array.forEach(value=>{
        daysArray[value].style.backgroundColor='blue';
    })
}