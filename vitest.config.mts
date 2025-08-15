/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    globals: true,
    coverage: {
      provider: "v8",
      exclude: [
        "node_modules/",
        "dist/",
        "src/**/*.d.ts",
        "src/routes/**",
        "src/shared/lib/supabase/**",
        "src/shared/config/i18n/**",
        "src/shared/lib/**",
        "src/shared/ui/**",
        "src/**/constants/**",
        "src/**/types/**",
        "src/**/dtos/**",
        "src/**/entities/**",
        "src/**/repositories/**",
        "src/**/dtos/**",
        "src/**/__mocks__/**",
        "src/**/test/utils/**",
        "src/routeTree.gen.ts",
        "vite.config.*",
        "tailwind.config.*",
        "eslint.config.*",
        "vitest.config.*",
        "src/main.tsx",
      ],
    },
  },
});
