let rollCount = 0;
let playerTotal = 0;
let computerTotal = 0;


function rollDice (){
    let diceFace = Math.floor(Math.random()*6)+1;
    return diceFace;
}

function displayBothDices(whoIsThePerson){

    let person = whoIsThePerson;
    let roundScore = 0;

    let diceFace1 = rollDice();

    //replace the image base on the dice face value
    $(`#${person}_dice1_img`).attr('src',`../images/dice-${diceFace1}.png`);
   
    let diceFace2 = rollDice();
    $(`#${person}_dice2_img`).attr('src',`../images/dice-${diceFace2}.png`);

    if (diceFace1 === 1 || diceFace2 === 1){
        roundScore = 0;
    }else if(diceFace1 === diceFace2){
        roundScore = (diceFace1 + diceFace2)*2;
    }else{
        roundScore = diceFace1 + diceFace2;
    }

    $(`#${whoIsThePerson}_round_result`).text(`The score for this round: ${roundScore}`)

    //keep replacing score of this round roll of dices.
   
    return {score1: diceFace1,score2: diceFace2,scoreTotal:roundScore}
}

function updateBar(playerTotal,computerTotal){

    if ((playerTotal+computerTotal) != 0){
        let playerScoreRatio = `${playerTotal/(playerTotal+computerTotal)*100}%`;
        let computerScoreRatio = `${computerTotal/(playerTotal+computerTotal)*100}%`;

        $('#player_bar').css('width',`${playerScoreRatio}`).text(`${playerTotal}`)
        $('#computer_bar').css('width',`${computerScoreRatio}`).text(`${computerTotal}`)
    }else{
        $('#player_bar').css('width',`50%`).text(`0`)
        $('#computer_bar').css('width',`50%`).text(`0`)
    }

    if(playerTotal == 0 & computerTotal != 0){
        $('#computer_bar').css('border-radius',`10px`)
        $('#player_bar').text('')

    }else if(computerTotal == 0 & playerTotal != 0){
        $('#player_bar').css('border-radius',`10px`)
        $('#computer_bar').text('')

    }else{
        $('#computer_bar').css('border-radius',``)
        $('#player_bar').css('border-radius',``)
    }

}

function popupResult(){
    $('#result_popup').fadeIn(800);
}

function resetAll(){
    rollCount = 0;
    playerTotal = 0;
    computerTotal = 0;
    rollCount = 0;
    playerTotal = 0;
    computerTotal = 0;
    $(`#btn_roll`).text(`Let's Roll!`);
    $(`#player_round_result`).text(`The score for this round: N/A`)
    $(`#player_overall_result`).text(`The overall score until round${rollCount+1}: ${playerTotal}`)
    $(`#computer_round_result`).text(`The score for this round: N/A`)
    $(`#computer_overall_result`).text(`The overall score until round${rollCount+1}: ${computerTotal}`)
    $(`#winner_result`).text(`New Game!`).removeClass()
    $('.dice_img').attr('src','../images/dice-0.gif')
    updateBar(playerTotal,computerTotal)
    $('#human_img').attr('src','../images/human_stand.png')
    $('#robot_img').attr('src','../images/robot_stand.png')
    $('#result_popup').fadeOut(300);
    

}

$('#btn_roll').on('click',function(){

    // This function will run when the counter is smaller than 3 (0,1,2 total of 3 times)
    if (rollCount<3){

        console.log(`This is round ${rollCount+1}`)
        let playerScore = displayBothDices('player');
        console.log(playerScore.score1)
        console.log(playerScore.score2)
        playerTotal += playerScore.scoreTotal
        $(`#player_overall_result`).text(`The overall score until round${rollCount+1}: ${playerTotal}`)


        console.log(`Player Total: ${playerTotal}`)
        
        let computerScore = displayBothDices('computer');
        console.log(computerScore.score1)
        console.log(computerScore.score2)
        computerTotal += computerScore.scoreTotal
        $(`#computer_overall_result`).text(`The overall score until round${rollCount+1}: ${computerTotal}`)

        updateBar(playerTotal,computerTotal)


        if (playerTotal > computerTotal){
            $(`#winner_result`).text(`You are leading!`).attr('class', 'player_wins');
            $('#human_img').attr('src','../images/human_win.png')
            $('#robot_img').attr('src','../images/robot_lose.png')
        }else if( playerTotal == computerTotal){
            $(`#winner_result`).text(`Draw!`);
        }else{
            $(`#winner_result`).text(`Computer is leading!`).attr('class', 'computer_wins')
            $('#human_img').attr('src','../images/human_lose.png')
            $('#robot_img').attr('src','../images/robot_win.png')
        }

        

        
        rollCount++;

        // when the counter reach 3, the button will change text to emphasize the next lick will start a new game.
        if(rollCount==3){
            $('#btn_roll').text(`Another game.`)
            if (playerTotal > computerTotal){
                $(`#winner_result`).text(`You win the game!`).attr('class', 'player_wins')
                $(`#popup_winner_result`).text(`You win the game!`).attr('class', 'player_wins')
                $('#human_img').attr('src','../images/human_win.png')
                $('#robot_img').attr('src','../images/robot_lose.png')
                $('#winner_img').attr('src','../images/human_win.png')
                
                
                
            }else if( playerTotal === computerTotal){
                $(`#winner_result`).text(`Draw!`);
            }else{
                $(`#winner_result`).text(`Computer wins the game!`).attr('class', 'computer_wins');
                $(`#popup_winner_result`).text(`Computer wins the game!`).attr('class', 'computer_wins');
                $('#human_img').attr('src','../images/human_lose.png')
                $('#robot_img').attr('src','../images/robot_win.png')
                $('#winner_img').attr('src','../images/robot_win.png')

            }
            popupResult()
        }

    //when the counter reaches 3 means the function has run 3 times, the next click will reset the game and all records.
    }else {
        resetAll();
    }

})

//When the reset button is clicked, the game and all records will be reset.
$('#btn_reset').on('click',function(){
        resetAll();
})

$('#result_popup_close_btn').on('click',function(){
    result_popup.style.display= 'none';
})


