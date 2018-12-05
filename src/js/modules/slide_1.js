import Typed from 'typed.js';

export default{
	init: function(){
		this.typeText();
	},
	typeText: function(){
		let options = {
		    stringsElement: '#typed-strings',
		    typeSpeed: 30,
		    backSpeed: 0,
		    backDelay: 500,
		    startDelay: 1000,
		    loop: true,
	  	};
		this.typed = new Typed("#Typed .pointer", options);
	}
}