/**
 * Snakes and Ladders
 *
 * Prompt:
 *
 * Simulate the game of Snakes and Ladders
 *
 * Game Board: https://www.shutterstock.com/image-vector/ladder-snakes-gamefunny-frame-childrenvector-260nw-2493809451.jpg
 *
 * Rules:
 * - The game is played on a 100 square board
 * - The board is divided into 10 rows of 10 squares each
 * - The player starts at square 0, and moves up the board left to right, alternating each row
 * - The board is filled with snakes and ladders
 * - Each turn, the player rolls a 6-sided die to move forward
 * - When a player lands on a snake, they move backwards to the snake's tail
 * - When a player lands on a ladder, they move forwards to the ladder's head
 * - The player wins when they reach square 100
 *
 */
interface IBoardCell {
	index: number;
	// Goes back to a certain board cell's index
	snakeIndex?: number;
	// Goes up to a certain board cell's index
	ladderIndex?: number;
}

let playerTurn: 1 | 2 = 1;
let player1Pos = 0;
let player2Pos = 0;
const theIndex: number[] = [];
const board: Record<number, IBoardCell> = {};

function rollDice(sided = 6) {
	return Math.floor(Math.random() * sided) + 1;
}

for (let i = 1; i <= 100; i++) {
	board[i] = {
		index: i,
	};
}

// 1-5 snakes
const numberOfSnakes = Math.floor(Math.random() * 15) + 10;
// 1-5 ladders
const numberOfLadders = Math.floor(Math.random() * 5) + 1;

for (let i = 0; i < numberOfSnakes; i++) {
	let tailIndex = Math.floor(Math.random() * 90) + 1;
	while (theIndex.indexOf(tailIndex) !== -1) {
		tailIndex = Math.floor(Math.random() * 90) + 1;
	}
	let headIndex = tailIndex + Math.floor(Math.random() * (100 - tailIndex)) + 1;
	while (theIndex.indexOf(headIndex) !== -1) {
		headIndex = tailIndex + Math.floor(Math.random() * (100 - tailIndex)) + 1;
	}
	theIndex.push(tailIndex, headIndex);
	board[headIndex].snakeIndex = tailIndex;
}

for (let i = 0; i < numberOfLadders; i++) {
	let tailIndex = Math.floor(Math.random() * 90) + 1;
	while (theIndex.indexOf(tailIndex) !== -1) {
		tailIndex = Math.floor(Math.random() * 90) + 1;
	}
	let headIndex = tailIndex + Math.floor(Math.random() * (100 - tailIndex)) + 1;
	while (theIndex.indexOf(headIndex) !== -1) {
		headIndex = tailIndex + Math.floor(Math.random() * (100 - tailIndex)) + 1;
	}
	theIndex.push(tailIndex, headIndex);
	board[tailIndex].ladderIndex = headIndex;
}

let winner: 0 | 1 | 2 = 0;

function movePlayer(playerPos: number) {
	const dice = rollDice();
	const nextPos = playerPos + dice;
	const found = theIndex.indexOf(nextPos);
	console.info("rolling", nextPos);
	if (found === -1) {
		playerPos = nextPos;
	}
	else {
		const boardCell = board[found];
		if (boardCell) {
			if (boardCell.snakeIndex !== undefined) {
				playerPos = boardCell.snakeIndex;
				console.info("SNAKE SNAKKKKKE", playerPos);
			}
			else if (boardCell.ladderIndex !== undefined) {
				playerPos = boardCell.ladderIndex;
				console.info("Ladder", playerPos);
			}
			else {
				playerPos = nextPos;
			}
		}
		else {
			console.error("THIS SHOULD NOT HAPPEN");
		}
	}
	return playerPos;
}

while (!winner) {
	if (playerTurn === 1) {
		player1Pos = movePlayer(player1Pos);
		playerTurn = 2;
	}
	else if (playerTurn === 2) {
		player2Pos = movePlayer(player2Pos);
		playerTurn = 1;
	}
	if (player1Pos >= 100) {
		winner = 1;
	}
	else if (player2Pos >= 100) {
		winner = 2;
	}
}

/**
 * TODOJEF:
 * - Make UI that shows each roll on a delay
 * - Figure out how to use CSS to show ladders and snakes stretching from their respective tiles
 */
console.info(winner, theIndex);
