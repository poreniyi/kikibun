let selectList=document.querySelectorAll('.select');
let hiddenListPOS=document.getElementsByName("POS");
let GenkiID=document.getElementsByName("Kanji");
let changedStatus=[...document.getElementsByName("hasBeenChanged")];
let idList=[...document.getElementsByName("Id")];
let submitButton=document.querySelector("#submitButton");
let pageForward=document.querySelector("#Page");
let pageBack=document.querySelector("#PageBack");
let tableForm=document.querySelector("form");
let pageButtons=[...document.querySelectorAll('.Pagebtn')];

for(let i=0;i<selectList.length;i++){
    let valuetoSwitchto=hiddenListPOS[i].value.trim();
    switch(valuetoSwitchto){
        case "Verb": 
        selectList[i].remove(1);
        selectList[i].options[0].text=`The original POS is: ${valuetoSwitchto}`;
        break;
        case "Noun": 
        selectList[i].remove(2);
        selectList[i].options[0].text=`The original POS is: ${valuetoSwitchto}`;
        break;
        case "Adjective":
        selectList[i].remove(3); 
        selectList[i].options[0].text=`The original POS is: ${valuetoSwitchto}`;
        break;
        case "Particle": 
        selectList[i].remove(4);
        selectList[i].options[0].text=`The original POS is: ${valuetoSwitchto}`;
        break;
    }
}

pageButtons.forEach(element=>{
    element.addEventListener('click',()=>{
        let url=window.location.href;
        let urlSplit=url.split("page=");
        urlSplit[1]=parseInt((urlSplit[1]));
        if(element.value.includes("Next")){
            urlSplit[1]++;
        }else{
            urlSplit[1]--;
        }
        let newUrl=urlSplit.join("page=");
        console.log(`The current url is ${window.location.href}`);
        console.log(`The current urlSplit is: ${urlSplit[1]}`);
        console.log(`The new url is: ${newUrl}`);
        window.location=newUrl;
    })
})


submitButton.addEventListener("click",()=>{
    let xhr = new XMLHttpRequest(); 
            let url = window.location.href; 
    for(let i=0 ;i<selectList.length;i++){
                if(selectList[i].value!="None"){
                    //git changedStatus[i].value="True";
                    hiddenListPOS[i].value=selectList[i].value
         }else{
             hiddenListPOS[i].value="";
             idList="";
         }
    }
    // xhr.open("POST", url, true); 
    // var data = JSON.stringify({ "name": name.value, "email": email.value }); 

    // xhr.send(data); 
    tableForm.submit();
});

/*
to show POS
*/

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

//show all
// displayButton.addEventListener("click",()=>{
//     table.forEach((tr)=>{
//         if(displayButton.value==="Show"){
//             displayButton.value="Show";
//             tr.style.display="";
//         }
//     })
// })