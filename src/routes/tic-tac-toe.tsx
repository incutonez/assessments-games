import { createFileRoute } from "@tanstack/react-router";
import { ViewTicTacToe } from "@/views/ViewTicTacToe.tsx";

export const Route = createFileRoute("/tic-tac-toe")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<ViewTicTacToe />
	);
}
