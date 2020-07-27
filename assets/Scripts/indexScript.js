
const form=document.querySelector('#form')
const button= document.querySelector("#button")

const loadScreen=document.querySelector('#loadWait');
const genki=document.querySelector("#genki");
const jlpt=document.querySelector("#JLPT");
let inputs=[jlpt,genki];
// if(!jlpt.value&&!genki.value){
//     button.style.visibility='hidden';
// }
console.log(button);
button.addEventListener('click',()=>{
    if(jlpt.value==0&&genki.value==0){

    }
    loadScreen.textContent='Getting Results Please wait';
})
inputs.forEach(element=>{
    element.addEventListener("change",()=>{
        if((jlpt.value!=0||genki.value!=0)){
            button.style.visibility='visible';
        }else{
            button.style.visibility='hidden';
        }
    })   
})
