var quote;

function getData() {
  fetch("./quote.json")
    .then((res) => res.json())
    .then((data) => setQuoteData(data))
    .catch(function (error) {
      console.error("something went wrong !");
    });
}

function setQuoteData(data) {
  quote = data;
}

getData();

//Random quote from json file
function getRandomQuote() {
  console.log("hehee")
  const valueOfLevel = document.querySelector("#levels").value;
     console.log(quote[valueOfLevel])
  let randIndex = Math.floor(Math.random() * 3).toString();
  // console.log(randIndex)
  const page1= document.querySelector(".page1")
  const page2= document.querySelector(".page2")
  page1.style.setProperty("opacity","0")
  page1.addEventListener('transitionend',()=>{
    page1.remove();
    page2.style.setProperty("opacity","1")
  })
  if (valueOfLevel === "easy") {
    var text = quote["easy"][randIndex];
    newquotes(text);
  } else if (valueOfLevel === "medium") {
    var text = quote["medium"][randIndex];
    newquotes(text);
  } else if (valueOfLevel === "hard") {
    var text = quote["hard"][randIndex];
    newquotes(text);
  }
}

const quoteDisplay = document.querySelector("#Quote-display");
const quoteInput = document.querySelector("#Quote-editor");
const submitButton = document.querySelector("#submit-button");

quoteInput.addEventListener("input", callInterval, { once: true });

submitButton.addEventListener("click", getRandomQuote, { once: true }); //as we click on button we get a random quotes

quoteInput.addEventListener("input", () => {
  const arraydisplay = quoteDisplay.querySelectorAll("span");
  const arrayinput = quoteInput.value.split("");
  var rightcount = 0;
  var errorCount = 0;
  arraydisplay.forEach((characterSpan, index) => {
    const character = arrayinput[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
    } else if (arrayinput.length >= arraydisplay.length) {
      getRandomQuote();
    } else {
      if (character === characterSpan.innerText) {
        characterSpan.classList.add("correct");
        characterSpan.classList.remove("incorrect");
        rightcount++;
      } else {
        characterSpan.classList.add("incorrect");
        characterSpan.classList.remove("correct");
        errorCount++;
      }
    }
  });

  // console.log("incorrect = ", errorCount);
  // console.log("correct = ", rightcount);
  var totalCount = errorCount + rightcount;
  // console.log("total count = ", totalCount);

  var speed = totalCount / 5 - errorCount;
  var netTypingspeed = speed / valueOf;
  console.log(netTypingspeed);

  const arrayWord = quoteDisplay.innerText.split(" ");
  const len = arrayWord.length;

  for(let i=0; i<=len ; i++){
    console.log(i);
    document.querySelector("#word").innerText = i+1;
  }
  
  document.querySelector("#testspeed").innerText = netTypingspeed;
  
});
function result(){
  alert("You type with the speed of (WPM)"+" WPM"+"Keep practicing! ")
}

async function newquotes(text) {
  quoteDisplay.innerHTML = "";
  text.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplay.appendChild(characterSpan);
  });
  quoteInput.value = null;
}

var valueOfTimer = document.querySelector("#timer").value;
const valueOf = valueOfTimer / 60;

function callInterval() {
  timer();
  var intervalForTyping = setInterval(timer, 1000);
  function timer() {
    timedisplay.innerHTML = valueOfTimer;
    valueOfTimer--;
    if (!valueOfTimer) {
      timedisplay.innerText = "Time over";
      clearInterval(intervalForTyping);
      quoteInput.addEventListener("keypress",result);
    }
  }
}

