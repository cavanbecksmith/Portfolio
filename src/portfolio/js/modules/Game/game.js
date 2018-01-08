import {TweenMax, Power2, TimelineMax, Back, SlowMo, Circ, Sine} from "gsap";
import $ from 'jquery';
import Granim from 'granim';
import {Flame} from './Flame';
import anime from 'animejs';	
import {Enemy} from './Enemy';

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
		this.direction = 'none';

		// ROCKET
		this.rocket = 'img/ship/ship2.svg';
		this.width = 200;
		this.height = 200;

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
		                ['#1e528e', '#728a7c'],
		                // ['#4776E6', '#8E54E9']
		            ],
		            // transitionSpeed: 2000,
		            loop: false
		        },
		        "darker": {
		            gradients: [
		                ['#00000c', '#00000d'],
		                // ['#4776E6', '#8E54E9']
		            ],
		            // transitionSpeed: 2000,
		            loop: false
		        }
		        // "light": {
		        //     gradients: [ ['#FF4E50', '#F9D423'] ],
		        //     loop: false
		        // }
		    }
		});
		
		this.create();
	}

	// ==== RETURN AN IMAGE OBJECT
	preloadImage(url)
	{
	    var img=new Image();
	    img.src=url;

	    console.log(img);

	    return img;
	}

	// ==== CREATE ON INIT
	create(){
		
		// Setup Variables, append img to ship container
		var $this = this;


		// LOAD ROCKET SVG IMAGE
		var rkt = this.preloadImage(this.rocket);
		rkt = $(rkt).attr('class', 'INLINE rocket').css({'width': $this.width, 'height': $this.height});

		// ROCKET CONTAINER
		var rktContainer = $('<div></div>')
			.attr({'class': 'SHIP'})
			.css({'width': $this.width, 'height': $this.height, 'position': 'absolute', 'left': '20%'});

		var flameCont = $('<canvas id="flame"></canvas>')
			.css({
			    'position': 'absolute',
			    'top': '100px',
		    	'left': '-51px',
			    'transform': 'rotate(180deg)',
			    'width': '300px'
			});

		// Append ship to container and rocket img (SVG) to ship
		this.container.append(rktContainer);
		rktContainer.append(rkt);
		rktContainer.append(flameCont);
		// rktContainer.append(smoke);

		// CONVERT img to svg
		this.svgConvert();

		// Create Flame and hide when created
		// PASSES IN ID OF CANVAS
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
		// Tweenmax version
		TweenMax.set(this.el, {top:($(window).height() - this.height), left:'40%'})
	}

	setBackground(){}

	// ==== GRID

	createGrid() {
		console.log('CREATE GRID');

		var $this = this;
		var offset = 200;
		var counter = 0;

		this.keywords = {
			words: ['Webpack', 'Gulp', 'Grunt', 'ES6', 'SASS', 'CSS3', '3 years Javascript experience', 'TweenMax', 'jQuery', 'CreateJS', 'VueJS', 'AnimeJS', 'Adobe Photoshop', 'Adobe Animate', 'Adobe illustrator', 'Laravel'],
			gridBoundsR: ($this.getwinW() - offset),
			gridBoundsL: (offset),
			gridH: $this.getwinH(),
			rows: 2,
			cols: 3,
			speed:2,
			spacing: 50,
			enemies: []
		};

		var grid = $('<div id="GRID"></div>')
			.attr({'height':$this.gridH});

		this.container.append(grid);

		var enemy = new Enemy({container: grid, left: 200, top: 200, row: 0, col: 0});

		for(var row=0;row<this.keywords.rows;row++){
			console.log('ROW:',row);
			for(var col=0;col<this.keywords.cols; col++){
				console.log('COL:',col);
				this.keywords.enemies[counter] = new Enemy({container: grid, left: 200, top: 200, row: 0, col: 0});
				counter++;
			}
		}

	}


	updateGrid() {

	}


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

		console.log(this.height);

		// Tweenmax version
		var tl = new TimelineMax({onComplete: function(){}});

			tl
				.addLabel('BEGIN')



			// STRAIGHLINE
			.to([$('.arrow'), $('#SpaceBar')], 1, {opacity: 0})
			.to(this.el, 1, {scaleY: 0.75}, 'BEGIN')
			.addLabel('SPRING')
			.add(function(){
				$this.dark();
			})
			// INITIAL SPRING JUMP
			.to(this.el,1,{scaleY: 1.25}, 'SPRING')
			.to(this.el,1,{scaleY: 1})
			.to(this.el,2,{top: (0 - this.height + 200)}, 'SPRING')
			// TURN SCREEN TO BLACK
			.addLabel('PITCH_BLACK')
			.add(function(){
				$this.darker();
			}, 'PITCH_BLACK -=1.5')
			.to('.props', 2, {top: $this.getwinH()}, 'PITCH_BLACK -=2')
			.to(this.el, 1, {top: '70%', scaleY: 1, ease: Sine.easeOut})
			.add(function(){
				$this.createGrid();
				// SET TO TRUE AFTER GRID SETUP
				$this.gameReady = true;
			})

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

	darker(){
		this.gradient.changeState('darker');
	}

	light(){
		this.gradient.changeState('default-state');
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

	gameOver(){}


	reset(){}

}

export {Game}	