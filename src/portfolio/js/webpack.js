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
		App.preload();
	},
	preload(){
		inlineSVG.init({
		  svgSelector: '.SVG', // the class attached to all images that should be inlined
		  initClass: 'inlinesvg', // class added to <html>
		}, function () {
			App.start();
		});
	},
	start(){
		App.createArrows();
		App.events();
		App.hideSlides();
		// Slide 1
		slide1.init();
	},
	previousSlide(){},
	nextSlide(slide1, slide2){

		var thisSlide = $($('.slide')[App.currentSlide]);
		var nextSlide = $($('.slide')[App.currentSlide+1]);
		var window_w = $(window).width();
		var window_h = $(window).height();

		var offset = 200;
		var tl = new TimelineLite();
		var scale = 0.75;
		var time = 0.25;

		console.log(nextSlide);

		tl

			// SET Z-INDEX and ready positions
			.set(nextSlide, {css: {left: (window_w + offset), zIndex: 1, scale: scale}})
			.set(thisSlide, {css: {zIndex: -1}})

			// Apply transformations
			// START
			.addLabel('Start')
			.to(thisSlide, time, {css: {scale:scale}})

			.addLabel('MID')
			.to(thisSlide, 1, {css: {left: (-window_w - offset)}}, 'MID')
			.to(nextSlide, 1, {css: {left: 0}}, 'MID')
			.to(nextSlide, time, {css: {left: 0, scale: 1}})
			// .to(thisSlide, 1, {css: {left: (-window_w - offset)}})

	},
	events: function(){
		//====== RESIZE
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

		//====== BTNS
		$('div.next').on('click', function(){
			App.nextSlide();
		})

	},
	skipTo(slideNO){},
	hideSlides(){
		var window_w = $(window).width();
		var offset = 200;

		$('.slide').each(function(i){
			if(i != App.currentSlide){
				// $(this).hide();
				$(this).css({'z-index': '-1', left: (window_w + offset)+ 'px'})
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
	}
}
$(document).ready(function(){
	App.init();	
});
