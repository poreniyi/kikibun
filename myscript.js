let openDiv=document.querySelector('#open');
const para=document.createElement('p');
para.textContent=addText();
const i_adjectives=document.createElement('p');
i_adjectives.textContent=addiAdj();
const na_adjectives=document.createElement('p');
const nouns=document.createElement('p');

let button= document.querySelector('.btn');
button.addEventListener('click',showWords)


 function addText(){
    return '（の、が、な　からParticles Blue）　（私、最高、友、達猫、ももNoun）　（きれいNa Adjective）　(優しくて　いAdjective)';
}
function addiAdj(){
    return 'LOOK AT ME優しくて';
}
function showWords(){
    openDiv.appendChild(para);
}
function showAdj(){
    openDiv.appendChild(i_adjectives);
}
function Noun(){
    openDiv.appendChild(i_adjectives);
}
function showALl(){
    openDiv.appendChild(para);
    openDiv.appendChild(i_adjectives);
}
 // I only have this to test when things break
const container = document.querySelector('#container');
const content = document.createElement('div');
content.textContent = 'This is here for test purposes';
container.appendChild(content);