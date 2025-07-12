import { type ReactNode, useCallback, useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { BaseButton } from "@/components/BaseButton.tsx";
import { FieldNumber } from "@/components/FieldNumber.tsx";
import {
	checkWinner,
	EmptyCell,
	generateBoard,
	getTurn,
	Player1,
	Player2,
	type TBoard,
	type ValidBoardCell,
	type ValidTurn,
} from "@/views/ticTacToe/constants.ts";
import { GameBoard } from "@/views/ticTacToe/GameBoard.tsx";

export function ViewTicTacToe() {
	const [gameCount, setGameCount] = useState(1);
	const [player1Wins, setPlayer1Wins] = useState(0);
	const [player2Wins, setPlayer2Wins] = useState(0);
	const [stalemates, setStalemates] = useState(0);
	const [disableSettings, setDisableSettings] = useState(false);
	const [players, setPlayers] = useState<number>(1);
	const [gameBoard, setGameBoard] = useState<TBoard>([]);
	const [currentTurn, setCurrentTurn] = useState<ValidTurn>(Player1);
	const [winner, setWinner] = useState<ValidBoardCell>();
	const [countdown, setCountdown] = useState(0);
	let winnerNode: ReactNode;
	if (winner !== undefined) {
		if (winner === EmptyCell) {
			winnerNode = (
				<span className="text-5xl">
					Stalemate
				</span>
			);
		}
		else {
			winnerNode = (
				<>
					<ReactConfetti
						initialVelocityY={25}
						confettiSource={{
							x: 0,
							h: document.body.clientHeight,
							w: document.body.clientWidth,
							y: document.body.clientHeight,
						}}
					/>
					<span className="text-5xl">
						Player
						{" "}
						{winner}
						{" "}
						won!
					</span>
				</>
			);
		}
		winnerNode = (
			<>
				{winnerNode}
				<div className="text-2xl font-semibold mt-4">
					Restarting in
					{" "}
					{countdown}
					...
				</div>
			</>
		);
	}

	function reset() {
		setCurrentTurn(Player1);
		setGameBoard([]);
		setDisableSettings(false);
		setWinner(undefined);
		setStalemates(0);
		setPlayer1Wins(0);
		setPlayer2Wins(0);
		setGameCount(0);
	}

	function onClickReset() {
		reset();
	}

	function onClickPlay() {
		setWinner(undefined);
		setDisableSettings(true);
		setGameBoard(generateBoard(3));
	}

	const onSetCell = useCallback((rowIndex: number, columnIndex: number) => {
		const board = gameBoard.map((row, boardRow) => {
			return row.map((cell, boardCell) => {
				if (boardRow === rowIndex && boardCell === columnIndex) {
					return currentTurn;
				}
				return cell;
			});
		});
		if (board.length) {
			const hasWinner = checkWinner(board);
			if (hasWinner === false) {
				setCurrentTurn(currentTurn === Player1 ? Player2 : Player1);
			}
			else {
				if (hasWinner === Player1) {
					setPlayer1Wins(player1Wins + 1);
				}
				else if (hasWinner === Player2) {
					setPlayer2Wins(player2Wins + 1);
				}
				else {
					setStalemates(stalemates + 1);
				}
				setWinner(hasWinner);
			}
		}
		setGameBoard(board);
	}, [
		setGameBoard,
		setWinner,
		setCurrentTurn,
		stalemates,
		setStalemates,
		player1Wins,
		setPlayer1Wins,
		player2Wins,
		setPlayer2Wins,
		gameBoard,
		currentTurn,
	]);

	useEffect(() => {
		if (countdown <= 0) {
			return;
		}
		const interval = setInterval(() => {
			setCountdown(countdown - 1);
		}, 1000);
		return () => clearInterval(interval);
	}, [setCountdown, countdown]);

	useEffect(() => {
		if (winner !== undefined) {
			setCountdown(5);
			setTimeout(() => {
				setGameCount(gameCount + 1);
				setWinner(undefined);
				setGameBoard(generateBoard(3));
			}, 5000);
		}
	}, [
		winner,
		setGameCount,
		setCountdown,
		gameCount,
		setWinner,
		setGameBoard,
	]);

	useEffect(() => {
		if (gameBoard.length && winner === undefined) {
			// AI's turn
			if (players === 0 || players === 1 && currentTurn === Player2) {
				// First check to see if AI can get a victory
				let { turnColumnIndex, turnRowIndex } = getTurn(gameBoard, currentTurn);
				// Then check to see if AI should block player's victory
				if (turnRowIndex === undefined) {
					({ turnColumnIndex, turnRowIndex } = getTurn(gameBoard, currentTurn === Player1 ? Player2 : Player1));
				}
				// If no conditions met, get a random location
				if (turnRowIndex === undefined || turnColumnIndex === undefined) {
					turnRowIndex = Math.floor(Math.random() * 3);
					turnColumnIndex = Math.floor(Math.random() * 3);
					while (gameBoard[turnRowIndex][turnColumnIndex] !== EmptyCell) {
						turnRowIndex = Math.floor(Math.random() * 3);
						turnColumnIndex = Math.floor(Math.random() * 3);
					}
				}
				setTimeout(() => {
					onSetCell(turnRowIndex, turnColumnIndex);
				}, 750);
			}
		}
	}, [
		players,
		onSetCell,
		currentTurn,
		gameBoard,
		winner,
	]);

	return (
		<>
			<main className="flex flex-col gap-4 flex-1 py-4 px-2">
				<section className="flex gap-2">
					<FieldNumber
						label="# of Players:"
						value={players}
						onChange={setPlayers}
						isDisabled={disableSettings}
					/>
					<BaseButton
						text="Play!"
						onClick={onClickPlay}
						isDisabled={disableSettings}
					/>
					<BaseButton
						text="Reset"
						onClick={onClickReset}
					/>
				</section>
				<section className="flex gap-4">
					<div className="flex flex-col gap-4">
						<LabelScore
							label="Game"
							value={gameCount}
						/>
						<LabelScore
							label="P1 Wins"
							value={player1Wins}
						/>
						<LabelScore
							label="P2 Wins"
							value={player2Wins}
						/>
						<LabelScore
							label="Stalemates"
							value={stalemates}
						/>
					</div>
					<div className="flex flex-col items-center gap-4">
						<GameBoard
							board={gameBoard}
							onSetCell={onSetCell}
						/>
						<LabelScore
							label="Current Turn"
							value={currentTurn === Player1 ? "Player 1" : "Player 2"}
						/>
					</div>
					<section className="pl-8 flex flex-col items-center justify-center">
						{winnerNode}
					</section>
				</section>
			</main>
		</>
	);
}

export function LabelScore({ label, value }: { label: string, value: number | string }) {
	return (
		<div className="flex space-x-1 items-center">
			<span className="text-sm uppercase font-semibold text-slate-700">
				{label}
				:
			</span>
			<span className="text-sm font-semibold">
				{value}
			</span>
		</div>
	);
}
