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

// surfaceWords.forEach(word=>{
//     let beforePart;
//     let chapter=word.querySelector('.chapter');
//     let previousSibling=word.previousSibling;
//     let conjugations= [];
//     let nextSibling=word.nextElementSibling;
//     let counter=word.querySelector('.numberCounter');
//     let description= word.querySelector('.description');
   
//     while(nextSibling && nextSibling.classList.contains('conjugations')&&nextSibling.classList.contains('known')){
//         conjugations.push(nextSibling);
//         nextSibling=nextSibling.nextElementSibling;
//     }
//     if(description ){
//         let theInfo=description;
//         let infoLI=document.createElement('li');
//         infoLI.textContent=`# ${counter.textContent} Chapter ${chapter.textContent} ${theInfo.textContent.trim()}   ${word.childNodes[0].nodeValue}`;
//         let isShown=false;
//         infoLI.addEventListener('mouseenter',()=>{
//             word.style.transform='scale(1.1,1.1)';
//             word.style.textShadow="0 0 5px red";
//         })
//         infoLI.addEventListener('mouseleave',()=>{
//             word.style.transform='scale(1,1)';
//             word.style.textShadow="none";
//         })
//         word.addEventListener('mouseenter',()=>{
//             if(!isShown){
//                 counter.style.display='inherit';
//                 info.appendChild(infoLI);
//             }
//         })
//         word.addEventListener('mouseleave',()=>{
//             if(!isShown){
//                 counter.style.display='none';
//                 info.removeChild(infoLI);
//             }
//         })
//         word.addEventListener('click',()=>{
//             if(isShown){
//                 info.removeChild(infoLI);
//                 isShown=false;
//             }else{
//                 info.appendChild(infoLI);
//                 isShown=true;
//             }
//         })
//         let isConjugationParentShown=true;
//         let wordUL=document.createElement('ul');
//         let ulTitle=document.createElement('li');
//         ulTitle.textContent=word.childNodes[0].nodeValue;
//         wordUL.appendChild(ulTitle);
//         let conjugationsUL= document.createElement('ul');
//         conjugationsUL.classList.add('conjugationsUL');
//         ulTitle.appendChild(conjugationsUL);
//         conjugations.forEach(conjugation=>{
//             let conjugationIsShown=false;
//             let conjugationDescription=conjugation.querySelector('.description');
//             let conjugationLI=document.createElement('li');
//             if(conjugationDescription!=''){
//                 conjugationLI.textContent=`${conjugationDescription.textContent}`;
//                 conjugation.addEventListener('mouseenter',()=>{
//                     if(!conjugationIsShown){
//                         conjugationsUL.appendChild(conjugationLI);
//                        info.appendChild(wordUL);
//                     }
//                 })
//                 conjugation.addEventListener('mouseleave',()=>{
//                     if(!conjugationIsShown){
//                     }
//                 })
//                 conjugation.addEventListener(`click`,()=>{
//                     if(conjugationIsShown){
//                        conjugationIsShown=false;
//                     }else{
//                         conjugationIsShown=true;
//                     }
//                 })
//             }    
//         })

//     }
// })
//Table
let wordTable=document.querySelector('#wordTable');
let conjugationsTable=document.querySelector('#conjugationsTable');
surfaceWords.forEach(word=>{
    if (word.classList.contains('true')){
        let counter=word.querySelector('.numberCounter');
        let givenForm=word.childNodes[0].nodeValue;
        let base=word.querySelector('.base');
        let description= word.querySelector('.description');
        let chapter=word.querySelector('.chapter');
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
        chapterRow.textContent=chapter.textContent;
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
            word.style.transform='scale(1.1,1.1)';
            word.style.textShadow="0 0 5px red";        })
        wordRow.addEventListener('mouseleave',()=>{
            word.style.transform='scale(1,1)';
            word.style.textShadow="none"; 
        })
    }
    
    let previousSibling=word.previousElementSibling;
    let conjugations= [];
    let nextSibling=word.nextElementSibling;
   
    while(nextSibling && nextSibling.classList.contains('conjugations')&&nextSibling.classList.contains('known')){
        conjugations.push(nextSibling);
        nextSibling=nextSibling.nextElementSibling;
    }
    if(conjugations.length>0){
        conjugations.forEach(conjugation=>{
            let conjugationsRow=document.createElement('tr');
            let wordActedOn=conjugationsRow.insertCell(-1);
            wordActedOn.textContent=word.childNodes[0].nodeValue;
            let conjugationPattern=conjugationsRow.insertCell(-1);
            conjugationPattern.textContent=conjugation.querySelector('.description').textContent;
            let conjugationIsShown=false;
            conjugation.addEventListener('mouseenter',()=>{
                if(!conjugationIsShown){
                    conjugationsTable.appendChild(conjugationsRow);
                }
            })
            conjugation.addEventListener('mouseleave',()=>{
                if(!conjugationIsShown){
                    conjugationsTable.removeChild(conjugationsRow);
                }
            })
            conjugation.addEventListener('click',()=>{
                if(!conjugationIsShown){
                    conjugationsTable.appendChild(conjugationsRow);
                    conjugationIsShown=true;
                }else{
                    conjugationIsShown=false;
                    conjugationsTable.removeChild(conjugationsRow);
                }
            })
        })
    }
})