import {TweenMax, Power2, TimelineMax, Back} from "gsap";
import $ from 'jquery';
import Granim from 'granim';
import {Flame} from './Flame';

var inlineSVG = require('inline-svg');
var requestId = undefined;
var GameObj;

class Game {

	constructor(container){

		console.log('================')
		console.log('SHIP CONSTRUCTOR')

		this.container = container;
		this.direction = 'still';
		this.speed = 0;
		this.width = 100;
		this.rocket = '../img/ship/ship.svg';
		this.smoke = '../img/ship/smoke.svg';
		this.boundary = {
			min: 0,
			max: $(window).width()
		};
		this.takenOff = false;

		// Create gradient
		this.gradient = new Granim({
		    element: '#GRADIENT',
		    name: 'interactive-gradient',
		    // elToSetClassOn: '.canvas-interactive-wrapper',
		    direction: 'top-bottom',
		    opacity: [1, 1],
		    isPausedWhenNotInView: true,
		    stateTransitionSpeed: 500,
		    states : {
		        "default-state": {
		            gradients: [
		                ['#90dffe', '#38a3d1'],
		                // ['#ADD100', '#7B920A'],
		                // ['#1A2980', '#26D0CE']
		            ],
		            // transitionSpeed: 10000
		            loop: false
		        },
		        "dark": {
		            gradients: [
		                ['#9D50BB', '#6E48AA'],
		                ['#4776E6', '#8E54E9']
		            ],
		            // transitionSpeed: 2000,
		            loop: false
		        },
		        "light": {
		            gradients: [ ['#FF4E50', '#F9D423'] ],
		            loop: false
		        }
		    }
		});
		this.el = null;
		this.create();
	}

	// ==== Return an image object
	preloadImage(url)
	{
	    var img=new Image();
	    img.src=url;
	    return img;
	}

	// ==== Create elements
	create(){
		
		// Setup Variables, append img to ship container
		var $this = this;

		var rkt = this.preloadImage(this.rocket);
		rkt = $(rkt).attr('class', 'INLINE rocket');

		// var smoke = this.preloadImage(this.smoke);
		// smoke = $(smoke).attr('class', 'INLINE smoke');

		// Create rocket container
		var rktContainer = $('<div></div>')
			.attr({'width': this.width, 'class': 'SHIP'})
			.css({'width': '100px', 'position': 'absolute'});

		var flameCont = $('<canvas id="flame"></canvas>')
			.css({
			    'position': 'absolute',
			    'top': '-50px',
			    'transform': 'rotate(180deg)',
			    'width': '300px',
			    'left': '-100px'
			});

		// Append ship to container and rocket img (SVG) to ship
		this.container.append(rktContainer);
		rktContainer.append(rkt);
		rktContainer.append(flameCont);
		// rktContainer.append(smoke);

		// CONVERT img to svg
		this.svgConvert();

		// Create Flame and hide when created
		this.flame = new Flame('flame');
		this.flame.show();

		// Create a reference for the ship
		this.el = rktContainer;
		this.setShip();

		// Set game object
		GameObj = this;

	}

	// === Converts svg from img to svg
	svgConvert(){
		var sc = ".INLINE"
		var $this = this;
		// console.log('convert svg');
		inlineSVG.init({
		  svgSelector: sc, // the class attached to all images that should be inlined
		  initClass: 'js-inlinesvg', // class added to <html>
		}, function () {});
		return sc;
	}

	// === Moves ship based on direction given
	moveShip(direction){

		var leftPos = this.el.css('left');
		leftPos = Number(leftPos.replace('px', ''));
		var multiplier = 0.5;
		var nextPos;

		if(this.direction === 'still'){
			this.speed = 0;
			TweenMax.to(this.el, 1, {rotation: '0'});
		}
		else if(this.direction === 'left'){
			// console.log(this.el.css('left'));
			this.speed -= multiplier;
			nextPos = leftPos + this.speed;
			TweenMax.to(this.el, 1, {rotation: '-45deg'});
		}
		else if(this.direction === 'right'){
			this.speed += multiplier;
			nextPos = leftPos + this.speed;
			TweenMax.to(this.el, 1, {rotation: '45deg'});
		}

		// If the ship has taken off apply the code for moving
		if(this.takenOff === true){
			this.el.css({'left': nextPos+'px'});
		}

	}

	// ==== RESET ELEMENT POSITIONS

	// === Sets ship in initial position
	setShip(){
		TweenMax.set(this.el, {top:($(window).height() - 80), left:'20%'})
		// TweenMax.set(this.el, {scale: 0.6});
	}

	setBackground(){}


	// ==== Direction

	left(){
		this.direction = 'left';
	}

	right(){
		this.direction = 'right';
	}

	still(){
		this.direction = 'still';
	}

	// ==== actions

	shoot(){
		console.log('PEW!');
	}

	takeOff(){
		var $this = this;
		var colors = {top:"blue", bottom:"yellow"};
		var tl = new TimelineMax({onComplete: function(){
			console.log('Completed')
			$this.takenOff = true;
		}})

		tl
			.addLabel('BEGIN')
			.to(this.el, 1, {top: (this.getwinH() - 130)})
			.to(this.el, 1, {left: (this.getwinW() - (this.getwinW() / 2))});
			// .to(this.el, 1, {top: (this.getwinH() - 180), rotation: 5, left: '300', scale: })
			// .to(this.el, 5, {top: (this.getwinH() - 400), rocketotation: 45, left: '110%', scale: 3, ease: Back.easeOut.config(1.7)});
			// .to(this.el, 5, {top: 300, left: '130%', rotation: 45});

		this.dark();

		// Make the rocket takeoff
		// TweenMax.to(this.el, 2, {css: {bottom: 100}});
		
	}

	// ==== Update

	update(){
		// console.log('UPDATE');
		this.moveShip(this.direction);
	}

	loop(time) {

		// console.log((time/1000).toFixed(2));
		// Set request id to undefined so that start can run code
	    requestId = undefined;
	    
	    // doStuff(time)
	    GameObj.update();
	    GameObj.start();
	}


	// ==== return widths and heights
	getwinH(e){
		return $(window).height();
	}

	getwinW(e){
		return $(window).width();
	}

	// === GRADIENT STATES
	dark(){
		this.gradient.changeState('dark');
	}

	light(){

	}

	// === GAME STATES

	// SETINTERVAL
	// stop(){
	// 	console.log('GAME HAS STOPPED');
	// 	clearInterval(this.gameloop);
	// }


	// SETINTERVAL
	// start(){
	// 	var $this = this;
	// 	this.takeOff();
	// 	this.gameloop = setInterval(function(){
	// 		$this.update();
	// 	}, 9);
	// 	console.log(this.gameloop);
	// }

	stop() {

		// console.log('Request id on stop: ',requestId, !requestId);
	    if (requestId) {
	       window.cancelAnimationFrame(requestId);
	       requestId = undefined;
	    }
	}

	start() {

		// console.log('Request id on start: ',requestId, !requestId);
		if(!this.takenOff){
			this.takeOff();
		}

		if (!requestId) {
	       requestId = window.requestAnimationFrame(this.loop);
	    }
	}


	reset(){}

}

export {Game}	