const messageEl = document.getElementById("message");
const randomNumber = getRandomNumber();
console.log("Random=", randomNumber);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognation = new window.SpeechRecognition();
recognation.start();

function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

function writeMessage(msg) {
  messageEl.innerHTML = `
        <div>You Said: </div>
        <span class="box">${msg}</span>
    `;
}

function checkNumber(msg) {
  const number = +msg;

  Number.isNaN(number) ?  messageEl.innerHTML += `<div>That is not a valid number</div>` : '';
  number > 100 || number < 1 ?  messageEl.innerHTML += `Number must be between 1 and 100` : '';
  
  if (number === randomNumber) {
    document.body.innerHTML = `
          <h2>Congrats! You have guessed the number!<br/><br/>
          It was ${number}</h2>
          <button class="play-again" id="play-again">Play Again</button>
        `;
  } else if (number > randomNumber) {
    messageEl.innerHTML += `<div>GO LOWER</div>`;
  } else {
    messageEl.innerHTML += `<div>GO HIGHER</div>`;
  }
};

function getRandomNumber() {return Math.floor(Math.random() * 100) + 1}
recognation.addEventListener("result", onSpeak);
recognation.addEventListener("end", () => recognation.start());
document.body.addEventListener('click', (e) => e.target.id == 'play-again' ? window.location.reload() : '')
