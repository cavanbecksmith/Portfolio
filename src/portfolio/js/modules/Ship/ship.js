import $ from 'jquery';

class Ship {

	constructor(container){

		console.log('================')
		console.log('SHIP CONSTRUCTOR')

		this.container = container;
		this.direction = 0;
		this.speed = 100;
		this.width = 100;
		this.image = '../img/ship.svg';
		this.create()
	}

	preloadImage(url)
	{
	    var img=new Image();
	    img.src=url;
	    return img;
	}

	create(){

		var img = this.preloadImage(this.image);
		img = $(img).attr({'width': this.width}).css({bottom:'20px', right:'43%',position:'absolute'});

		this.container.append(img);
	}

	svgConvert(){}


	shoot(){
		console.log('PEW!');
	}

	update(){

	}
}

export {Ship}