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

let info=document.getElementById('info');
let surfaceWords=[...document.querySelectorAll('.surface')];
let conjugations=[...document.querySelectorAll('.a')];
let before=[...document.querySelectorAll('.before')];

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
let posButtons=buttons.slice(1);
console.log(`posbuttons length is ${posButtons.length} posButtons1 is ${typeof posButtons[0].value}`);
buttons.forEach(button=>{
    //  button.style.backgroundColor='gray';
    button.style.color=colors[button.value];
    button.addEventListener('click',()=>{
       console.log(`${button.value} ${typeof button.value}`);
        if (button.value==="All"){
            if(button.textContent=='開く'){
                button.textContent='開かない'
            }else{
                button.textContent='開く'
            }
            for(let i=0;i<posButtons.length;i++){
                console.log('Hello');
                operatedArrayColor=colors[button.value];
                changeColors(posButtons[i]);
            }
            console.log(`clicked`)
        }else{
            console.log(`else clicked`);
            changeColors(button);
        }      
    })
})
let changeColors=function(aButton){
    let operatedArray=pos[aButton.value] ;
    let operatedArrayColor=colors[aButton.value];
    operatedArray.forEach(element=>{
        if (element.style.color=='') element.style.color=operatedArrayColor;
        else element.style.color='';    })
}

surfaceWords.forEach(word=>{
    if(word.children[0] ){
        let theInfo=word.children[0];
        let infoLI=document.createElement('li');
        infoLI.textContent=theInfo.textContent.trim();
        let isShown=false;
        word.addEventListener('mouseenter',()=>{
            if(!isShown){
                info.appendChild(infoLI);
            }
        })
        word.addEventListener('mouseleave',()=>{
            if(!isShown){
                info.removeChild(infoLI);
            }
        })
        word.addEventListener('click',()=>{
            if(isShown){
                info.removeChild(infoLI);
                isShown=false;
            }else{
                info.appendChild(infoLI);
                isShown=true;
            }
        })
    }else{
        console.log(`The word ${word.textContent} has no description`);
    }
   
})