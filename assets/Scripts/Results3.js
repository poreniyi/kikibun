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

let pos={
    "Nouns":nouns,
    "Verbs":verbs,
    "Particles":particles,
    "I-Adjective":iAdjectives,
    "Na-Adjective":naAdjectives,
}

let colors={
    "Nouns":nounColor,
    "Verbs":verbColor,
    "Particles":particleColor,
    "I-Adjective":iAdjectiveColor,
    "Na-Adjective":naAdjectiveColor,
}
let initalColor=false;
let posButtons=buttons.slice(1);
buttons.forEach(button=>{
    //  button.style.backgroundColor='gray';
    button.style.backgroundColor=colors[button.value];
    // button.style.color=colors[button.value];
    button.addEventListener('click',()=>{
        if (button.value==="All"){
            if(button.textContent=='開く'){
                button.textContent='開かない'
            }else{
                button.textContent='開く'
            }
            for(let i=0;i<posButtons.length;i++){
                operatedArrayColor=colors[button.value];
                changeColors(posButtons[i]);
            }
        }else{
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
//Table
let wordTable=document.querySelector('#wordTable');
let conjugationsTable=document.querySelector('#conjugationsTable');
let totalConjugations;
let knownConjugations;
surfaceWords.forEach(word=>{
    if (word.classList.contains('true')){
        let counter=word.querySelector('.numberCounter');
        let givenForm=word.childNodes[0].nodeValue;
        let base=word.querySelector('.base');
        let description= word.querySelector('.description');
        let chapter=word.querySelector('.chapter');
        let jlpt=word.querySelector('.JlptLvl')
        let wordRow=document.createElement('tr');
        let counterRow=wordRow.insertCell(-1);
        counterRow.textContent=counter.textContent;
        let givenRow=wordRow.insertCell(-1);
        givenRow.textContent=givenForm;
        let baseRow=wordRow.insertCell(-1);
        baseRow.textContent=base.textContent
        let englishRow=wordRow.insertCell(-1);
        englishRow.textContent=description.textContent;
        let chapterRow=wordRow.insertCell(-1);
        if(chapter===null){
            chapterRow.textContent="N/a";
        }else{
            chapterRow.textContent=chapter.textContent;
        }
        let jlptRow=wordRow.insertCell(-1);
        jlptRow.textContent=jlpt.textContent;
        let wordIsShown=false;
     word.addEventListener('mouseenter',()=>{
        if(!wordIsShown){
            wordTable.appendChild(wordRow);
            counter.style.display='inherit';
        }
    })
        word.addEventListener('mouseleave',()=>{
        if(!wordIsShown){
            counter.style.display='none';
            wordTable.removeChild(wordRow);
        }
    })
        word.addEventListener('click',()=>{
        if(!wordIsShown){
            wordIsShown=true;
        }else{
            wordIsShown=false;
            wordTable.removeChild(wordRow);
        }
    })
        wordRow.addEventListener('mouseenter',()=>{
            word.style.transform='scale(1.28,1.28)';
            word.style.textShadow="0 0 5px red";        })
        wordRow.addEventListener('mouseleave',()=>{
            word.style.transform='scale(1,1)';
            word.style.textShadow="none"; 
        })
    }
    
    let previousSibling=word.previousElementSibling;
    let conjugations= [];
    let nextSibling=word.nextElementSibling;
   while(previousSibling&&previousSibling.classList.contains('conjugations') ){
       if(previousSibling.classList.contains('known')){
        conjugations.push(previousSibling);
       }
       previousSibling=previousSibling.previousElementSibling;
   }
    while(nextSibling && nextSibling.classList.contains('conjugations')){
        if(nextSibling.classList.contains('known')){
            conjugations.push(nextSibling);
            console.log(`The conjugation fonud is ${nextSibling.childNodes[0].nodeValue}`)
        }
        nextSibling=nextSibling.nextElementSibling;
    }

    if(conjugations.length>0){
        conjugations.forEach(conjugation=>{
            let conjugationsRow=document.createElement('tr');
            let wordActedOn=conjugationsRow.insertCell(-1);
            wordActedOn.textContent=word.dataset.given;
            let conjugationForm=conjugationsRow.insertCell(-1);
            conjugationForm.textContent=conjugation.childNodes[0].nodeValue;
            let conjugationTitle=conjugationsRow.insertCell(-1);
            conjugationTitle.textContent=conjugation.querySelector('.description').textContent;
            let conjugationChapter=conjugationsRow.insertCell(-1);
            conjugationChapter.textContent=conjugation.querySelector('.chapter').textContent;
            let conjugationIsShown=false;
            conjugation.addEventListener('mouseenter',()=>{
                if(!conjugationIsShown){
                    conjugationsTable.appendChild(conjugationsRow);
                }
            })
            conjugation.addEventListener('mouseleave',()=>{
                if(!conjugationIsShown){
                    //conjugationsTable.removeChild(conjugationsRow);
                    conjugationsRow.parentNode.removeChild(conjugationsRow);
                }
            })
            conjugation.addEventListener('click',()=>{
                if(!conjugationIsShown){
                    conjugationIsShown=true;
                }else{
                    conjugationIsShown=false;
                }
            })
            conjugationsRow.addEventListener('mouseenter',()=>{
                conjugation.style.transform='scale(1.28 ,1.28)';
                conjugation.style.textShadow="0 0 5px blue";       
             })
            conjugationsRow.addEventListener('mouseleave',()=>{
                conjugation.style.transform='scale(1,1)';
                conjugation.style.textShadow="none"; 
            })
        })
    }
})

//Stats
totalConjugations=document.getElementsByClassName('conjugations');
knownConjugations=document.getElementsByClassName('conjugations known').length;
console.log(`Total # of conjugations is ${totalConjugations.length}`);
console.log(`Total # of known conjugations is ${knownConjugations}`);
let conjugationStats=document.getElementById('ConjugationStats');

conjugationStats.textContent=`${knownConjugations}/${totalConjugations.length} or ${+(knownConjugations/totalConjugations.length*100).toFixed(2)}% of all conjugations`;
