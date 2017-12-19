import {TweenMax, Power2, TimelineLite, TweenLite} from "gsap";
import $ from 'jquery';
// import test from '../animateGrad';

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
		
		// Setup Variables
		var $this = this;
		var img = this.preloadImage(this.image);
		img = $(img).attr('class', 'INLINE');
		var ship = $('<div></div>').attr({'width': this.width, 'class': 'SHIP'}).css({bottom:'20px', right:'43%',position:'absolute', 'width': '100px'});

		// Append ship to container and img to ship
		this.container.append(ship);
		ship.append(img);

		// CONVERT SVG
		this.svgConvert();

		// EL
		this.el = ship;

		// Start game loop
		setInterval(function(){
			$this.update();
		}, 9)

	}

	// Converts svg from img to svg
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

	// Called on update, move in direction left right & still
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

		// If the ship has taken off apply the code for moving
		if(this.takenOff === true){
			this.el.css({'left': nextPos+'px'});
		}

	}

	takeOff(){

		var colors = {top:"blue", bottom:"yellow"};

		// Make the rocket takeoff
		TweenMax.to(this.el, 2, {css: {bottom: 100}});
		this.takenOff = true;

		console.log(test);

		// https://github.com/IonicaBizau/jQuery-animate-gradient



		// https://codepen.io/GreenSock/pen/wnIcr/
		// var tween = TweenLite.to(colors, 2, {colorProps:{top:"red", bottom:"yellow"}, onUpdate:colorize, onUpdateParams:[".Slide2"], paused:true});
		// function colorize(element) {
		//   //apply the colors to the element
		//   TweenLite.set(element, {backgroundImage:"-webkit-linear-gradient(top," + colors.top + ", " + colors.bottom + ")"});
		// }
		// function over() {
		//   tween.play();
		// };
		// function out() {
		//   tween.reverse();
		// }


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