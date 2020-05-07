let selectList=document.querySelectorAll('.select');
let hiddenListPOS=document.getElementsByName("POS");
let GenkiID=document.getElementsByName("Kanji");
let changedStatus=[...document.getElementsByName("hasBeenChanged")];
let submitButton=document.querySelector("#submitButton");
let pageForward=document.querySelector("#Page");
let pageBack=document.querySelector("#PageBack");
let tableForm=document.querySelector("form");

pageBack.addEventListener('click', ()=>{
    let url=window.location.href;
    let urlSplit=url.split("page=");
    urlSplit[1]=parseInt((urlSplit[1]));
    urlSplit[1]--;
    let newUrl=urlSplit.join("page=");
    console.log(`The current url is ${window.location.href}`);
    console.log(`The current urlSplit is: ${urlSplit[1]}`);
    console.log(`The new url is: ${newUrl}`);
    window.location=newUrl;
})
pageForward.addEventListener("click",()=>{
    let url=window.location.href;
    let urlSplit=url.split("page=");
    urlSplit[1]=parseInt((urlSplit[1]));
    urlSplit[1]++;
    let newUrl=urlSplit.join("page=");
    console.log(`The current url is ${window.location.href}`);
    console.log(`The current urlSplit is: ${urlSplit[1]}`);
    console.log(`The new url is: ${newUrl}`);
    window.location=newUrl;
});

submitButton.addEventListener("click",()=>{
    for(let i=0 ;i<selectList.length;i++){
                if(selectList[i].value!="None"){
                    changedStatus[i].value="True";
                    hiddenListPOS[i].value=selectList[i].value
         }
    }
    tableForm.submit();
});


// let buttons=document.querySelectorAll(".b");
// let displayButton=document.querySelector(".A");
// console.log(displayButton);
// let tables=document.querySelectorAll("tr");
// let table=[...tables]
// table.shift();
// console.log("table legnth is"+table.length)
// console.log("buttons length is:"+buttons.length)
// buttons.forEach((singleButton)=>{
//     let buttonValue=singleButton.value.split(" ").pop().slice(0,-1);
//     singleButton.addEventListener("click",()=>{
//         table.forEach((tr)=>{
//                 if(buttonValue!=tr.querySelector(".select").value){
//                     tr.style.display="none";
//                 }
//         })
//     })
// });

// displayButton.addEventListener("click",()=>{
//     table.forEach((tr)=>{
//         if(displayButton.value==="Show"){
//             displayButton.value="Show";
//             tr.style.display="";
//         }
//     })
// })