import React, { Component } from 'react';
import './App.css';

import Ship from './gameClass/Ship';

class App extends Component {
	constructor() {
		super(); 
		this.state = {
			screen: {
				width: window.innerWidth,
				height: window.innerHeight,
				ratio: window.devicePixelRatio || 1,
			},
			context: null,
			keys: {
				left: 0,
				right: 0,
				up: 0,
				down: 0,
				space: 0,
			},
			asteroidCount: 3,
			currentScore: 0,
			topScore: localStorage['topscore'] || 0,
			inGame: false,
		};
		this.ship = [];
		this.asteroids = [];
		this.bullets = [];
		this.particles = [];
	}

	handleResize(value, e) {
		this.setState({
			screen: {
				width: window.innerWidth,
				height: window.innerHeight,
				ratio: window.devicePixelRatio || 1,
			}
		});
	}
	
	componentDidMount() {
		window.addEventListener('keyup', ()=> console.log("keyup") );
		window.addEventListener('keydown', ()=> console.log("keydown") );
		window.addEventListener('resize', ()=> console.log("resize") );
		
		const context = this.refs.canvas.getContext("2d");
		this.setState({ context: context });
    this.startGame();
    requestAnimationFrame(() => {this.update()});
	}
	
	componentWillUnmount() {
		window.removeEventListener('keyup', ()=> console.log("keyup") );
		window.removeEventListener('keydown', ()=> console.log("keydown") );
		window.removeEventListener('resize', ()=> console.log("resize") );
	}
	
	update() {
    const context = this.state.context;
    const keys = this.state.keys;
    const ship = this.ship[0];
		
		context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);
		
		//Motion trail
		context.fillStyle = '#000';
		context.globalAlpha = 0.4;
		context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
		
		//Remove Or Render
		this.updateObject(this.ship, "ship");
		
		context.restore();

    //Next frame
    requestAnimationFrame(() => {this.update()});
  }
	
	startGame(){
    this.setState({
			inGame: true,
			currentScore: 0,
		});
		
		//Make Ship
		let ship = new Ship({
			position: {
				x: this.state.screen.width/2,
        y: this.state.screen.height/2,
			},
			create: this.createObject,
			onDie: this.gameOver,
		});
		this.createObject(ship, "ship");
	
		//
  }
	
	updateObject(items, group) {
		let index = 0;
		for (let item of items) {
			if (item.delete) {
				this[group].splice(index, 1);
			}else{
				items[index].render(this.state);
			}
			index++;
		}
	}
	
	createObject(item, group){
    this[group].push(item);
  }
	

	render() {
		return (
		  <div>
				<canvas ref="canvas"
					width={this.state.screen.width * this.state.screen.ratio}
					height={this.state.screen.height * this.state.screen.ratio}
				/>
		  </div>
		);
	}
}
	
export default App;
	