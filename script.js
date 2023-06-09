const play = document.querySelector('.play');

let foodX , foodY;
let snakeX = 5, snakeY = 10;
let velocidadeX = 0, velocidadeY = 0;

const mudarPosicaoAlimento = () => { // valor aleatório 0 a 30 posicao do alimento
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const mudarDirecao = (e) => { //altera a velocidade de acordo com a direção
    if(e.key === "ArrowUp"){
        velocidadeX = 0;
        velocidadeY = -1;
    } else if(e.key === "ArrowDown"){
        velocidadeX = 0;
        velocidadeY = 1;
    }else if(e.key === "ArrowLeft"){
        velocidadeX = -1;
        velocidadeY = 0;
    }else if(e.key === "ArrowRight"){
        velocidadeX = 1;
        velocidadeY = 0;
    }

    inicioGame();
}




const inicioGame = () => {
    let htmlMarkup =`<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY){
        mudarPosicaoAlimento();
    }

    //atualiza a cobra de acordoo com a velocidade atual
    snakeX += velocidadeX;
    snakeY += velocidadeY;

     htmlMarkup +=`<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    play.innerHTML = htmlMarkup;
}

mudarPosicaoAlimento();
inicioGame();

document.addEventListener("keydown", mudarDirecao);
