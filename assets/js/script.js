let btn = document.querySelectorAll(".button-opt");
let popup = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let message = document.getElementById("message");
let title =document.querySelector('.title');
let soundToggleBtn = document.getElementById("toggle-sound");
let soundEnabled = true;  // keep track for sound state
let timerElement = document.getElementById("timer");
let timerInterval;
let seconds = 0;
let minutes = 0;
let score_o = 0;
let score_x = 0;


let winning = [
    [0,1,2],
    [0,3,6],
    [2,5,8],
    [6,7,8],
    [3,4,5],
    [1,4,7],
    [0,4,8],
    [2,4,6],
];

function play() {
    if (soundEnabled) {
        var audio = new Audio('assets/audio/win.wav');
        audio.play();

    }
}

// create toggle sound fuction
function toggleSound() {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
        soundToggleBtn.innerText = "Sound : On";
    }else {
        soundToggleBtn.innerText = "Sound : Off";
    }
 
}

// create function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        timerElement.innerText = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    },1000);
}

// create function to stoptimer when game end
function pauseTimer() {
    clearInterval(timerInterval);

}

// create function to reset timer when start new game
function resetTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    timerElement.innerText = '00:00';
}


let xTurn = true;
let count = 0;

const disableButtons = () =>{
    btn.forEach((element) => (element.disabled = true));
    popup.classList.remove("hide");
    
};

const enableButtons = () =>{
    btn.forEach((element) =>{
        element.innerText = "";
        element.disabled = false;
    });
    popup.classList.add("hide");

};

const winFun = (letter) => {
    disableButtons();
    pauseTimer();
    if(letter == "X"){
        message.innerHTML = "'X' Wins";
        message.style.color = '#ED3E3E'
        play()
        score_x = score_x + 1;  // add 1 to x score when x win
        document.getElementById("score-x").innerHTML = score_x;
    
        
    }
    else{
        message.innerHTML = "'O' Wins";
        message.style.color = '#3F66Da'
        play()
        score_o = score_o + 1;  // add 1 to score o when o win
        document.getElementById("score-o").innerHTML = score_o;
    
        
    }
};

// create draw function and stop timer
const drawFun = () =>{
    disableButtons();
    pauseTimer();
    message.innerHTML = "Draw";
}

newgameBtn.addEventListener("click", ()=>{
    count = 0;
    enableButtons();
    title.innerHTML = 'X O GAME';
    resetTimer();
    startTimer();
});

restartBtn.addEventListener("click", ()=>{
    count = 0;
    score_o = 0;
    score_x = 0;
    enableButtons();
    title.innerHTML = 'X O GAME';
    resetTimer();
    startTimer();
    document.getElementById("score-o").innerHTML = score_o;
    document.getElementById("score-x").innerHTML = score_x;
});

// create checkfunction to check who is when
const winnerCheck = () =>{
    for(let i of winning){
        let [element1, element2, element3] = [
            btn[i[0]].innerText,
            btn[i[1]].innerText,
            btn[i[2]].innerText,
        ];
        if(element1 != "" && (element2 != "") & (element3 != "")){
            if(element1 == element2 && element2 == element3){
                winFun(element1);
            }
        }
    }
};

btn.forEach((element) =>{
    element.addEventListener("click", () => { 
        if (xTurn){
            xTurn = false;
            element.innerText = "X";
            element.disabled = true;
            element.style.color = '#c3195d'
            title.innerHTML = 'O Turn';
        }
        else{
            xTurn = true;
            element.innerText = "O";
            element.disabled = true;
            element.style.color = '#240747'
            title.innerHTML = 'X Turn';
        }
        count += 1;
        if (count == 9) {
            drawFun();
        }
        winnerCheck();
    });
}); 
window.onload = () => {
    enableButtons();
    updateSoundToggleButtonText();  // call updatesound at the beginning of the game
    startTimer();   // call starttimer at the beginning of the game


};

// create update soundtoggle function
const updateSoundToggleButtonText = () => {
    soundToggleBtn.innerText = soundEnabled ? "Sound On" : "Sound Off";
};
soundToggleBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    updateSoundToggleButtonText();
});