import {TweenMax, TimelineMax, Sine} from "gsap";
import $ from 'jquery';
import Granim from 'granim';
import {Flame} from './Flame';
import {Enemy} from './Enemy';

var inlineSVG = require('inline-svg');
var requestId = undefined;
var GameObj;

class Game {

	constructor(container){

		var $this = this;

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

		this.boundary = {
			min: 0,
			max: $(window).width()
		};

		// ENV Variables
		this.takenOff = false;
		this.gameReady = false;

		this.gradient = new Granim({
		    element: '#GRADIENT',
		    name: 'interactive-gradient',
		    direction: 'top-bottom',
		    opacity: [1, 1],
		    isPausedWhenNotInView: true,
		    stateTransitionSpeed: 500,
		    states : {
		        "default-state": {
		            gradients: [
		                ['#90dffe', '#38a3d1'],
		            ],
		            loop: false
		        },
		        "dark": {
		            gradients: [
		                ['#1e528e', '#728a7c'],
		            ],
		            loop: false
		        },
		        "darker": {
		            gradients: [
		                ['#00000c', '#00000d'],
		            ],
		            loop: false
		        }
		    }
		});
		
		this.keywords = {
			words: ['Webpack', 'Gulp', 'Grunt', 'ES6', 'SASS', 'CSS3', 'Javascript', 'TweenMax', 'jQuery', 'CreateJS', 'VueJS', 'AnimeJS', 'Adobe Photoshop', 'Adobe Animate', 'Adobe illustrator', 'Laravel']
		};
		this.enemyInterval = 0.5;
		this.enemyReady = false;
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
		var rkt = this.preloadImage(this.rocket);
		rkt = $(rkt).attr('class', 'INLINE rocket').css({'width': $this.width, 'height': $this.height});
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

		// CONVERT img to svg
		this.svgConvert();

		// Create a reference for the ship
		this.el = rktContainer;
		this.setShip();

		this.flame = new Flame('flame');
		this.flame.show();

		GameObj = this;
	}

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
		TweenMax.set(this.el, {top:($(window).height() - this.height), left:'40%'})
	}

	setBackground(){}

	// ==== GRID

	createGrid() {
		var $this = this;
		var offset = 200;
		var counter = 0;
		var grid = $('<div id="GRID"></div>')
			.attr({'height':$this.gridH})
			.css({'width': '100%', 'height': '100%', 'padding': '0%', 'box-sizing': 'border-box'});

		var grid_container = $('<div class="GRID_CONTAINER"></div>')
		.css({'position': 'relative'});
		grid.append(grid_container);
		this.container.append(grid);
	}

	createEnemy(){
		new Enemy({container: this.container, text: this.keywords.words.randomElement()});
	}

	moveGrid() {
		for(var i = 0; i < this.keywords.enemies.length; i++){
			this.keywords.enemies[i].moveright();
		}
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
		console.log('===========');
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
			.to(this.el, 3, {top: '70%', scaleY: 1, ease: Sine.easeOut})
			.add(function(){
				

				// SET TO TRUE AFTER GRID SETUP
				$this.gameReady = true;
			})
		$this.createGrid();
		console.log('===========');
	}

	// ==== Update

	update(){
		// console.log('UPDATE');
		if(this.gameReady === true){
			this.moveShip(this.direction);
			// this.moveGrid();
		}
		window.floop();
	}

	loop(time) {
		// SINCE THE LOOP DOESNT HAVE THIS BINDED
		// WE HAVE TO USE THE 'GameObj' INSTEAD

		// console.log((time/1000).toFixed(0));
		// console.log((time/1000).toFixed(0) % GameObj.enemyInterval !== 0)

		// EVERY 3 SECONDS CREATE A NEW ENEMY
		if((time/1000).toFixed(1) % GameObj.enemyInterval != 0 && GameObj.enemyReady == false){
			// console.log('NOW IM READY');
			GameObj.enemyReady = true;	
		}
		// CREATE NEW ENEMY HERE
		else if(((time/1000).toFixed(1) % GameObj.enemyInterval) === 0 && GameObj.enemyReady == true){
			GameObj.createEnemy();
			GameObj.enemyReady = false;
		}


		// Set request id to undefined so that start can run code
	    requestId = undefined;
	    // doStuff(time)
	    GameObj.update();
	    GameObj.start();
	}


	// ==== Helper widths and heights functions
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