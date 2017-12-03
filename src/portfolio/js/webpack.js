// ===== MODULE IMPORTS
import $ from 'jquery';
import {TweenMax, Power2, TimelineLite} from "gsap";

// ===== PAGE IMPORTS
import slide1 from './modules/slide_1';


var App = {
	currentSlide: 0,
	$this: this,
	init(){

		// SETUP
		App.disableScroll();
		App.events();
		// App.createArrows();
		App.inlineSVGS()

		// Slide 1
		slide1.init();
	},
	previousSlide(){},
	nextSlide(){

	},
	events: function(){

		var lastScrollTop = 0;
		$(window).scroll(function(event){
		   var st = $(this).scrollTop();
		   if (st > lastScrollTop){
		       // downscroll code
		   } else {
		      // upscroll code
		   }
		   lastScrollTop = st;
		});


		$(window).resize(function(){
			App.resize();
		});

	},
	skipTo(slideNO){},
	hideSlides(){
		$('.slide').each(function(i){
			if(i != App.currentSlide){
				$(this).hide();
			}
		});
	},
	createArrows(){

		var next = $('.next');
		var previous = $('.previous');

		// APPEND THE ARROWS TO EACH SLIDE
		$('.slide').each(function(){
			$(this).append(next.clone());
			$(this).append(previous.clone());
			App.fadeIn($(this).find('.next'));
			App.fadeIn($(this).find('.previous'));
		});

	},
	fadeIn(el){
		TweenMax.to(el, 1, {opacity: 1, display: 'inline-block'});
	},
	disableScroll(){
		document.body.style.overflow = 'hidden';
	},
	resize(){
	},
	inlineSVGS(){
		inlineSVG.init({
		  svgSelector: '.SVG', // the class attached to all images that should be inlined
		  initClass: 'inlinesvg', // class added to <html>
		}, function () {
			console.log('HELLO WORLD');
			App.createArrows();
		});
	}
}
$(document).ready(function(){
	App.init();	
});
