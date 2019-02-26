

export default class Ship {
	constructor(args) {
		this.position = args.position;
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.rotation = 0;
		this.rotationSpeed = 6;
		this.speed = 0.15;
		this.inertia = 0.99;
		this.radius = 20;
		this.lastShot = 0;
		this.create = args.create;
		this.onDie = args.onDie;
	}
	
	destroy() {
		this.delete = true;
		this.onDie();
		
		//
	}
	
	rotate(dir) {
		//
	}
	
	accelerate(val) {
		//
	}
	
	render(state) {
		//Control
		if(state.keys.up) {
			this.accelerate(1);
		}
		if(state.keys.left){
      this.rotate('LEFT');
    }
    if(state.keys.right){
      this.rotate('RIGHT');
    }
		//
		
		//Move
		
		//Rotation
		
		//Screen Edges
		
		//Draw
		const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * Math.PI / 180);
    context.strokeStyle = '#ffffff';
    context.fillStyle = '#000000';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, -15);
    context.lineTo(10, 10);
    context.lineTo(5, 7);
    context.lineTo(-5, 7);
    context.lineTo(-10, 10);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
	}
}