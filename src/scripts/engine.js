const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.getElementById("time-left"),
        score: document.getElementById("score"),
        lifes: document.querySelector("#lifes"),
        points: document.querySelector(".points"),
        bestResult: document.querySelector(".bestResult")
    },
    value: {
        gameVelocity: 1000,
        enemyPosition: 0,
        result: 0,
        currentTime: 60,
        chances: 3,
        allPoints: [],
    },
    actions: {
        moveTime: null,
        countTime: null,
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play()
}



function countDown() {
    state.value.currentTime--
    state.view.timeLeft.textContent = state.value.currentTime;

    if (state.value.currentTime <= 0) {
        clearInterval(state.actions.moveTime);
        clearInterval(state.actions.countTime);

        state.value.allPoints.push(state.value.result)

        state.view.points.innerText = `Game Over! Você fez ${state.value.result} ${state.value.result <= 1 ? "acerto" : "acertos"}`

        console.log(state.value.chances)
        if(state.value.chances > 0) {
            state.value.chances--;
            state.view.lifes.textContent = `x${state.value.chances}`
        } 
        if(state.value.allPoints.length === 3) {
            let higherResult = Math.max.apply(null, state.value.allPoints)

            state.view.bestResult.innerText = `Seu melhor resultado foi: ${higherResult}`

            state.value.allPoints = [];
            state.view.lifes.textContent = "x3"
        }
        
    }
}



function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy")
    state.value.enemyPosition = randomSquare.id
}


function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.value.enemyPosition) {
                state.value.result++
                state.view.score.textContent = state.value.result;
                state.value.enemyPosition = null;
                playSound("hit");
            }
        })
    })
}

function reset() {
    state.view.score.textContent = 0
    state.value.currentTime = 60
    state.view.timeLeft.textContent = state.value.currentTime;
    state.view.points.innerText = ""
    state.value.result = 0
    state.view.bestResult.innerText = ""

    if(state.value.chances === 0) {
        state.value.chances = 3;
    }
}

function initialize() {
    addListenerHitbox()
    reset()
    state.actions.moveTime = setInterval(randomSquare, 500)
    state.actions.countTime = setInterval(countDown, 1000)
}




