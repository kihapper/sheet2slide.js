
//Getting the tag!


let pageNumber = 1;


//——————Fetching JSON data ———————

let dataset = [];
let color_random = 100;

//http://api.icndb.com/jokes
//https://api.superhi.com/api/test/jokes/

fetch("http://api.icndb.com/jokes")
    .then(response => response.json())
    .then(jsonData => {
        console.log(jsonData);
        dataset = jsonData;
        updateSection();
})


//——————


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



//Make sure to update everything here.
const updateSection= () => {

    pagenumTag.innerHTML = pageNumber + "/" + dataset.value.length;
    outputTag.innerHTML = "&ldquo;" + dataset.value[pageNumber].joke + "&rdquo;";
    //importTag.innerHTML = dataset[pageNumber].categories;

    if(dataset.value[pageNumber].joke.length > 100){
        outputTag.classList.add("long");
        console.log(dataset.value[pageNumber].joke.length);
    }
    else{
        outputTag.classList.remove("long");
        console.log(dataset.value[pageNumber].joke.length);
    }

    color_random = Math.random()*360;

    circleTag.style.backgroundColor =  `hsl(${color_random},100%,50%)`;
    bodyTag.style.backgroundColor =  `hsl(${color_random},100%,70%)`;
    outputTag.style.color = `hsl(${color_random},50%,30%)`;
    importTag.style.color = `hsl(${color_random},30%,30%)`;

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
    pageNumber = Math.floor(Math.random() * dataset.value.length);
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

