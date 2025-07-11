import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ButtonRoute } from "@/components/BaseButton.tsx";
import { IconTicTacToe } from "@/components/icons.tsx";

export const Route = createRootRoute({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<article className="flex">
				<nav>
					<ButtonRoute
						route="/tic-tac-toe"
						icon={IconTicTacToe}
					/>
					<section>
						Snakes and Ladders
					</section>
				</nav>
				<Outlet />
			</article>
		</>
	);
}
