/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};


/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {

	var GuideConv = ["8-ball", "potato", "dinosaur", "kronos",
		"rocket", "unicorn", "guy", "zeppelin"];
	var Messages = ["Try Again", "Match Found!!", "You Win!!", "MemoryGame"]
	this.totalScore = 0;
	this.GraphicServer = gs;
	this.board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	this.A_Card_is_Flipped = false;
	this.CurrentFlipped = -1;
	this.ParFound = false;
	var idInterval;

	this.initGame = function(){
		
		for(i = 0; i < 16; i++)
			this.board[i] = new MemoryGameCard(GuideConv[Math.trunc(i/2)]);
		this.shuffle(this.board);
		this.loop();

	}

	this.draw = function(){

		if(this.totalScore === 8)
			this.GraphicServer.drawMessage(Messages[2]);
		else if(!this.A_Card_is_Flipped && this.CurrentFlipped !== -1)
			this.GraphicServer.drawMessage(Messages[0]);
		else if(this.CurrentFlipped === -1)
			this.GraphicServer.drawMessage(Messages[3]);
		else if(this.ParFound)
			this.GraphicServer.drawMessage(Messages[1]);

		for (i = 0; i < 16; i++){
			this.board[i].draw(this.GraphicServer, i);
		}

	}

	this.loop = function(){

		var that = this;
		setInterval(function(){
			that.draw()}
			, 16);
	}

	this.onClick = function(cardId){
			//El cardId la pos del array a la que pertenece la carta que pulsas-
		
		if(!this.board[cardId].Flipped){

			this.board[cardId].flip();

			if(this.A_Card_is_Flipped){

				if (this.board[cardId].compareTo(this.board[this.CurrentFlipped])){

					this.ParFound = true;
					this.A_Card_is_Flipped = false;
					this.totalScore++;

				}
				else{
					var that = this;
					var idInterval = setInterval(function(){
						that.showCards()}, 300);
					
				}
				this.A_Card_is_Flipped = false;
			}
		
			else{
				this.A_Card_is_Flipped = true;
				this.CurrentFlipped = cardId;
			}
		}

		this.showCards = function(){

			this.ParFound = false;
			this.board[cardId].flip();
			this.board[this.CurrentFlipped].flip();
			window.clearInterval(idInterval);
		}
	}

	this.shuffle = function (a){
	    
	    var j, x, i;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
	    }

    }



};



/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {

	this.Sprite = id;
	this.Flipped = false;
	this.Found = false;

	

	this.flip = function(){

		if (this.Flipped)
			this.Flipped = false;
		else
			this.Flipped = true;

	}

	this.found = function(){

		this.Found = true;

	}

	this.compareTo = function(otherCard){

		if (this.Sprite === otherCard.Sprite)
			return true;
		else return false;

	}

	this.draw = function(gs, pos){

		if(this.Flipped)
			gs.draw(this.Sprite, pos);
		else
			gs.draw("back", pos);

	}
};
