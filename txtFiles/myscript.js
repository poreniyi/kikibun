let openDiv=document.querySelector('#open');
let para=document.querySelector('#para');


let nounColor=document.createElement('span')
let verbColor=document.createElement('span')
let iAdjColor=document.createElement('span')
let naAdjColor=document.createElement('span')
let particleColor=document.createElement('span')

const particles=document.createElement('p');
const i_adjectives=document.createElement('p');
const na_adjectives=document.createElement('p');
const nouns=document.createElement('p');
const verbs=document.createElement('p');


i_adjectives.textContent=addWords('iAdj');
na_adjectives.textContent=addWords('naAdj');
verbs.textContent=addWords('verb');
particles.textContent=addWords('particle');
nouns.textContent=addWords('noun');


na_adjectives.style.color='Purple';
nouns.style.color='red';
i_adjectives.style.color='PaleVioletRed';
particles.style.color="green";
verbs.style.color="Blue";
let partsOfSpeech=[na_adjectives,particles,verbs,i_adjectives,nouns];
for(let i=0;i<partsOfSpeech.length;i++){
    let item=partsOfSpeech[i];
    item.style.display="none";
    openDiv.appendChild(item);
}
let hiraki= document.querySelector('#btn');
hiraki.addEventListener('click',function(){
    if(hiraki.textContent=='開き'){
        hiraki.textContent='締まり';
    }else{
        hiraki.textContent='開き';
    }
    showAll();
});

let particleBtn=document.querySelector('#particleBtn');
let verbBtn=document.querySelector('#verbBtn')
let nounBtn=document.querySelector('#nounBtn');
let iAdjBtn=document.querySelector('#iAdjBtn');
let naAdjBtn=document.querySelector('#naAdjBtn');

displayButton(verbBtn,verbs);
displayButton(particleBtn,particles);
displayButton(nounBtn,nouns);
displayButton(iAdjBtn,i_adjectives);
displayButton(naAdjBtn,na_adjectives);

function displayButton(button,type){
    button.addEventListener('click',function(){
        showType(type);
    });
}
function addWords(type){
    switch(type){
        case 'noun':
        return '私、最高、友、達猫、もも';
        break;
        case 'iAdj':
        return '優しくて';
        break;
        case 'naAdj':
        return '（きれいNa Adjective）';
        break;
        case 'verb':
        return '(です　だ Verbs)';
        break;
        case 'particle':
        return '（の,が,な,　から）';
        break;
    }
}
function showType(type){
    if(type.style.display=="none"){
        type.style.display="block" 
    }else{
        type.style.display="none"
    }
}
function showAll(){
    for(let i=0;i<partsOfSpeech.length;i++){
        let item=partsOfSpeech[i];
        showType(item);
     }
}


 // I only have this to test when things break
// const container = document.querySelector('#container');
// const content = document.createElement('div');
// content.textContent = 'This is here for test purposes';
// container.appendChild(content);
