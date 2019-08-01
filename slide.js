

// Getting HTML elements————————

const subtextTag = document.querySelector("h1");
const maintextTag = document.querySelector("h2");
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



//——————Fetching JSON data ———————
let dataNumber = 0;
let dataset = [];
let color_random = 100;


//Google Tag JS ->  1g-zeqt53tnIEecFTg6mu5yXU42dIP9uQXUHVq5eI_h8
//https://spreadsheets.google.com/feeds/list/1g-zeqt53tnIEecFTg6mu5yXU42dIP9uQXUHVq5eI_h8/1/public/values?alt=json


 // Fetching Google Docs link —————————
 // Good tutorial to follow : https://medium.com/dali-lab/google-sheets-and-json-easy-backend-e29e9ef3df2

const url = "https://spreadsheets.google.com/feeds/list/1g-zeqt53tnIEecFTg6mu5yXU42dIP9uQXUHVq5eI_h8/1/public/values?alt=json"
let googleSheet = [];
let numberText = []; 
let subText = []; 
let mainText = []; 

fetch(url)
    .then(function(response){
            return response.json();
    })
    .then(function(data){
        googleSheet = data.feed.entry;
        console.log(googleSheet);
        for (var i = 0; i < googleSheet.length; i += 1){
            subText.push(googleSheet[i].gsx$subtext.$t);
            mainText.push(googleSheet[i].gsx$maintext.$t);
            numberText.push(googleSheet[i].gsx$number.$t);
        }
        console.log("Everything is now loaded...!")
        console.log("Length of Google Docs" + googleSheet.length)

        updateSection();
    }).catch(function(){
        console.log("Can't load Google Docs!");
    })




//Make sure to update everything here.
const updateSection= () => {

    pagenumTag.innerHTML = dataNumber + "/" + (googleSheet.length - 1);
    maintextTag.innerHTML = mainText[dataNumber];
    subtextTag.innerHTML =  subText[dataNumber];


    if(mainText[dataNumber].length > 200){
        console.log("The text is long so I resised it text :" + mainText[dataNumber].length);
        maintextTag.classList.add("long");
    }
    else{
        maintextTag.classList.remove("long");
    }


    //---Changing the pretty colors

    color_random = Math.random()*360;

    circleTag.style.backgroundColor =  `hsl(${color_random},100%,50%)`;
    bodyTag.style.backgroundColor =  `hsl(${color_random},100%,70%)`;
    maintextTag.style.color = `hsl(${color_random},50%,30%)`;
    subtextTag.style.color = `hsl(${color_random},50%,30%)`;
    pagenumTag.style.color = `hsl(${color_random},50%,30%)`;

}


//——————— Change Script —————————//


const next = () => {
    dataNumber = dataNumber + 1;

    if(dataNumber > googleSheet.length - 1 ){
        dataNumber = 0;
       }

    updateSection();
}

const previous = () => {
    dataNumber = dataNumber - 1;

    if(dataNumber < 1){
        dataNumber = 0;
    }
    updateSection();
}

const randomChange = () => {
    dataNumber = Math.floor(Math.random() * googleSheet.length);
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

