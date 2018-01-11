import $ from 'jquery';

class Enemy {
	constructor(obj){

		// OBJECT VARIABLES
		this.container = obj.container;
		this.left = obj.left;
		this.top = obj.top;
		this.row = obj.row;
		this.col = obj.col;
		this.text = obj.text;
		this.max_row = obj.max_row;
		this.max_col = obj.max_col;

		// Define dimensions for label
		// MAKE SURE TEXT ISNT TOO MUCH
		this.width = 50;
		this.height = 50;

		// CREATE
		// this.create();
		this.ishit = false;
	}

	create(){
		
		// CREATES ENEMY CONTAINER
		this.el = $('<div class="ENEMY"></div>')
			.css({'position': 'absolute', 'left': this.left})
			.css({'background': 'white', 'width': this.width, 'height': this.height});

		// APPEND
		$(this.container).append(this.el);

		// SETS THE POSITION BASED IN WINDOW DIMMENSIONS
		this.positionEnemy(this.col, this.max_col);

	}

	positionEnemy(col, max_col){

		// DIVIDE THE COL BY THE MAX AMMOUNT OF COLLUMNS
		// INCLUDE WIDTH / 2 IN THE EQUATIOn

		console.log('MAX_COL: ',max_col, 'COL: ', col)
		// console.log((col+1), (max_col + 1));
	}

	// Checks to see if a bullet has hit the label
	hit(){
		console.log(this.ishit);
		('OH NO BEEN HIT!');
	}

	// MOVE DOWN A ROW
	rowdown() {

	}

	// MOVERIGHT
	moveright(){

	}

	// MOVELEFT
	moveleft(){

	}

	update(){
		this.hit();

	}

}

export {Enemy};