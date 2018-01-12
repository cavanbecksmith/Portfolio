import $ from 'jquery';
import {Game} from './Game/game';

export default{
	game: new Game($('.Slide2')),
	blur: {a:5},
	// playing: false,
	init(){
		// this.start();
		this.events();
		// this.applyBlur();
		window.a = this;
	},

	// STATE MANAGMENT
	start(){

	},
	stop(){
		this.playing = false;
	},
	reset(){
		console.log(this.game);
	},

	// EVENT HANDLING
	events(){
		var $this = this;
		$('body').on( "keyup", function( event ) {
			$this.game.still();
		});
		$('body').on( "keydown", function( event ) {
			// if($this.playing){
				
				// console.log(event.type + ": " +  event.which);

				// ==== KEYCODES
				// W
				if(Number(event.which) == 87){
					// console.log('W');
				}
				// A
				else if(Number(event.which) == 65){
					// console.log('A');
					$this.game.left();
				}
				// S
				else if(Number(event.which) == 83){
					// console.log('S');
					$this.game.stop();
				}
				// D
				else if(Number(event.which) == 68){
					// console.log('D');
					$this.game.right();
				}
				// SPACEBAR
				else if(Number(event.which) == 32){
					// console.log('SPACEBAR pressed');
				}
			// }
			// RESET POSITIONS HERE
			// else{}

			// ENTER
			if(Number(event.which) == 13){
				// console.log('ENTER pressed');
				$this.playing = true;
				$this.game.start();
			}

		});
	}
}