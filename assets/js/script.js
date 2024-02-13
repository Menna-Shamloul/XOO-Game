let btn = document.querySelectorAll(".button-opt");
let popup = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let message = document.getElementById("message");
let title =document.querySelector('.title');
let soundToggleBtn = document.getElementById("toggle-sound");
let soundEnabled = true;  // keep track for sound state
let timerDisplay = document.getElementById("timer");
let timerInterval;
let seconds = 0;
let minutes = 0;


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

function toggleSound() {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
        soundToggleBtn.innerText = "Sound : On";
    }else {
        soundToggleBtn.innerText = "Sound : Off";
    }
 
}

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

function pauseTimer() {
    clearInterval(timerInterval);

}

function resetTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    timerDisplay.innerText = '00:00';
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
    
        
    }
    else{
        message.innerHTML = "'O' Wins";
        message.style.color = '#3F66Da'
        play()
    
        
    }
};

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
    enableButtons();
    title.innerHTML = 'X O GAME';
    resetTimer();
    startTimer();
});

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
    updateSoundToggleButtonText();
    startTimer();


};

const updateSoundToggleButtonText = () => {
    soundToggleBtn.innerText = soundEnabled ? "Sound On" : "Sound Off";
};
soundToggleBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    updateSoundToggleButtonText();
});