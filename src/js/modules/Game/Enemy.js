import $ from 'jquery';
import {TweenMax} from 'gsap';
// import {Game} from './game';

// console.log(Game);

class Enemy {
	constructor(obj){

		// === DEBUG
		window.enemy = this;

		this.container = obj.container;
		this.el = null;
		this.row = obj.row;
		this.col = obj.col;
		this.text = obj.text;
		this.max_row = obj.max_row;
		this.max_col = obj.max_col;

		this.width = 50;
		this.height = 50;

		this.top = -100;
		this.left = this.randomLeft();

		// CREATE
		this.ishit = false;
		this.update = null;

		this.ship = $('.SHIP');

		this.create();

	}

	create(){
		// CREATES ENEMY CONTAINER
		var $this = this;
		this.el = $('<div class="ENEMY"></div>')
			.css({'position': 'absolute', 'left': this.left, top: this.top})
			.css({'background': 'white', 'width': this.width, 'height': this.height});
		this.container.append(this.el);

		var shipleft, 
				shiptop, 
				eltop, 
				elleft = $this.el.css('left'),
				elwidth = $this.el.css('width'),
				elheight = $this.el.css('height');

		TweenMax.to(this.el, 10, {top: $(window).height(), onUpdate:doSomething, onComplete: destroy})

		function doSomething(){
			shipleft = $this.ship.css('left')
			shiptop = $this.ship.css('top')
			eltop = $this.el.css('top')
			console.log(shipleft, shiptop, eltop, elleft, elwidth, elheight);
			// if(elleft )
		}

		function destroy(){
			// console.log($this.el);
			$this.el.remove();
		}

	}

	logme(){
		console.log(this.el);
	}

	randomLeft(){


		function getRandomInt(min, max) {
		    return min + Math.floor(Math.random() * (max - min + 1));
		}

		return getRandomInt(0, $(window).width());
	}


}

export {Enemy};