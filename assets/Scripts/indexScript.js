
const form=document.querySelector('#form')
const button= document.querySelector("#button")

const loadScreen=document.querySelector('#loadWait');
const genki=document.querySelector("#genki");
const jlpt=document.querySelector("#JLPT");
let inputs=[jlpt,genki];
let animationDIV=document.getElementById('loadAnimation');
let aniSpans=animationDIV.querySelectorAll('span');
let span1=aniSpans[0];
let span2=aniSpans[1];
console.log( aniSpans.length);
console.log(aniSpans[0]);

form.addEventListener('submit',(e)=>{
    if(jlpt.value==0&&genki.value==0){
        e.preventDefault();
        alert(`Both Genki Chapter and JlPT LVL can't be empty`);
     }else{
   
        button.disabled=true;
        addAnimationClasses();
        loadScreen.textContent='Getting Results Please wait';
     }
})

let addAnimationClasses=()=>{
    span1.classList.toggle('first');
    aniSpans[1].classList.toggle('second');
}

inputs.forEach(element=>{
    element.addEventListener("change",()=>{
        if((jlpt.value!=0||genki.value!=0)){
            button.style.visibility='visible';
        }else{
            button.style.visibility='hidden';
        }
    })   
})
