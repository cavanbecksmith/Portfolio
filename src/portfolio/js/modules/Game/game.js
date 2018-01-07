import {TweenMax, Power2, TimelineMax, Back, SlowMo, Circ} from "gsap";
import $ from 'jquery';
import Granim from 'granim';
import {Flame} from './Flame';
import anime from 'animejs';	

var inlineSVG = require('inline-svg');
var requestId = undefined;
var GameObj;

class Game {

	constructor(container){
		window.g = this;
		console.log('================')
		console.log('SHIP CONSTRUCTOR')

		// Elements
		this.container = container;
		this.el = null;

		// SPACE TIME
		this.speed = 0;
		this.width = 100;
		this.direction = 'none';

		this.rocket = 'img/ship/ship2.svg';
		// this.smoke = '../img/ship/smoke.svg';
		this.boundary = {
			min: 0,
			max: $(window).width()
		};

		// ENV Variables
		this.takenOff = false;
		this.gameReady = false;

		// CREATE GRADIENT
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
		
		this.create();
	}

	// ==== Return an image object
	preloadImage(url)
	{
	    var img=new Image();
	    img.src=url;

	    console.log(img);

	    return img;
	}

	// ==== Create elements
	create(){
		
		// Setup Variables, append img to ship container
		var $this = this;


		// LOAD ROCKET SVG IMAGE
		var rkt = this.preloadImage(this.rocket);
		rkt = $(rkt).attr('class', 'INLINE rocket');

		// ROCKET CONTAINER
		var rktContainer = $('<div></div>')
			.attr({'width': this.width, 'class': 'SHIP'})
			.css({'width': '100px', 'position': 'absolute', 'transform-origin': 'center, center'});

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

		// GLOBAL GAME OBJECT (HACK)
		GameObj = this;

	}

	// === Converts svg from img to svg
	svgConvert(){
		var sc = ".INLINE"
		var $this = this;

		inlineSVG.init({
		  svgSelector: sc, // the class attached to all images that should be inlined
		  initClass: 'js-inlinesvg', // class added to <html>
		}, function () {});
		return sc;
	}


	// ==== RESET ELEMENT POSITIONS

	setShip(){
		TweenMax.set(this.el, {top:($(window).height() - 80), left:'20%'})
		// TweenMax.set(this.el, {scale: 0.6});
	}

	setBackground(){}


	// ==== Direction

	moveShip(direction){

		var leftPos = this.el.css('left');
		leftPos = Number(leftPos.replace('px', ''));
		var multiplier = 0.5;
		var nextPos;

		// STILL
		if(this.direction === 'still'){
			this.speed = 0;
			TweenMax.to(this.el, 1, {rotation: '0'});
		}

		// LEFT
		else if(this.direction === 'left'){
			this.speed -= multiplier;
			nextPos = leftPos + this.speed;
			TweenMax.to(this.el, 1, {rotation: '-45deg'});
		}

		// RIGHT
		else if(this.direction === 'right'){
			this.speed += multiplier;
			nextPos = leftPos + this.speed;
			TweenMax.to(this.el, 1, {rotation: '45deg'});
		}

		// MOVE SHIP ANIMATION
		if(this.takenOff === true){
			this.el.css({'left': nextPos+'px'});
		}

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

	// ==== actions

	shoot(){
		console.log('PEW!');
	}

	takeOff(){
		console.log('TAKEOFF!');
		var $this = this;
		$this.takenOff = true;

		// Tweenmax version
		// 	var tl = new TimelineMax({onComplete: function(){}})

		// 	tl
		// 		.addLabel('BEGIN')
		// 		// .to(this.el, 1, {top: (this.getwinH() - 130), rotation: 45})
		// 		.to(this.el, 4, {left: (this.getwinW() - (this.getwinW() / 2) + 500), top: this.getwinH() - 600, ease: Circ.easeIn, rotation: 45})
		// 		.to(this.el, 2, {left: (this.getwinW() - (this.getwinW() / 2)), top: this.getwinH() - 300, ease: Circ.easeIn, rotation: -45})


		// ANIME VERSION
		var path = anime.path('#MOTION_PATH path');

		var motionPath = anime({
		  targets: '.SHIP',
		  translateX: path('x'),
		  translateY: path('y'),
		  rotate: path('angle'),
		  easing: 'linear',
		  duration: 2000,
		  loop: false
		});


		// console.log(path, motionPath, this.el);


	}

	// ==== Update

	update(){
		// console.log('UPDATE');
		if(this.gameReady === true){
			this.moveShip(this.direction);
		}
		window.floop();
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
	stop() {
	    if (requestId) {
	       window.cancelAnimationFrame(requestId);
	       requestId = undefined;
	       this.flame.hide();
	    }
	}

	start() {
		this.flame.show();
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