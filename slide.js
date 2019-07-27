
//Getting the tag!


let pageNumber = 0;


//——————Fetching JSON data ———————

let dataset = [];

fetch("textdata.json").then(function(response){
    return response.json();
}).then (function(jsonData){
    console.log(jsonData);
    dataset = jsonData;
    updateSection();
})



const importTag = document.querySelector("h1");
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



const tagImport =() =>{

    if(dataset.length > 0){
    }

    importTag.innerHTML = "Loading script from outside" + Math.random();
}

//Make sure to update everything here.
const updateSection= () => {
    pagenumTag.innerHTML = pageNumber + "/" + dataset.length;
    outputTag.innerHTML = dataset[pageNumber].copy;
    circleTag.style.backgroundColor =  dataset[pageNumber].circle;
    bodyTag.style.backgroundColor =  dataset[pageNumber].background;
    tagImport();
}




//——————— Change Script —————————//


const next = () => {
    pageNumber = pageNumber + 1;

    if(pageNumber > dataset.length){
        pageNumber = 0;
       }

    updateSection();
}

const previous = () => {
    pageNumber = pageNumber - 1;

    if(pageNumber < 1){
        pageNumber = 0;
    }
    updateSection();
}

const randomChange = () => {
    pageNumber = Math.floor(Math.random() * dataset.length);
    updateSection();
}


//——————— Key Change Script —————————//


document.addEventListener("keyup",function(keyis){
console.log(keyis);


if(keyis.key == "ArrowRight"){
    next();
}

if(keyis.key == "ArrowLeft"){
    previous();
}

})

//——————— Initialise —————————//

