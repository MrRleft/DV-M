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
	this.totalScore = 0;
	this.GraphicServer = gs;
	this.board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

	this.initGame = function(){
		
		for(i = 0; i < 16; i++)
			this.board[i] = new MemoryGameCard( Math.trunc(i/2))
		this.loop();

	}

	this.draw = function(){
		this.GraphicServer.drawMessage("Playing");
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

	var Sprite = id;
	var Flipped = false;
	var Found = false;

	

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

		if (this.Card === otherCard.Card)
			return true;

	}

	this.draw = function(gs, pos){

		if(this.Flipped)
			gs.draw(this.Card, pos);
		else
			gs.draw("back", pos);

	}
};
