import $ from 'jquery';
import {Ship} from './Ship/ship';

export default{
	init(){
		this.start();
		// console.log('SLIDE 2');
	},
	start(){
		var ship = new Ship($('.Slide2'));
	}
}