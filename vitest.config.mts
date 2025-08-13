import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    coverage: {
      provider: "v8", // explícito, aunque es el valor por defecto
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
        "src/**/__mocks__/**",
        "src/routeTree.gen.ts",
        "vite.config.*",
      ],
    },
  },
});
