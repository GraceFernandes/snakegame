const play = document.querySelector('.play');

let fimDeJogo = false;
let foodX , foodY;
let snakeX = 5, snakeY = 10;
let snakeBody =[];
let velocidadeX = 0, velocidadeY = 0;
let definirIntervaloID;

const mudarPosicaoAlimento = () => { // valor aleatório 0 a 30 posicao do alimento
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const lidarComFimdeJogo =() =>{
    clearInterval (definirIntervaloID);
    alert ("GAME OVER! Pressione OK para Jogar novamente...");
    location.reload ();

}

const mudarDirecao = (e) => { //altera a velocidade de acordo com a direção
    if(e.key === "ArrowUp" && velocidadeY!= 1){
        velocidadeX = 0;
        velocidadeY = -1;
    } else if(e.key === "ArrowDown" && velocidadeY != -1){
        velocidadeX = 0;
        velocidadeY = 1;
    }else if(e.key === "ArrowLeft" && velocidadeX != 1){
        velocidadeX = -1;
        velocidadeY = 0;
    }else if(e.key === "ArrowRight" && velocidadeX != -1){
        velocidadeX = 1;
        velocidadeY = 0;
    }

    inicioGame();
}

const inicioGame = () => {
    if(fimDeJogo) return lidarComFimdeJogo();
    let htmlMarkup =`<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
        if(snakeX ===  foodX && snakeY === foodY){
            mudarPosicaoAlimento();
            snakeBody.push([foodX, foodY]); // empurrando a comida, criando o corpo da cobra
        }
    for( let i = snakeBody.length - 1; i >= 0; i-- ){
        snakeBody[i] = snakeBody[i -1];
    }

    snakeBody[0] =[snakeX,snakeY]; //definir o primeiro elemento do corpo da cobra para a posição atual da cobra



    //atualiza a cobra de acordoo com a velocidade atual
    snakeX += velocidadeX;
    snakeY += velocidadeY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){ //verifica se bateu na parede
        fimDeJogo = true; 
    
    }
    //adicionando a div para cada parte da corpo da cobra
    for(let i=0; i< snakeBody.length; i++){
        htmlMarkup +=`<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        //verificando se a cabeça da cobra atingiu o corpo,se sim, fim de jogo
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){ 
            fimDeJogo = true; 
    }

    play.innerHTML = htmlMarkup;
}}

mudarPosicaoAlimento();
definirIntervaloID = setInterval(inicioGame, 125);

document.addEventListener("keydown", mudarDirecao);
