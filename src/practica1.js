/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};
var GuideConv = ["8-ball", "back", "potato", "dinosaur", "kronos",
		"rocket", "unicorn", "guy", "zeppelin"];
var board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {

	this.initGame = function(gs){
		
		var numUsos = [0,0,0,0,0,0,0,0];

		for(i = 0; i < 16; i++){

			while(board[i] == 0){
				var rand = Math.floor(Math.random() * 8)
				if(numUsos[rand] < 2){
					board[i] = GuideConv[rand];
					numUsos[rand]++;
				}
			}

		}
		this.draw();

	}

	this.draw = function(){
		gs.drawMessage("Playing");
		for (i = 0; i < 16; i++){
			gs.draw( board[i] , i)
		}
	}

	this.loop = function(){

		var that = this;
		setInterval(function(){
			that.draw()}
			, 16);
	}

	this.onClick = function(){


	}

	this.randomInit = function(){

		var numUsos = [0,0,0,0,0,0,0,0];

		for(i = 0; i < 16; i++){

			while(board[i] == undefined){
				var rand = Math.floor(Math.random() * 8)
				if(numUsos[rand] < 2){
					board[i] = GuideConv[rand];
					numUsos[rand]++;
				}
			}

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

	this.MemoryGameCard = function(sprite){


	}

	this.flip = function(){


	}

	this.found = function(){


	}

	this.compareTo = function(otherCard){


	}

	this.draw = function(gs, pos){


	}
};
