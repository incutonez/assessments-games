import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashHistory, createRouter, RouterProvider } from "@tanstack/react-router";
// Import the generated route tree
import { routeTree } from "@/routeTree.gen.ts";

// Create a new router instance
const router = createRouter({
	routeTree,
	history: createHashHistory(),
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

createRoot(document.getElementById("root")!).render(<StrictMode>
	<RouterProvider router={router} />
</StrictMode>);
