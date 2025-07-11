import { type ComponentProps } from "react";

export const EmptyCell = 0;

export const Player1 = 1;

export const Player2 = 2;

export type ValidTurn = typeof Player1 | typeof Player2;

export type ValidBoardCell = typeof EmptyCell | ValidTurn;

export type TBoard = ValidBoardCell[][];

export interface GameBoardProps extends ComponentProps<"table">{
	board: TBoard;
	onSetCell: (rowIndex: number, columnIndex: number) => void;
}

export function generateBoard(size = 3) {
	const board: TBoard = [];
	for (let i = 0; i < size; i++) {
		board[i] = [];
		for (let j = 0; j < size; j++) {
			board[i][j] = EmptyCell;
		}
	}
	return board;
}

export function checkVertically(gameBoard: TBoard, cellIndex: number, cell: ValidBoardCell) {
	let turnRowIndex: number | undefined;
	let turnColumnIndex: number | undefined;
	// Check vertically
	if (gameBoard[2][cellIndex] === EmptyCell && gameBoard[0][cellIndex] === cell && gameBoard[1][cellIndex] === cell) {
		turnRowIndex = 2;
		turnColumnIndex = cellIndex;
	}
	else if (gameBoard[1][cellIndex] === EmptyCell && gameBoard[0][cellIndex] === cell && gameBoard[2][cellIndex] === cell) {
		turnRowIndex = 1;
		turnColumnIndex = cellIndex;
	}
	else if (gameBoard[0][cellIndex] === EmptyCell && gameBoard[1][cellIndex] === cell && gameBoard[2][cellIndex] === cell) {
		turnRowIndex = 0;
		turnColumnIndex = cellIndex;
	}
	return {
		turnRowIndex,
		turnColumnIndex,
	};
}

export function checkHorizontally(gameBoard: TBoard, rowIndex: number, cell: ValidBoardCell) {
	let turnRowIndex: number | undefined;
	let turnColumnIndex: number | undefined;
	if (gameBoard[rowIndex][2] === EmptyCell && gameBoard[rowIndex][0] === cell && gameBoard[rowIndex][1] === cell) {
		turnRowIndex = rowIndex;
		turnColumnIndex = 2;
	}
	else if (gameBoard[rowIndex][1] === EmptyCell && gameBoard[rowIndex][0] === cell && gameBoard[rowIndex][2] === cell) {
		turnRowIndex = rowIndex;
		turnColumnIndex = 1;
	}
	else if (gameBoard[rowIndex][0] === EmptyCell && gameBoard[rowIndex][1] === cell && gameBoard[rowIndex][2] === cell) {
		turnRowIndex = rowIndex;
		turnColumnIndex = 0;
	}
	return {
		turnRowIndex,
		turnColumnIndex,
	};
}

export function checkDiagonally(gameBoard: TBoard, cell: ValidBoardCell) {
	let turnRowIndex: number | undefined;
	let turnColumnIndex: number | undefined;
	// Left diag
	if (gameBoard[1][1] === EmptyCell && gameBoard[0][0] === cell && gameBoard[2][2] === cell) {
		turnRowIndex = 1;
		turnColumnIndex = 1;
	}
	else if (gameBoard[2][2] === EmptyCell && gameBoard[0][0] === cell && gameBoard[1][1] === cell) {
		turnRowIndex = 2;
		turnColumnIndex = 2;
	}
	else if (gameBoard[0][0] === EmptyCell && gameBoard[2][2] === cell && gameBoard[1][1] === cell) {
		turnRowIndex = 0;
		turnColumnIndex = 0;
	}
	// Right diag
	else if (gameBoard[1][1] === EmptyCell && gameBoard[2][0] === cell && gameBoard[0][2] === cell) {
		turnRowIndex = 1;
		turnColumnIndex = 1;
	}
	else if (gameBoard[0][2] === EmptyCell && gameBoard[2][0] === cell && gameBoard[1][1] === cell) {
		turnRowIndex = 0;
		turnColumnIndex = 2;
	}
	else if (gameBoard[2][0] === EmptyCell && gameBoard[0][2] === cell && gameBoard[1][1] === cell) {
		turnRowIndex = 2;
		turnColumnIndex = 0;
	}
	return {
		turnRowIndex,
		turnColumnIndex,
	};
}

export function getTurn(gameBoard: TBoard, cellValue: ValidBoardCell) {
	let { turnColumnIndex, turnRowIndex } = checkDiagonally(gameBoard, cellValue);
	if (turnRowIndex === undefined) {
		for (const [rowIndex, row] of gameBoard.entries()) {
			({ turnColumnIndex, turnRowIndex } = checkHorizontally(gameBoard, rowIndex, cellValue));
			if (turnRowIndex !== undefined) {
				break;
			}
			for (const [cellIndex] of row.entries()) {
				({ turnColumnIndex, turnRowIndex } = checkVertically(gameBoard, cellIndex, cellValue));
				if (turnRowIndex !== undefined) {
					break;
				}
			}
		}
	}
	return {
		turnColumnIndex,
		turnRowIndex,
	};
}

export function checkWinner(board: TBoard) {
	let hasWinner: ValidBoardCell | false = false;
	// Check rows for winner
	for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
		const cell = board[rowIdx][0];
		if (cell === EmptyCell) {
			continue;
		}
		if (board[rowIdx][1] === cell && board[rowIdx][2] === cell) {
			hasWinner = cell;
		}
	}
	// Check columns for winner
	for (let colIdx = 0; colIdx < 3; colIdx++) {
		const cell = board[0][colIdx];
		if (cell === EmptyCell) {
			continue;
		}
		if (board[1][colIdx] === cell && board[2][colIdx] === cell) {
			hasWinner = cell;
		}
	}
	const leftDiag = board[0][0];
	// Check left diagonal
	if (leftDiag !== EmptyCell && board[1][1] === leftDiag && board[2][2] === leftDiag) {
		hasWinner = leftDiag;
	}
	const rightDiag = board[0][2];
	// Check right diagonal
	if (rightDiag !== EmptyCell && board[1][1] === rightDiag && board[2][0] === rightDiag) {
		hasWinner = rightDiag;
	}
	if (hasWinner === false) {
		const stalemate = board.filter((row) => row.filter((cell) => cell === EmptyCell).length > 0).length === 0;
		if (stalemate) {
			hasWinner = EmptyCell;
		}
	}
	return hasWinner;
}
