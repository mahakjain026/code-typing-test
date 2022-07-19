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
let tempNetSpeed = 0;
let tempGrossSpeed = 0;
//Random quote from json file
function getRandomQuote() {
  //   console.log("hehee");
  const valueOfLevel = document.querySelector("#levels").value;
  console.log(quote[valueOfLevel]);
  let randIndex = Math.floor(Math.random() * 3).toString();
  // console.log(randIndex)
  const page1 = document.querySelector(".page1");
  const page2 = document.querySelector(".page2");
  page1.style.setProperty("opacity", "0");
  page1.addEventListener("transitionend", () => {
    page1.remove();
    page2.style.setProperty("opacity", "1");
  });
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
      characterSpan.style.setProperty("color", "black");
    } else if (arrayinput.length >= arraydisplay.length) {
      getRandomQuote();
    } else {
      if (character === characterSpan.innerText) {
        characterSpan.style.setProperty("color", "green");
        rightcount++;
      } else {
        characterSpan.style.setProperty("color", "red");
        errorCount++;
      }
    }
  });

  // console.log("incorrect = ", errorCount);
  // console.log("correct = ", rightcount);
  var totalCount = errorCount + rightcount;
  // console.log("total count = ", totalCount);

  var words = totalCount / 5;
  var wrongWord = errorCount/5;
  var netTypingspeed =( (words-wrongWord) / valueOftime);
  console.log(netTypingspeed);
//   console.log(errorCount,"9999999999990")

  const arrayWord = quoteDisplay.innerText.split(" ");
  const len = arrayWord.length;

//   document.querySelector("#testspeed").innerText = `${netTypingspeed}`;
  tempNetSpeed = netTypingspeed;
  tempGrossSpeed = words/valueOftime;
});

function result() {
  let resultSpeed = tempGrossSpeed;
  const page2 = document.querySelector(".page2");
  page2.style.setProperty("opacity", "0");
  const mainDiv = document.querySelector(".main");


  let resultAccuracy = `${(tempNetSpeed / resultSpeed) * 100}%`;
  const page3 = document.createElement("div");
  const para = document.createElement("p");
  page3.style.setProperty("opacity", "0");

  para.innerText = `Well... You type with the speed of ${resultSpeed}. ,Your accuracy was  ${resultAccuracy}.`;
  page3.append(para);
  page2.addEventListener("transitionend", () => {
      page2.remove();
      mainDiv.append(page3);
      page3.style.setProperty("opacity", "1");
  });
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
const valueOftime = valueOfTimer / 60;

function callInterval() {
  timer();
  var intervalForTyping = setInterval(timer, 1000);
  function timer() {
    timedisplay.innerHTML = valueOfTimer;
    valueOfTimer--;
    if (!valueOfTimer) {
      timedisplay.innerText = "Time over";
      const secDiv = document.querySelector(".secondsDiv");
      secDiv.remove();
      clearInterval(intervalForTyping);
      quoteInput.addEventListener("keypress", result);
    }
  }
}
