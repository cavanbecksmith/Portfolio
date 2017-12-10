import $ from 'jquery';
import {Ship} from './Ship/ship';

export default{
	ship: new Ship($('.Slide2')),
	playing: true,
	init(){
		// this.start();
		this.events();
		window.a = this;
	},

	// STATE MANAGMENT
	start(){
		this.playing = true;
	},
	stop(){
		this.playing = false;
	},
	reset(){
		console.log(this.ship);
	},

	// EVENT HANDLING
	events(){
		var $this = this;
		$('body').on( "keydown", function( event ) {
			if($this.playing){
				
				console.log(event.type + ": " +  event.which);

				// ==== KEYCODES
				// W
				if(Number(event.which) == 87){
					
				}
				// A
				else if(Number(event.which) == 65){

				}
				// S
				else if(Number(event.which) == 65){

				}
				// D
				else if(Number(event.which) == 65){

				}
				// SPACEBAR
				else if(Number(event.which) == 32){
					console.log('SPACEBAR pressed');
				}
			}
		});
	}

}