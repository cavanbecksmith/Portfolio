import Typed from 'typed.js';

export default{
	init: function(){
		this.typeText();
	},
	typeText: function(){
		var options = {
		  strings: [
		  	"A Passionate web developer <br/> 😁 + 🖥 = 💰", 
		  	"all about innovation", "A skilled rocket league player 🎮", 
		  	"Enthusiastic in using new technologies such as Webpack",
		  	"And a part time comedian", 
		  	"Just kidding! hahaha",
		  	".............",
		  	".............",
		  	"......But seriously"
		  ],
		  typeSpeed: 20
		};
		var typed = new Typed("#Typed .pointer", options);
	}
}