let buttons=[...document.querySelectorAll('button')];
let VerbColor=getComputedStyle(document.body).getPropertyValue('--Verb-Color');
let VerbColor=getComputedStyle(document.body).getPropertyValue('--Noun-Color');
let VerbColor=getComputedStyle(document.body).getPropertyValue('--Particle-Color');
let VerbColor=getComputedStyle(document.body).getPropertyValue('--Na-Adjective-Color');
let VerbColor=getComputedStyle(document.body).getPropertyValue('--I-Adjective-Color');

console.log(`Verb color is: ${VerbColor}`);
buttons.forEach(button=>{
    console.log(`The value of this button is:${button.value}`);
})
