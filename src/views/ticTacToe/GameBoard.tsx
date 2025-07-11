import { EmptyCell, type GameBoardProps, Player1 } from "@/views/ticTacToe/constants.ts";

export function GameBoard({ board, onSetCell }: GameBoardProps) {
	const rows = board.map((row, rowIdx) => {
		const rowKey = `row${rowIdx}`;
		const cells = row.map((cell, cellIdx) => {
			return (
				<td
					key={`${rowKey}_cell${cellIdx}`}
					aria-disabled={board[rowIdx][cellIdx] !== EmptyCell}
					className="text-center border size-16 cursor-pointer hover:bg-sky-100 aria-disabled:pointer-events-none"
					onClick={() => onClickCell(rowIdx, cellIdx)}
				>
					<span>
						{cell === EmptyCell ? "" : cell === Player1 ? "O" : "X"}
					</span>
				</td>
			);
		});
		return (
			<tr key={rowKey}>
				{cells}
			</tr>
		);
	});



	function onClickCell(rowIndex: number, columnIndex: number) {
		// Can't click this cell, as it's already been played
		if (board[rowIndex][columnIndex] !== EmptyCell) {
			return;
		}
		onSetCell(rowIndex, columnIndex);
	}

	if (rows.length) {
		return (
			<table>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
}
