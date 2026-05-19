import { defineConfig } from "@playwright/test";

export default defineConfig({
	reporter: [["list"]],
	testDir: "./src/features/__tests__",
	projects: [
		{
			name: "unit",
		},
	],
});
