import $ from 'jquery';
import {Ship} from './Ship/ship';

export default{
	ship: new Ship($('.Slide2')),
	playing: false,
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
		$('body').on( "keyup", function( event ) {
			$this.ship.still();
		});
		$('body').on( "keydown", function( event ) {
			if($this.playing){
				
				console.log(event.type + ": " +  event.which);

				// ==== KEYCODES
				// W
				if(Number(event.which) == 87){
					// console.log('W');
				}
				// A
				else if(Number(event.which) == 65){
					// console.log('A');
					$this.ship.left();
				}
				// S
				else if(Number(event.which) == 83){
					// console.log('S');
				}
				// D
				else if(Number(event.which) == 68){
					// console.log('D');
					$this.ship.right();
				}
				// SPACEBAR
				else if(Number(event.which) == 32){
					// console.log('SPACEBAR pressed');
				}
			}
			// RESET POSITIONS HERE
			// else{}

			// ENTER
			if(Number(event.which) == 13){
				console.log('ENTER pressed');
				$this.playing = true;
				$this.ship.takeOff();
			}

		});
	}

}