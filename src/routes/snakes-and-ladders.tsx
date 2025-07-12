import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/snakes-and-ladders")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<article>
			Snakes & Ladders
		</article>
	);
}
