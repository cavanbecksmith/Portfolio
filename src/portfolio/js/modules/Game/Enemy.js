import $ from 'jquery';

class Enemy {
	constructor(obj){

		this.container = obj.container;
		this.left = obj.left;
		this.top = obj.top;
		this.index = obj.index;
		this.row = obj.row;
		this.col = obj.col;

		this.width = 200;
		this.height = 100;

		this.create();
	}

	create(){
		
		this.el = $('<div class="ENEMY"></div>')
			.css({'position': 'absolute'});

		console.log('PARENT',this.container);

		$(this.container).append(this.el);

	}

	hit(){
		console.log('OH NO BEEN HIT!');
	}

	rowdown() {}

	moveright(){

	}
}

export {Enemy};