window.onload = function() {
	let cvs = document.getElementById('canvas');
	let ctx= cvs.getContext('2d');

	let cvsW = cvs.width;
	let cvsH = cvs.height;

	let snakeW = 10;
	let snakeH = 10;

	function drawSnake(x,y){
		ctx.fillStyle = "#FFF";
		ctx.fillRect(x* snakeW, y* snakeH, snakeW, snakeH);

		ctx.fillStyle = "#000";
		ctx.strokeRect(x* snakeW, y* snakeH, snakeW, snakeH);
	}

	// create our snake object,  it will contain 4 cells in default;

	let len = 4;
	let snake = [];
	//default direction
	let direction = "right";

	//read users directions
		let getDirection = (e) => {
			if(e.keyCode == 37 && direction!= "right") {
				direction = "left";			
			}else if(e.keyCode == 38 && direction!= "down") {
				direction = "up";			
			}else if(e.keyCode == 39 && direction!= "left") {
				direction = "right";			
			}else if(e.keyCode == 40 && direction!= "up") {
				direction = "down";
			}
		}

	document.addEventListener("keydown",getDirection);

	for(let i=len-1;i>=0;i--){
		snake.push(
			{x : i,
			 y : 0
			}
		);
	}

	//create some food
	food = {
		x : Math.round(Math.random()*(cvsW/snakeW)+1),
		y : Math.round(Math.random()*(cvsH/snakeH)+1)
	};

	//draw food
	let drawFood = (x,y) => {
		ctx.fillStyle = "#F00";
		ctx.fillRect(x* snakeW, y* snakeH, snakeW, snakeH);

		ctx.fillStyle = "#F00";
		ctx.strokeRect(x* snakeW, y* snakeH, snakeW, snakeH);
	}


	function draw(){
		ctx.clearRect(0,0,cvsW,cvsH);
		
		for(let i=0;i<snake.length;i++){
			let x = snake[i].x;
			let y = snake[i].y;
			drawSnake(x,y);
		}

		drawFood(food.x,food.y);
		//snake head;
		let snakeX = snake[0].x;
		let snakeY = snake[0].y;

		//snake hits the wall then end the game
		if(snakeX<0 || snakeY < 0  || snakeX>=cvsW/snakeW || snakeY>=cvsH/snakeH){
			location.reload();
		}

		//removing tail;
		snake.pop();

		//creating new HEAD of the snake, based on previous head and direction
		if(direction==="left") snakeX--;
		else if(direction==="up") snakeY--;
		else if(direction==="right") snakeX++;
		else if(direction==="down") snakeY++;
		
		let newHead = {
			x : snakeX,
			y : snakeY
		};

		snake.unshift(newHead);



	}

	setInterval(draw,60);
}
