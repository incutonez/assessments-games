import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ButtonRoute } from "@/components/BaseButton.tsx";
import { IconSnakesAndLadders, IconTicTacToe } from "@/components/icons.tsx";

export const Route = createRootRoute({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<article className="flex gap-4 size-full">
				<nav className="flex flex-col items-start gap-4 border-r h-full p-2">
					<ButtonRoute
						route="/tic-tac-toe"
						text="Tic Tac Toe"
						icon={IconTicTacToe}
					/>
					<ButtonRoute
						route="/snakes-and-ladders"
						text="Snakes & Ladders"
						icon={IconSnakesAndLadders}
					/>
				</nav>
				<Outlet />
			</article>
		</>
	);
}
