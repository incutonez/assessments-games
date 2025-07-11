import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgLoader from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	return {
		base: mode === "gh-pages" ? "/assessments-games/" : undefined,
		plugins: [svgLoader(), tailwindcss(), tanstackRouter({
			target: "react",
		}), react()],
		resolve: {
			alias: [{
				// Add ability to use @ to represent the root dir being src
				find: "@",
				replacement: path.resolve(path.resolve(), "./src"),
			}],
		},
	};
});
