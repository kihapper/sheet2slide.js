

// Getting HTML elements————————

const subtextTag = document.querySelector("h1");
const maintextTag = document.querySelector("h2");
const pagenumTag = document.querySelector("div.pagenum");
const nextTag = document.querySelector("img.next");
const prevTag = document.querySelector("img.prev");
const randomTag = document.querySelector("img.random");
const circleTag = document.querySelector("div.circle");
const bodyTag = document.querySelector("body");

const leftTag = document.querySelector('#left');
const rightTag = document.querySelector('#right');
const topTag = document.querySelector('#top');
const bottomTag = document.querySelector('#bottom');



nextTag.addEventListener("click",function(){
    next();
});

prevTag.addEventListener("click",function(){
    previous();
});

randomTag.addEventListener("click",function(){
    randomChange();
});


/*—————————
Fetching Google Docs link 
Good tutorial to follow : https://medium.com/dali-lab/google-sheets-and-json-easy-backend-e29e9ef3df2
Google Tag JS ->  1g-zeqt53tnIEecFTg6mu5yXU42dIP9uQXUHVq5eI_h8
https://spreadsheets.google.com/feeds/list/1g-zeqt53tnIEecFTg6mu5yXU42dIP9uQXUHVq5eI_h8/1/public/values?alt=json
————————— */

//——————Initial Data Array ———————

let dataNumber = 0;
let dataset = [];
let color_random = 100;
let border_color;
let text_color;




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


    //Change the size of the text depending on the length of the text
    if(mainText[dataNumber].length > 200){
        console.log("The text is long so I changed the text sise :" + mainText[dataNumber].length);
        maintextTag.classList.add("long");
        maintextTag.classList.remove("short");

    }
    else if(mainText[dataNumber].length < 30){
        console.log("The text is short so I changed the text sise :" + mainText[dataNumber].length);
        maintextTag.classList.add("short");
        maintextTag.classList.remove("long");

    }
    else{
        maintextTag.classList.remove("long");
        maintextTag.classList.remove("short");
    }


    //---Changing it into pretty colors

    color_random = Math.random()*360;

    //Deciding the color of the border and circle.

    bodyTag.style.backgroundColor =  `hsl(${color_random},100%,70%)`;
    circleTag.style.backgroundColor =  `hsl(${color_random},100%,50%)`;;

    text_color = `hsl(${color_random},50%,30%)`;
    maintextTag.style.color = text_color;
    subtextTag.style.color = text_color;
    pagenumTag.style.color = text_color;

    border_color = `hsl(${color_random},50%,60%)`;
    leftTag.style.backgroundColor = border_color;
    rightTag.style.backgroundColor = border_color;
    topTag.style.backgroundColor = border_color;
    bottomTag.style.backgroundColor = border_color;

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


