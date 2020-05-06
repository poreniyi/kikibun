let selectList=document.querySelectorAll('.select');
let hiddenListPOS=document.getElementsByName("POS");
let GenkiID=document.getElementsByName("Kanji");
let changedStatus=[...document.getElementsByName("hasBeenChanged")];
let submitButton=document.querySelector("#submitButton");
console.log(submitButton.value);
let tableForm=document.querySelector("form");


console.log(`changedStatus length is; ${changedStatus.length}`);
console.log(changedStatus[0].value)
console.log(`hiddenListPOS length is ${hiddenListPOS.length}`)
console.log("Select length is"+selectList.length);
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