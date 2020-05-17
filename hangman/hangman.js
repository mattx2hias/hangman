const canvas = document.getElementById('canvas'); // reference to canvas element
const ctx = canvas.getContext('2d');              // get render context

// used for drawing guess characters in correct position on canvas
let xCoord = {
    xCorrect: 100, 
    xWrong: 100 
};

// tracking variables
let t = {
    incorrectGuess: 0,  // used for drawing appendages in order    
    characterMatch: 0   // track character matches for win condition
}

document.getElementById('button-send').addEventListener("click", getGuess(xCoord, t));

// return word randomly selected from array
function getWord() {
    let words = ["buffalo","kayak","state","proton","igloo","neutron","electron","star",
                "galaxy","oar", "estate","monarchy","republic","tornado","moon","hamburger",
                "ice","van","boar","landmark","owl","pandemic","highlands","marsh",
                "mountain","morning","light","flowers","dungeon","basement"];
    return words[Math.floor(Math.random() * words.length)];
}

let word = getWord();

function drawFrame() {
    ctx.fillRect(150, 100, 150, 5); // overhang
    ctx.fillRect(150, 100, 5, 300); // pole
    ctx.fillRect(100, 400, 100, 5); // base
    ctx.fillRect(300, 100, 5, 50); // noose
}

function addHead() {
    ctx.beginPath();
    ctx.arc(300, 175, 25, 0, Math.PI * 2, true);
    ctx.stroke();
}

function addTorso() {
    ctx.beginPath();
    ctx.moveTo(300, 200);
    ctx.lineTo(300, 300);
    ctx.stroke();
}

function addLeftArm() {
    ctx.beginPath();
    ctx.moveTo(300, 225);
    ctx.lineTo(250, 250);
    ctx.stroke();
}

function addRightArm() {
    ctx.beginPath();
    ctx.moveTo(300, 225);
    ctx.lineTo(350, 250);
    ctx.stroke();
}

function addLeftLeg() {
    ctx.beginPath();
    ctx.moveTo(300, 300);
    ctx.lineTo(250, 370);
    ctx.stroke();
}

function addRightLeg() {
    ctx.beginPath();
    ctx.moveTo(300, 300);
    ctx.lineTo(350, 370);
    ctx.stroke();
}

function drawUnderscore(xCoord) {
    ctx.beginPath();
    ctx.moveTo(xCoord.xCorrect, 500);
    ctx.lineTo(xCoord.xCorrect + 25, 500);
    ctx.stroke();
    xCoord.xCorrect += 30;
}

function parseWord(word, xCoord) {
    for (let i = 0; i < word.length; i++) {
        if (word[i] != ' ') {
            drawUnderscore(xCoord);
        } else {
            xCoord.xCorrect += 30; // add space
        }
    }
    xCoord.xCorrect = 100; // reset to 100 for displaying wrong guess
}

/**
 * 
 * @param {*} xCoord 
 * @param {*} t 
 * get guess input from field, compare guess character with each character in word string
 * if correct, increment characterMatch, draw correct guess character on canvas
 * else, draw incorrect guess character on canvas, draw appendage
 * if characterMatch equals length of word, call win function
 * 
 */
function getGuess(xCoord, t) {
        return function curriedFunction(e) {
            let match = false;
            let guess = document.getElementById('guess-field').value;
            for (let i = 0; i < word.length; i++) {
                if (word[i] == guess) {
                    xCoord.xCorrect += (30 * i);
                    ctx.font = "30px Arial";
                    ctx.fillText(guess, xCoord.xCorrect, 490);
                    xCoord.xCorrect = 100;
                    match = true;
                    t.characterMatch++;
                } else {
                    // do nothing
                }
            }
            if (match == false) {                          
                ctx.font = "30px Arial";
                ctx.fillText(guess, xCoord.xWrong, 550);
                xCoord.xWrong += 30;
                switch(t.incorrectGuess) {
                    case 0: addHead(); break;
                    case 1: addTorso(); break;
                    case 2: addLeftArm(); break;
                    case 3: addRightArm(); break;
                    case 4: addLeftLeg(); break;
                    case 5: addRightLeg(); gameOver(); break;
                }
                t.incorrectGuess++;
            }
            if (t.characterMatch == word.length) {
                youWin();
            }
        }
}

function gameOver() {
    // ctx.font = "50px Arial";
    // ctx.fillText("Game Over", 150, 75);
    alert("You lose.\nWord was: " + word);
    location.reload();
}

function youWin() {
    // ctx.font = "50px Arial";
    // ctx.fillText("You Win!", 150, 75);
    alert("You win!");
    location.reload();
}

drawFrame();
parseWord(word, xCoord);

