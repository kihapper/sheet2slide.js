
//Getting the tag!


let pageNumber = 0;
const pages =[
    { copy:"Hello people my name is Tomo", background:"#edc7a9" , circle:"#3e78ed" },
    { copy:"Kanye is Weeest", background:"#a1fffe" , circle:"#e34a47"},
    { copy:"I loveloveloveyou", background:"#d3c7f3" , circle:"#f7fe00"},
    { copy: "Sec and sexy you", background:"#edc7a9" , circle:"#3e78ed"}
]


const outputTag = document.querySelector("h2");
const pagenumTag = document.querySelector("div.pagenum");
const nextTag = document.querySelector("img.next");
const prevTag = document.querySelector("img.prev");
const randomTag = document.querySelector("img.random");
const circleTag = document.querySelector("div.circle");
const bodyTag = document.querySelector("body");


nextTag.addEventListener("click",function(){
    next();
});

prevTag.addEventListener("click",function(){
    previous();
});

randomTag.addEventListener("click",function(){
    randomChange();
});



const randomChange = function(){
    pageNumber = Math.floor(Math.random() * pages.length);
    updateSection();
}

const next = function (){
    pageNumber = pageNumber + 1;

    if(pageNumber > pages.length){
        pageNumber = 0;
       }

    updateSection();
}

const previous = function(){
    pageNumber = pageNumber - 1;

    if(pageNumber < 1){
        pageNumber = 0;
    }
    updateSection();
}


const updateSection= function(){
    pagenumTag.innerHTML = pageNumber + "/" + pages.length;
    outputTag.innerHTML = pages[pageNumber].copy;
    circleTag.style.backgroundColor =  pages[pageNumber].circle;
    bodyTag.style.backgroundColor =  pages[pageNumber].background;

}


document.addEventListener("keyup",function(keyis){
console.log(keyis);


if(keyis.key == "ArrowRight"){
    next();
}

if(keyis.key == "ArrowLeft"){
    previous();
}

})

updateSection();
