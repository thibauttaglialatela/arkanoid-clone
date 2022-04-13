const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 15;
const gridWidth = 570;
const gridHeight = 300;
const ballDiameter = 10;
let xDirection = 2;
let yDirection = 2;
let timerId;


const userStart = [230, 10];
const ballStart = [285, 30];
let currentUserPos = userStart;
let currentBallPos = ballStart;

//create Block
class Block {
	constructor(xAxis, yAxis) {
		this.bottomLeft = [xAxis, yAxis];
		this.bottomRight = [xAxis + blockWidth, yAxis];
		this.topLeft = [xAxis, yAxis + blockHeight];
		this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
	}
}

//all my blocks
const blocks = [
	new Block(10, 270),
	new Block(120, 270),
	new Block(230, 270),
	new Block(340, 270),
	new Block(450, 270),
	new Block(10, 240),
	new Block(120, 240),
	new Block(230, 240),
	new Block(340, 240),
	new Block(450, 240),
	new Block(10, 210),
	new Block(120, 210),
	new Block(230, 210),
	new Block(340, 210),
	new Block(450, 210),
];




//draw all my blocks

function addBlocks() {
	
	for (let i = 0; i < blocks.length; i++) {
		const block = document.createElement("div");
		block.classList.add("block");
		block.style.left = blocks[i].bottomLeft[0] + 'px';
		block.style.bottom = blocks[i].bottomLeft[1] + 'px';
		grid.appendChild(block);
	}
}

addBlocks();

//add user
const user = document.createElement('div'); //on crée la div
user.classList.add('user'); //on rajoute la class user à cette div
drawUser();
grid.appendChild(user); //ajouter le nouvel élément au parent grid

function drawUser() {
	user.style.left = currentUserPos[0] + 'px';
	user.style.bottom = currentUserPos[1] + 'px';
}

function drawBall() {
	ball.style.left = currentBallPos[0] + 'px';
	ball.style.bottom = currentBallPos[1] + 'px';
}

//move user
function moveUser(e) {
	switch(e.key) {
		case'ArrowLeft':
			if (currentUserPos[0] > 0 ) {
				currentUserPos[0] -= 5;
				drawUser();
			}			
			break;
		case 'ArrowRight':
			if (currentUserPos[0] < gridWidth - blockWidth) {
				currentUserPos[0] += 5;
				drawUser();
			}			
			break;
		default:
			alert('please use left or right keys to move');
	}

}

document.addEventListener('keydown', moveUser);

// add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

//move the ball
const moveBall = () => {
	currentBallPos[0] += xDirection;
	currentBallPos[1] += yDirection;
	drawBall();
	checkforCollisions();
}

timerId = setInterval(moveBall, 30);

// check for collisions
function checkforCollisions() {
	//check for wall collisions
	if (currentBallPos[0] >= (gridWidth - ballDiameter) || currentBallPos[1] >= (gridHeight - ballDiameter)) {
		changeDirection()
	}

}

function changeDirection() {
	if (xDirection === 2 && yDirection === 2) {
		yDirection = -2;
		return;
	}
	if (xDirection === 2 && yDirection === -2) {
		xDirection = -2;
		return;
	}
	if(xDirection === -2 && yDirection === -2) {
		yDirection = 2;
		return;
	}
	if (xDirection === -2 && yDirection === 2) {
		xDirection = 2;
		return;
	}
}