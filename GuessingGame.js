function generateWinningNumber(){
	var randomMath = Math.floor((Math.random() * 100) + 1);
	if(randomMath == 0){
		return 1;
	}
	return randomMath;
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
//shuffle([1,2,3,4,5])

function Game(){
	this.playersGuess = null;
	this.pastGuesses =[];
	this.winningNumber = generateWinningNumber();
}

//difference

Game.prototype.difference = function(){
	return Math.abs(this.playersGuess - this.winningNumber);
}

//isLower

Game.prototype.isLower = function(){
	if(this.playersGuess < this.winningNumber){
		return true;
	}
	else{
		return false;
	}
}

//playersGuessSubmission

Game.prototype.playersGuessSubmission = function(num){
	if(typeof num !== 'number' || num < 1 || num > 100){
		throw "That is an invalid guess."
	}
	else{
		this.playersGuess = num;
	}
	if(this.isLower()){
		$('h3').text('Make a higher guess!');
	}
	else if(!this.isLower() && this.checkGuess() !== 'You Win!' && this.checkGuess() !== 'You Lose.'){
		$('h3').text('Make a lower guess!');
	}	
	return this.checkGuess();
}

//checkGuess

Game.prototype.checkGuess = function(){

	if(this.playersGuess === this.winningNumber){
		$('h1').text('You Win!');
		$('h3').text('Hooray!');
		$('#submit-button').attr('disabled', 'disabled');
		$('#hint').attr('disabled', 'disabled');
		return 'You Win!'
	}
	else{
		if(this.pastGuesses.indexOf(this.playersGuess) > -1){
			console.log(1)
		return 'You have already guessed that number.';
	}
		else{
			this.pastGuesses.push(this.playersGuess);
			$('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
			if(this.pastGuesses.length === 5){
		$('h3').text('');
		$('h1').text('You Lose.');
		$('h3').text('Click the reset button to try again.');
		$('#submit-button').attr('disabled', 'disabled');
		$('#hint').attr('disabled', 'disabled');
		return 'You Lose.'
	}
			else{

				if(this.difference() < 10){
		$('h1').text('You\'re burning up!');
		return 'You\'re burning up!';
	}
	else if(this.difference() < 25){
		$('h1').text('You\'re lukewarm.');
		return 'You\'re lukewarm.';
	}
	else if(this.difference() < 50){
		$('h1').text('You\'re a bit chilly.');
		return 'You\'re a bit chilly.';
	}
	else{
		$('h1').text('You\'re ice cold!');
		return 'You\'re ice cold!';
	}

			}

		}


	}
	
	
}

//newGame

function newGame(){
	return new Game();
}

//provideHint

Game.prototype.provideHint = function(){

	var hintArr = shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
	return 'Hint: ' + hintArr;
}

// function once(){
// 	alert('submit clicked');
// }

function submit(game){
	var guess = +$('#players-input').val();
	$('#players-input').val('');
	console.log(game.playersGuessSubmission(guess));
}

$(document).ready(function(){
	var game = newGame();

$('#submit-button').on('click', function(e){
	submit(game);
});

$('#players-input').on('keypress', function(e){
	if(e.which === 13){
		submit(game);
	}
});

$('#hint').on('click', function(){
	$('h1').text(game.provideHint());
})

$('#reset').on('click', function(){
	location.reload();
})

	
})







