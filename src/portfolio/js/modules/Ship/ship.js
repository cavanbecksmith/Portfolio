class Ship {
	constructor(container){
		this.container = container;
		this.direction = 0;
		this.speed = 100;
		this.image = '../img/ship.svg';
		this.createSVG();
	}

	createSVG(){
		var code = "<img src='"+this.image+"'>";
		console.log('Img tag: ',code);
		this.container.append(code);
		console.log('Container: ',this.container);
	}

	sayName(){
		return this.name+'boodfgkdflg';
	}
}

export {Ship}