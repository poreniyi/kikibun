let xhr=new XMLHttpRequest();
const form=document.querySelector('#form')
const button= document.querySelector("#button")
const ap= document.querySelector("#ap")

const textArea=document.querySelector("#text");
const genki=document.querySelector("#genki");
let jlpt=document.querySelector("#JLPT");

let url="/results.html";
let object={
    text:textArea.textContent,
    JLPT:jlpt.textContent,
    GEKNI:genki.textContent,
};
console.log(ap.value);
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json");
xhr.onreadystatechange=function(){
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    }
}

form.addEventListener("submit",function(event){
   event.preventDefault();
    xhr.send(object);
})