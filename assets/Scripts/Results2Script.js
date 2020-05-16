let hirakibutton=document.querySelector('#hiraki');
let buttons=[...document.querySelectorAll('.show')]
let text=document.querySelector("#text");
let tokens=[...document.querySelectorAll('.tokens')];
 let info =[...document.querySelectorAll('.info')]

 console.log(info.length);

buttons.forEach(element=>{
    let value=element.textContent.split(" ")[1].slice(0,-1);
    switch(value){
        case 4:
    }
    element.addEventListener("mouseover", element =>{
      //  element.classlist.toggle("value");
    })
});
for(let i=0 ;i<tokens.length;i++){
    let displayed=false;
    tokens[i].addEventListener('mousemove', ()=>{
        if(displayed==false){
            info[i].style.display="initial";
        }
    })
    tokens[i].addEventListener('mouseleave', ()=>{
        if(displayed==false){
            info[i].style.display="none"; 
        }
    })
    tokens[i].addEventListener('click', ()=>{
        if(info[i].style.display=="initial"){
            info[i].style.display="none"
            displayed=false;
        }else{
            displayed=true;
            info[i].style.display="initial"
        }       
        console.log("clicked");
    })
}
hirakibutton.addEventListener('click',()=>{
    if(hirakibutton.textContent=="開く"){
        hirakibutton.textContent="開かない"
    }else{
        hirakibutton.textContent='開く'
    }
    tokens.forEach(individualToken=>{
        let activeClass=individualToken.id+"Active";
        console.log(`This it the activeClass: ${activeClass} of ${individualToken.textContent}`);
        individualToken.classList.toggle(activeClass);
    })
});
buttons.forEach(element=>{
    element.addEventListener('click', ()=>{
        let activeClass=element.name+"Active";
        console.log(`This is the name ${element.name} of ${element.textContent}`);
        tokens.forEach(individualToken=>{
            console.log(`This is the id of: ${individualToken.textContent} of ${individualToken.id}`);
            if(element.name==individualToken.id){
                let tokenClass=individualToken.id+"Active";
                individualToken.classList.toggle(tokenClass);
            }
        })
    })
});
