import {TweenMax, Power2, TimelineLite} from "gsap";
import $ from 'jquery';

var inlineSVG = require('inline-svg');

class Ship {

	constructor(container){

		console.log('================')
		console.log('SHIP CONSTRUCTOR')

		this.container = container;
		this.direction = 'still';
		this.speed = 0;
		this.width = 100;
		this.image = '../img/ship.svg';
		this.boundary = {
			min: 0,
			max: $(window).width()
		};

		this.takenOff = false;
		this.create();
	}

	preloadImage(url)
	{
	    var img=new Image();
	    img.src=url;
	    return img;
	}

	create(){
		
		var $this = this;
		var img = this.preloadImage(this.image);
		img = $(img).attr('class', 'INLINE');
		var ship = $('<div></div>').attr({'width': this.width, 'class': 'SHIP'}).css({bottom:'20px', right:'43%',position:'absolute', 'width': '100px'});

		console.log('IMAGE', img, 'SHIP', ship);

		this.container.append(ship);
		ship.append(img);

		// CONVERT SVG
		this.svgConvert();

		// EL
		this.el = ship;

		console.log(this.el);

		setInterval(function(){
			$this.update();
		}, 9)

	}

	svgConvert(){
		var sc = ".INLINE"
		var $this = this;
		// console.log('convert svg');
		inlineSVG.init({
		  svgSelector: sc, // the class attached to all images that should be inlined
		  initClass: 'js-inlinesvg', // class added to <html>
		}, function () {
			// console.log($('.INLINE'))
			// $this.el.append($('.INLINE'));
		});
		return sc;
	}

	moveShip(direction){

		var leftPos = this.el.css('left');
		leftPos = Number(leftPos.replace('px', ''));
		var multiplier = 0.1;
		var nextPos;

		if(this.direction === 'still'){
			this.speed = 0;
		}
		else if(this.direction === 'left'){
			// console.log(this.el.css('left'));
			this.speed -= multiplier;
			nextPos = leftPos + this.speed;
		}
		else if(this.direction === 'right'){
			this.speed += multiplier;
			nextPos = leftPos + this.speed;
		}


		// console.log(leftPos - this.speed);
		// console.log('SPEED: ', this.speed, 'LEFT: ', leftPos);

		if(this.takenOff === true){
			this.el.css({'left': nextPos+'px'});
		}

	}

	takeOff(){
		console.log('TAKEOFF');
		this.takenOff = true;
	}

	left(){
		this.direction = 'left';
	}

	right(){
		this.direction = 'right';
	}

	still(){
		this.direction = 'still';
	}


	shoot(){
		console.log('PEW!');
	}

	update(){
		// console.log('UPDATE');
		this.moveShip(this.direction);
	}
}

export {Ship}