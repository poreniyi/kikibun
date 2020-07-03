let buttons=[...document.querySelectorAll('button')];
let verbColor=getComputedStyle(document.body).getPropertyValue('--Verb-Color');
let nounColor=getComputedStyle(document.body).getPropertyValue('--Noun-Color');
let particleColor=getComputedStyle(document.body).getPropertyValue('--Particle-Color');
let naAdjectiveColor=getComputedStyle(document.body).getPropertyValue('--Na-Adjective-Color');
let iAdjectiveColor=getComputedStyle(document.body).getPropertyValue('--I-Adjective-Color');

let verbs=document.querySelectorAll('.Verb');
let nouns=document.querySelectorAll('.Noun');
let particles=document.querySelectorAll('.Particle');
let naAdjectives=document.querySelectorAll('.Na-Adjective');
let iAdjectives=document.querySelectorAll('.I-Adjective');
let words=[verbs,nouns,particles,naAdjectives,iAdjectives];
let pos={
    "Nouns":nouns,
    "Verbs":verbs,
    "Particles":particles,
    "I-Adjective":iAdjectives,
    "Na-Adjective":naAdjectives,
}
console.log(`Number of pos is: ${words.length}`);
words.forEach(word=>{
    console.log(`I am ${word.length} words long`);
})

let colors={
    "Nouns":nounColor,
    "Verbs":verbColor,
    "Particles":particleColor,
    "I-Adjective":iAdjectiveColor,
    "Na-Adjective":naAdjectiveColor,
}
let initalColor=false;

buttons.forEach(button=>{
    button.addEventListener('click',()=>{
       let operatedArray=pos[button.value] ;
       let operatedArrayColor=colors[button.value];
        
       operatedArray.forEach(element=>{
           if (element.style.color=='') element.style.color=operatedArrayColor;
           else element.style.color='';
       })
    })
})
let change={

}
let changeColors=function(acolor){

}