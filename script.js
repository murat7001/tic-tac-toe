const selectArea = document.querySelector(".select-area"),
    playerX = document.querySelector(".playerX"),
    playerO = document.querySelector(".playerO"),
    gameArea = document.querySelector(".game-area"),
    turn = document.querySelector(".turn"),
    squares = document.querySelectorAll(".squares"),
    resultArea = document.querySelector(".result-area"),
    win = document.querySelector(".result-area p"),
    again = document.querySelector(".again");


let tempIndx=[];

window.onload = function(){
    selectArea.classList.add("loaded");

    playerX.addEventListener("click",()=>{
        selectArea.classList.remove("loaded");
        gameArea.classList.add("loaded");
        
        clk("X");
    });

    playerO.addEventListener("click",()=>{
        selectArea.classList.remove("loaded");
        gameArea.classList.add("loaded");
        
        clk("O");   
    });

    again.addEventListener("click",()=>{
        resultArea.classList.remove("loaded");
        window.location.reload();
    });
};

function clk(player){
    let flag=0;
    squares.forEach((option,index)=>{
        option.addEventListener("click",()=>{
            for(let index2 of tempIndx){
                if(index2==index){
                    flag=1;
                    break;
                }
            }
            if(flag==0){
                option.innerHTML=`${player}`;
                tempIndx.push(index);
                player=="X" ? cpu("O") : cpu("X");
            }else{
                flag=0;
            }
        });
    });
}

function cpu(cpuPlayer){
    cpuPlayer=="O" ? winner("X") : winner("O");
    if(tempIndx.length<squares.length){
        turn.innerHTML="Cpu's turn";
        gameArea.classList.add("active");
        let cpuAns=rand();
        
        setTimeout(() => {
        gameArea.classList.remove("active");
        turn.innerHTML="Your's turn";

        for(; ;){
            if(tempIndx.includes(cpuAns)){
                cpuAns=rand();
            }else{
                squares[cpuAns].innerHTML=`${cpuPlayer}`;
                tempIndx.push(cpuAns);
                break;
            }
        }

        cpuPlayer=="O" ? winner("X") : winner("O");
        }, 500);
    }
}

function rand(){
    let cpuAns=Math.floor(Math.random() * squares.length);
    return cpuAns;
}

function checkWinner(indx1, indx2, indx3, player){
    if(squares[indx1].textContent==player && squares[indx2].textContent==player && squares[indx3].textContent==player ){
        return true;
    }
}

function winner(player){
    let cpuPlayer= player=="X" ? "O" : "X";
    
    if(checkWinner(0,1,2,player) || checkWinner(3,4,5,player) || checkWinner(6,7,8,player) || checkWinner(0,3,6,player) || checkWinner(1,4,7,player) || checkWinner(2,5,8,player) || checkWinner(0,4,8,player) || checkWinner(2,4,6,player))
    {
        win.innerHTML="Player("+`${player}`+") Won!!";
        gameArea.classList.remove("loaded");
        resultArea.classList.add("loaded");
    }
    
    else if((checkWinner(0,1,2,cpuPlayer) || checkWinner(3,4,5,cpuPlayer) || checkWinner(6,7,8,cpuPlayer) || checkWinner(0,3,6,cpuPlayer) || checkWinner(1,4,7,cpuPlayer) || checkWinner(2,5,8,cpuPlayer) || checkWinner(0,4,8,cpuPlayer) || checkWinner(2,4,6,cpuPlayer)))
    {
        win.innerHTML="Player("+`${cpuPlayer}`+") Won!!";
        gameArea.classList.remove("loaded");
        resultArea.classList.add("loaded");
    }

    if(tempIndx.length==squares.length){
        if(!((checkWinner(0,1,2,player) || checkWinner(3,4,5,player) || checkWinner(6,7,8,player) || checkWinner(0,3,6,player) || checkWinner(1,4,7,player) || checkWinner(2,5,8,player) || checkWinner(0,4,8,player) || checkWinner(2,4,6,player)) || ((checkWinner(0,1,2,cpuPlayer) || checkWinner(3,4,5,cpuPlayer) || checkWinner(6,7,8,cpuPlayer) || checkWinner(0,3,6,cpuPlayer) || checkWinner(1,4,7,cpuPlayer) || checkWinner(2,5,8,cpuPlayer) || checkWinner(0,4,8,cpuPlayer) || checkWinner(2,4,6,cpuPlayer)))))
        {
            win.innerHTML="Match Draw";
            gameArea.classList.remove("loaded");
            resultArea.classList.add("loaded");
        }
    }
}



