import React, { Component } from 'react';
import './App.css';
import Ship from './gameClass/ship/Ship';
import { 
	LOADING, 
	BUILD_MAP, 
	PLAYING,
	IMAGE,
	SOUND,
} from './config/const';

const DATAS = [
	{
		type: IMAGE,
		data: [
			{
				src: "./assets/vehicles.png",
			},
		]
	},
	// {
	// 	type: SOUND,
	// 	data: [
	// 		{
	// 			ref: "",
	// 			src: ["", ""]
	// 		}
	// 	]
	// }
];

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

			character: 1,
			assetsLoaded: 0,
			assetsToLoad: [],
		};
		this.ship = [];
		this.asteroids = [];
		this.bullets = [];
		this.particles = [];

		this.image = null;

		this.loadHandler = this.loadHandler.bind(this);
	}

	//Handler
	resizeHandler(value, e) {
		this.setState({
			screen: {
				width: window.innerWidth,
				height: window.innerHeight,
				ratio: window.devicePixelRatio || 1,
			}
		});
	}

	loadHandler() {
		console.log("LGLG")
		let { assetsLoaded, assetsToLoad } = this.state;
	  assetsLoaded++;
	  if(assetsLoaded === assetsToLoad.length) {
	    //Remove the load handlers
	  //   if(arr.length > 0) {
			// 	for(let i = 0; i < arr.length; i++) {
			// 		switch(arr[i].type) {
			// 			case IMAGE:
			// 				let images = arr[i].data;

			// 				if(images.length > 0) {
			// 					for(let j = 0; j < images.length; j++) {
			// 						let image = new Image();
			// 						image.removeEventListener("load", this.loadHandler, false);
			// 						image.src = images[j].src;
			// 						assetsToLoad.push(image);
			// 					}
			// 				}
			// 				break;
			// 			case SOUND:
			// 				let sounds = arr[i].data;
			// 				if(sounds.length > 0) {
			// 					for(let k = 0; k < sounds.length; k++) {
			// 						let sound = document.querySelector(sounds[k].ref);						
			// 						sound.removeEventListener("canplaythrough", this.loadHandler(arr), false);
			// 						sound.load();
			// 						assetsToLoad.push(sound);
			// 					}
			// 				}
			// 				break;
			// 			default:
			// 				console.log('load Data...');
			// 		}
			// 	}
			// }
	    //Build the map 
	    this.setState({ gameState: BUILD_MAP });
	  }
	}
	//Handler (end)

	componentWillMount() {
		this.setState({ gameState: LOADING });
	}
	
	componentDidMount() {
		
		window.addEventListener('keyup', ()=> console.log("keyup") );
		window.addEventListener('keydown', ()=> console.log("keydown") );
		window.addEventListener('resize', ()=> console.log("resize") );
		const context = this.refs.canvas.getContext("2d");
		this.setState({ context: context });

		this.loadData(DATAS);
		
		this.loadImage();
		this.buildMap();
    this.startGame();
    requestAnimationFrame(() => {this.update()});
	}
	
	componentWillUnmount() {
		window.removeEventListener('keyup', ()=> console.log("keyup") );
		window.removeEventListener('keydown', ()=> console.log("keydown") );
		window.removeEventListener('resize', ()=> console.log("resize") );
	}

	loadData(arr) {
		let { assetsToLoad } = this.state;
		if(arr.length > 0) {
			for(let i = 0; i < arr.length; i++) {

				switch(arr[i].type) {
					case IMAGE:
						let images = arr[i].data;

						if(images.length > 0) {
							for(let j = 0; j < images.length; j++) {
								let image = new Image();
								window.addEventListener("load", ()=> console.log("fuck"), false);
								image.src = images[j].src;
								assetsToLoad.push(image);
							}
						}
						break;
					case SOUND:
						let sounds = arr[i].data;
						if(sounds.length > 0) {
							for(let k = 0; k < sounds.length; k++) {
								let sound = document.querySelector(sounds[k].ref);						
								sound.addEventListener("canplaythrough", this.loadHandler, false);
								sound.load();
								assetsToLoad.push(sound);
							}
						}
						break;
					default:
						console.log('load Data...');
				}
			}
			this.setState({ assetsToLoad });
		}
	}

	loadImage() {

	}

	buildMap() {

	}
	
	update() {
		let { gameState } = this.state;
		//Change what the game is doing based on the game state
	  switch(gameState) {
	    case LOADING:
	      //console.log("loading...");
	      break;
	    case BUILD_MAP:
	      // this.buildMap(levelMaps[levelCounter]);
	      // this.buildMap(levelGameObjects[levelCounter]);
	      // this.createOtherSprites();
	      // this.setState({ gameState: PLAYING });
	      console.log("build map...");
	      break;
	    case PLAYING:
	      this.playGame();
	      break;
	    default:
	    	console.log("Loading... (d)")
	  }

    //Animation Loop
    requestAnimationFrame(() => {this.update()});
  }

  playGame() {
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
  }
	
	startGame(){ //create object (player)
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
	