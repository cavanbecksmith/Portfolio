import $ from 'jquery';
import {TweenMax} from 'gsap';

class Enemy {
	constructor(obj){

		// === DEBUG
		window.enemy = this;

		// OBJECT VARIABLES
		this.container = obj.container;
		this.el = null;
		// this.left = obj.left;
		// this.top = obj.top;
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
		this.ishit = false;
		this.update = null;

	}

	create(){
		
		// CREATES ENEMY CONTAINER
		this.el = $('<div class="ENEMY"></div>')
			.attr({'data-row': this.row, 'data-col': this.col})
			.css({'position': 'absolute', 'left': this.left})
			.css({'background': 'white', 'width': this.width, 'height': this.height});

		// APPEND
		$(this.container).append(this.el);

		// SETS THE POSITION BASED IN WINDOW DIMMENSIONS
		this.positionEnemy(this.col, this.max_col);

	}

	positionEnemy(col, max_col){
		// console.log('===========');
		// console.log('ENEMY', ' Col: ', col, 'Row: ', this.row);
		var height = $(window).height();
		var width = $(this.container).width();
		col = col+1;
		max_col = max_col+1;
		var percentage = (width) * (col / max_col)
		percentage = percentage - (this.width * 4)
		TweenMax.set(this.el, {left: (percentage)});
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
		var pos = this.el.css('left');
		pos = pos.replace('px', '');
		pos += 0.1;
		this.el.css('background', pos+'px');
		console.log(pos);
	}

	// MOVELEFT
	moveleft(){

	}

	update(){
		// HIT CHECK
		// this.hit();

		// MOVE IN CORRECT DIRECTION
		

	}

}

export {Enemy};