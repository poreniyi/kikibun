
const form=document.querySelector('#form')
const button= document.querySelector("#button")
const ap= document.querySelector("#ap")

const textArea=document.querySelector("#text");
const genki=document.querySelector("#genki");
const jlpt=document.querySelector("#JLPT");
let inputs=[jlpt,genki];
console.log(`JLPT text is ${jlpt.value}`);
console.log(`Genki text is ${genki.value}`);
console.log(`Submit button value is ${button.value}`);
button.style.visibility='hidden';
inputs.forEach(element=>{
    element.addEventListener("change",()=>{
        if(jlpt.value!=0||genki.value!=0){
            button.style.visibility='visible';
        }else{
            button.style.visibility='hidden';
        }
        console.log(`Change test ${element.value}`);
    })
    
})
console.log("am I working");