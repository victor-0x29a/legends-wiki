import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'nxuykk',
  e2e: {
    baseUrl: "http://localhost:5173",
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
