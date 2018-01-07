import $ from 'jquery';

class Flame {
	constructor(el){
		this.el = el;
		this.create(this.el);
	}

	create(el){
		var c = document.getElementById(el),
		    ctx = c.getContext('2d'),
		    cw = c.width = 300,
		    ch = c.height = 300,
		    partsFull = false,    
		    hueRange = 50,
		    globalTick = 0,
		    rand = function(min, max){
		        return Math.floor( (Math.random() * (max - min + 1) ) + min);
		    },
		    parts = [],
		    partCount = 100

		var Part = function(){
		  this.reset();
		};

		Part.prototype.reset = function(){
		  this.startRadius = rand(1, 25);
		  this.radius = this.startRadius;
		  this.x = cw/2 + (rand(0, 6) - 3);
		  this.y = 250;      
		  this.vx = 0;
		  this.vy = 0;
		  this.hue = rand(globalTick - hueRange, globalTick + hueRange);
		  this.saturation = rand(50, 100);
		  this.lightness = rand(20, 70);
		  this.startAlpha = rand(1, 10) / 100;
		  this.alpha = this.startAlpha;
		  this.decayRate = .1;  
		  this.startLife = 7;
		  this.life = this.startLife;
		  this.lineWidth = rand(1, 3);
		}
		    
		Part.prototype.update = function(){  
		  this.vx += (rand(0, 200) - 100) / 1500;
		  this.vy -= this.life/50;  
		  this.x += this.vx;
		  this.y += this.vy;  
		  this.alpha = this.startAlpha * (this.life / this.startLife);
		  this.radius = this.startRadius * (this.life / this.startLife);
		  this.life -= this.decayRate;  
		  if(
		    this.x > cw + this.radius || 
		    this.x < -this.radius ||
		    this.y > ch + this.radius ||
		    this.y < -this.radius ||
		    this.life <= this.decayRate
		  ){
		    this.reset();  
		  }  
		};
		  
		Part.prototype.render = function(){
		  ctx.beginPath();
		  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		  ctx.fillStyle = ctx.strokeStyle = 'hsla('+this.hue+', '+this.saturation+'%, '+this.lightness+'%, '+this.alpha+')';
		  ctx.lineWidth = this.lineWidth;
		  ctx.fill();
		  ctx.stroke();
		};

		var createParts = function(){
		  if(!partsFull){
		    if(parts.length > partCount){
		      partsFull = true;
		    } else {
		      parts.push(new Part()); 
		    }
		  }
		};
		  
		var updateParts = function(){
		  var i = parts.length;
		  while(i--){
		    parts[i].update();
		  }
		};

		var renderParts = function(){
		  var i = parts.length;
		  while(i--){
		    parts[i].render();
		  }   
		};
		    
		window.clear = function(){
		  ctx.globalCompositeOperation = 'destination-out';
		  ctx.fillStyle = 'hsla(0, 0%, 0%, .3)';
		  ctx.fillRect(0, 0, cw, ch);
		  ctx.globalCompositeOperation = 'lighter';
		};
		     
		var fpaused = false;

		window.floop = function(type){

			// console.log(type);

			fpaused = type;
			// window.fpaused = type;

			// if(window.paused == true){
					// cancelAnimationFrame(window.floop);
			// }
			// else{
				// window.requestAnimFrame(window.floop, c);
			// }
			if(fpaused){
				// window.clear();
				window.clear();
				// do{
				// 	console.log(parts);
				// 	parts.pop()
				// }
				// while(parts > 0)

				console.log(true)
			}
			else{
			  clear();
			  createParts();
			  updateParts();
			  renderParts();
			  globalTick++;
			}
		};

		// window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

			// window.floop();
	}

	hide(){
		$('#'+this.el).hide();
	}

	show(){
		$('#'+this.el).show();
	}
}

export {Flame}